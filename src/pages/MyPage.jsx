import React, { useEffect, useState } from 'react';
import '../styles/pages/MyPage.scss';
import { memberInfo } from '../apis/member';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useSelector } from 'react-redux';
import edit from '../assets/icons/setting.svg';
import noProfile from '../assets/noProfile.png';
import google from '../assets/icons/google_icon.svg';
import git from '../assets/icons/git_icon.svg';
import { useNavigate } from 'react-router-dom';
import Push from '../component/common/Push';
import Button from '../component/common/Button';
import Modal from '../component/common/Modal';
import errorIcon from '../assets/icons/error_icon.svg';
import Apis from '../apis/Api';

const MyPage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!accessToken || !expirationTime || !refreshToken) {
      sessionStorage.clear();
      navigate('/login');
    }
  }, []);

  const deleteUser = () => {
    Apis.delete('/users')
    .then((res) => {
      sessionStorage.clear();
      localStorage.clear()
      navigate('/');
    });
  }

  const deleteButton = [
    <Button
      type="modalBtn1"
      shape="angle"
      text="아니요"
      onClick={() => {
        setIsActive(false);
      }}
    />,
    <Button
      type="modalBtn2"
      shape="angle"
      text="회원탈퇴"
      onClick={() => {
        deleteUser()
      }}
    />,
  ];
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handleClickBrowserBackBtn = () => {
      navigate('/');
    };

    window.addEventListener('popstate', handleClickBrowserBackBtn);

    return () => {
      window.removeEventListener('popstate', handleClickBrowserBackBtn);
    };
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await memberInfo();
        setInfo(response);
      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    };
    fetchData();
    setIsShow(JSON.parse(sessionStorage.getItem('edit')));
    setTimeout(() => {
      setIsShow(false);
      sessionStorage.removeItem('edit');
    }, 3000);
  }, []);

  const handleEditClick = () => {
    navigate('/edit');
  };

  return (
    <>
      {isActive && (
        <div className="Solve--Modal--Wrapper">
          <Modal
            imageSource={errorIcon}
            title="회원 탈퇴 하시겠습니까?"
            content="회원 탈퇴 시, 기존 데이터는 모두 삭제됩니다."
            buttons={deleteButton}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
      )}
      <div className={`mypage--container--${mode}`}>
        <Header headerType="default" text={'마이페이지'} />
        <div className="mypage--modal">
          <img
            className="mypage--edit-icon"
            src={edit}
            alt="edit"
            onClick={handleEditClick}
          />
          <div className="mypage--edit-text">Profile</div>
          <img
            className="mypage--profile-image"
            src={info && info.imageUrl ? info.imageUrl : noProfile}
            alt="profileImage"
          />
          <div className="mypage--edit--nickname">
            {info ? info.nickname : ''}
          </div>
          <div className="mypage--edit--bojId">{info ? info.bojId : ''}</div>
          <img
            src={info && info.socialType === 'GOOGLE' ? google : git}
            alt="type"
            className="mypage--edit--loginType"
          />
          <div
            className="mypage--delete--btn"
            onClick={() => setIsActive(true)}
          >
            회원탈퇴
          </div>
        </div>
        <div className="main_push_container">
          {isShow && (
            <Push type="profileEdit" text="프로필 수정이 완료되었습니다." />
          )}
        </div>
        <Footer type="default" />
      </div>
    </>
  );
};

export default MyPage;
