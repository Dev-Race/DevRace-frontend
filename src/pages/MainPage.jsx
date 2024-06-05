import '../styles/pages/MainPage.scss';
import Button from '../component/common/Button';
import Footer from '../component/layout/Footer';
import Header from '../component/layout/Header';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Push from '../component/common/Push';

import { memberInfo } from '../apis/member';

import Modal from '../component/common/Modal';
import errorIcon from '../assets/icons/error_icon.svg';
import Apis from '../apis/Api';

const MainPage = () => {
  const { mode } = useSelector((state) => state.toggle);

  const [isMounted, setIsMounted] = useState(false);
  const [isChangedMode, setIsChangedMode] = useState(mode);
  const [isShow, setIsShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExistRoomId, setIsExistRoomId] = useState();
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && accessTokenExpiresIn && refreshToken) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('expirationTime', accessTokenExpiresIn);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
    navigate('/');
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const accessTokenExpiresIn = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (accessToken && accessTokenExpiresIn && refreshToken) {
      memberInfo();
      setIsLoggedIn(true);
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        navigate(redirectUrl);
        localStorage.removeItem('redirectUrl');
      }
      const timer = setTimeout(() => {
        Apis.get('/users/rooms-check').then((response) => {
          if (response.data.data.roomId) {
            setIsExistRoomId(response.data.data.roomId);
            setIsActive(true);
          }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isMounted && mode !== isChangedMode) {
      setIsShow(true);
      setIsChangedMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rejoinButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        navigate('/solve/'+isExistRoomId)
        setIsActive(false);
      }}
    />,
  ];

  return (
    <div className={`main_container--${mode}`}>
      <Header
        headerType="main"
        text={isLoggedIn ? '로그아웃' : '로그인'}
        setIsLoggedIn={setIsLoggedIn}
      />
      {isActive &&
        <div className="Main--Modal--Wrapper">
          <Modal
            imageSource={errorIcon}
            title="퇴장하지 않은 방이 있습니다!"
            content="기존의 문제풀이 페이지로 재참여합니다."
            isActive={isActive}
            setIsActive={setIsActive}
            buttons={rejoinButton}
          />
        </div>
      }
      <div className="main_content_container">
        <span className={`main_text_caption--${mode}`}>
          DEV RACE를 이용해서
        </span>
        <span className="main_text_headerLine">
          친구들과 함께 백준 문제를 풀어봐요!
        </span>
        <Button
          type="large"
          text="시작하기"
          mode={mode}
          shape="non-angle"
          onClick={
            isLoggedIn ? () => navigate('/create') : () => navigate('/login')
          }
        />
      </div>
      <div className="main_push_container">
        {isShow && (
          <Push
            key={isChangedMode}
            type="modeChange"
            text={
              mode === 'light'
                ? '라이트모드로 변경되었습니다!'
                : '다크모드로 변경되었습니다!'
            }
          />
        )}
      </div>
      <Footer type="default" />
    </div>
  );
};

export default MainPage;
