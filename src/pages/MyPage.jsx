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

const MyPage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  const [isShow, setIsShow] = useState(false);

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
    setInterval(() =>{
        setIsShow(false);
        sessionStorage.removeItem('edit')
    }, 3000)
  }, []);

  return (
    <div className={`mypage--container--${mode}`}>
      <Header headerType="default" text={'마이페이지'} />
      <div className="mypage--modal">
        <img
          className="mypage--edit-icon"
          src={edit}
          alt="edit"
          onClick={() => navigate('/edit')}
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
        <Button
          type="modal"
          shape="angle"
          text="홈으로 돌아가기"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="main_push_container">
        {isShow && (
          <Push type="profileEdit" text="프로필 수정이 완료되었습니다." />
        )}
      </div>
      <Footer type="default" />
    </div>
  );
};

export default MyPage;
