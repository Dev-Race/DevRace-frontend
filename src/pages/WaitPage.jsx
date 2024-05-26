import React, { useEffect, useState } from 'react';
import '../styles/pages/WaitPage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Push from '../component/common/Push';
import waiting from '../assets/icons/wating_icon.svg';
import Button from '../component/common/Button';
import * as StompJs from '@stomp/stompjs';
import { roomCheck } from '../apis/room';

const WaitPage = () => {
  const navigate = useNavigate();
  const WAIT_WS = process.env.REACT_APP_WAIT_WS;
  const WAIT_SUB = process.env.REACT_APP_WAIT_SUB;
  const WAIT_PUB = process.env.REACT_APP_WAIT_PUB;

  const params = useParams();
  const { pathname, state } = useLocation();
  const { mode } = useSelector((state) => state.toggle);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waitList, setWaitList] = useState([]);

  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchWaitList = async () => {
      let res = await getWaitList();
      setWaitList(res.waitUserDtoList);
    };
    if(client !== null){
        fetchWaitList();
    }
  }, [client]);

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  console.log(waitList);

  const getWaitList = async () => {
    return await roomCheck(Number(params.roomId));
  };

  const connect = () => {
    if (client) disConnect();

    try {
      const clientdata = new StompJs.Client({
        brokerURL: WAIT_WS,
        connectHeaders: {
          Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
        },
        debug: function (str) {
          console.log(str);
        },
      });

      clientdata.onConnect = function () {
        clientdata.subscribe(WAIT_SUB + params.roomId, (message) => {
          let jsonMessageBody = JSON.parse(message.body);
          setWaitList(preWaitList => [...preWaitList, jsonMessageBody]);
        });
        sendWait(clientdata); // 연결된 후에 발행
      };

      clientdata.activate();
      setClient(clientdata);
    } catch (err) {
      console.error(err);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendWait = (connectedClient) => {
    connectedClient.publish({
      destination: WAIT_PUB,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        roomId: params.roomId,
        userId: sessionStorage.getItem('userId'),
        isManager: (state === null) ? false : state.isManager ,
        isEnter: false,
      }),
    });
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!accessToken || !expirationTime || !refreshToken) {
      localStorage.setItem('redirectUrl', pathname);
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
          <div className="Wait--List">
            {waitList.map((waitMember, index) => 
                <div key={index}>{waitMember.nickname}</div>
            )}
          </div>
          <Button type="modal" shape="angle" text="확인" />
        </div>
      </div>
      <Footer type="default" />
    </>
  );
};

export default WaitPage;
