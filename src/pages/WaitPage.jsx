import React, { useEffect, useState } from 'react';
import '../styles/pages/WaitPage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Push from '../component/common/Push';
import waiting from '../assets/icons/wating_icon.svg';
import Button from '../component/common/Button';

const WaitPage = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { mode } = useSelector((state) => state.toggle);

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!accessToken || !expirationTime || !refreshToken) {
      localStorage.setItem('redirectUrl', pathname);
      console.log(pathname)
      sessionStorage.clear();
      navigate('/');
    }
    setIsLoggedIn(true);
  }, []);

    return (
      <>
        <Header
          headerType="wait"
          text={isLoggedIn ? '로그아웃' : '로그인'}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="Wait--Push">
          <Push type="inviteFriend" text="친구들에게 초대링크를 보내세요!" />
        </div>
        <div className={`Wait--${mode}--Wrapper`}>
          <div className="Wait--Box">
            <img src={waiting} alt="Plus Icon" className="Wait--Icon" />
            <span className="Wait--Title">5명</span>
            <span className="Wait--Content">친구들을 기다리고 있어요!</span>
            <div className="Wait--List"></div>
            <Button type="modal" shape="angle" text="확인" />
          </div>
        </div>
        <Footer type="default" />
      </>
    );
};

export default WaitPage;