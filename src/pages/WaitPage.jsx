import React, { useEffect, useState } from 'react';
import '../styles/pages/WaitPage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Push from '../component/common/Push';
import waiting from '../assets/icons/wating_icon.svg';
import roomManagerIcon from '../assets/icons/roomManager.svg';
import Button from '../component/common/Button';
import * as StompJs from '@stomp/stompjs';
import { leaveWaitRoom, roomCheck } from '../apis/room';

const WaitPage = () => {
  const navigate = useNavigate();
  const WAIT_WS = process.env.REACT_APP_WAIT_WS;
  const WAIT_SUB = process.env.REACT_APP_WAIT_SUB;
  const WAIT_PUB = process.env.REACT_APP_WAIT_PUB;

  const params = useParams();
  const { pathname, state } = useLocation();
  const { mode } = useSelector((state) => state.toggle);

  const [roomManager, setRoomManager] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [waitList, setWaitList] = useState([]);
  const [client, setClient] = useState(null);
  const [inviteUrl, setInviteUrl] = useState(null);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("https://www.devrace.site/redirect/" + inviteUrl)
    .then(() => {
      console.log('클립보드에 복사되었습니다');
    });
  };

  useEffect(() => {
    const fetchWaitList = async () => {
      let res = await getWaitList();
      setWaitList(res.waitUserDtoList);
      setInviteUrl(res.link)
    };
    if (client !== null) {
      fetchWaitList();
    }
  }, [client]);

  useEffect(() => {
    if(waitList.length > 0) {
        setRoomManager(waitList[0].userId);
    }
  }, [waitList])

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getWaitList = async () => {
    return await roomCheck(Number(params.roomId));
  };

  const leaveRoom = async () => {
    await leaveWaitRoom(Number(params.roomId));
    alert('방을 떠났습니다!')
    navigate('/')
  }

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
          if(jsonMessageBody.isEnter === true) {
            disConnect();
            navigate('/solve/' + params.roomId)
          }
          setWaitList((prevWaitList) => {
            const isDuplicate = prevWaitList.some(
              (member) => member.userId === jsonMessageBody.userId,
            );
            if (!isDuplicate) {
              return [...prevWaitList, jsonMessageBody];
            }
            return prevWaitList;
          });
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
        isManager: state === null ? false : state.isManager,
        isEnter: false,
      }),
    });
  };

  const onEnter = () => {
    client.publish({
      destination: WAIT_PUB,
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        roomId: params.roomId,
        userId: sessionStorage.getItem('userId'),
        isManager: state === null ? false : state.isManager,
        isEnter: true,
      }),
    });
  }

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!accessToken || !expirationTime || !refreshToken) {
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
        leaveWaitRoom={leaveRoom}
        invite={handleCopyUrl}
      />
      <div className="Wait--Push--Invite">
        <Push type="inviteFriend" text="친구들에게 초대링크를 보내세요!" />
      </div>
      {isVisible && (
        <div className="Wait--Push--Leave">
          <Push
            type="leaveWaitRoom"
            text="강제 종료 시 불이익이 있으니, 나가기 버튼을 눌러 대기열을 퇴장해주세요."
          />
        </div>
      )}
      <div className={`Wait--${mode}--Wrapper`}>
        <div className="Wait--Box">
          <img src={waiting} alt="Plus Icon" className="Wait--Icon" />
          <span className="Wait--Title">{waitList.length}명</span>
          <span className="Wait--Content">친구들을 기다리고 있어요!</span>
          <div className="Wait--List">
            {waitList.map((waitMember, index) => (
              <div className="Wait--List--item" key={index}>
                <div className="Wait--List--Item--order">{index + 1}</div>
                <img
                  src={index === 0 ? roomManagerIcon : waitMember.imageUrl}
                  alt="waitMember_img"
                  className="Wait--List--item--img"
                />
                <div className="Wait--List--Item--name">
                  {waitMember.nickname}
                </div>
              </div>
            ))}
          </div>
          {sessionStorage.getItem('userId') == roomManager && (
            <Button type="modal" shape="angle" text="확인" onClick={onEnter} />
          )}
        </div>
      </div>
      <Footer type="default" />
    </>
  );
};

export default WaitPage;
