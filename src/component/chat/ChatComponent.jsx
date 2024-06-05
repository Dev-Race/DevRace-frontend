import '../../styles/components/ChatComponent.scss';
import exit_white from '../../assets/icons/exit_white.svg';
import { useSelector } from 'react-redux';
import Input from '../common/Input';
import { useEffect, useRef, useState } from 'react';

const ChatComponent = (props) => {
  const {
    onClick,
    top,
    setTop,
    chat,
    sendMessage,
    onChangeChat,
    chatData,
    page,
    setPage,
  } = props;
  const { mode } = useSelector((state) => state.toggle);
  const [opacity, setOpacity] = useState(1);
  const chatRef = useRef(null);
  const contentRef = useRef(null);
  const startY = useRef(0);
  const startTop = useRef(0);
  const hasDragged = useRef(false);
  const scrollPosition = useRef(0);
  const initialLoad = useRef(true);

  const handleScroll = () => {
    if (contentRef.current.scrollTop < 1) {
      scrollPosition.current = contentRef.current.scrollHeight;
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      // 처음 채팅방을 열 때
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
      initialLoad.current = false;
    } else if (scrollPosition.current) {
      // 이전 내역 불러올 때
      const newScrollHeight = contentRef.current.scrollHeight;
      const scrollTo = newScrollHeight - scrollPosition.current;
      contentRef.current.scrollTop = scrollTo;
      scrollPosition.current = 0;
    }
  }, [chatData]);

  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    startTop.current = top;
    hasDragged.current = false;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const deltaY = e.clientY - startY.current;
    setTop(startTop.current + deltaY);
    if (Math.abs(deltaY) > 5) {
      hasDragged.current = true;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSliderChange = (event) => {
    setOpacity(event.target.value / 100);
  };

  const convertTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div
      ref={chatRef}
      onMouseDown={handleMouseDown}
      className={`Chat--Container--${mode}`}
      style={{
        top: `${top}px`,
        position: 'absolute',
        '--opacity': opacity,
      }}
    >
      <div className={`Chat--Header--${mode}`}>
        <input
          type="range"
          id="slider1"
          min="0"
          max="100"
          value={opacity * 100}
          className="Chat--Slider"
          onChange={handleSliderChange}
        />
        <span>채팅</span>
        <div className="Chat--Exit--Btn" onClick={onClick}>
          <img src={exit_white} alt="Exit" />
        </div>
      </div>
      <div className="Chat--Content--Container" ref={contentRef}>
        {chatData &&
          chatData.map((chat, index) => {
            if (chat.messageType === 'ENTER') {
              return (
                <div className="Chat--Notification--Container" key={index}>
                  <span className={`Chat--Notification--Text--${mode}`}>
                    {`${chat.senderName}님이 입장하셨습니다.`}
                  </span>
                </div>
              );
            } else if (chat.messageType === 'LEAVE') {
                <div className="Chat--Notification--Container" key={index}>
                  <span className={`Chat--Notification--Text--${mode}`}>
                    {`${chat.senderName}님이 퇴장하셨습니다.`}
                  </span>
                </div>;
            } else if (chat.messageType === 'TALK') {
              return chat.senderId ===
                Number(sessionStorage.getItem('userId')) ? (
                <div className="Chat--MyChat--Container" key={index}>
                  <div className="Chat--Chat--Time">
                    {convertTime(chat.createdTime)}
                  </div>
                  <div className={`Chat--MyChat--TextBox--${mode}`}>
                    {chat.message}
                  </div>
                </div>
              ) : (
                <div className="Chat--OtherChat--Container" key={index}>
                  <img
                    src={chat.senderImageUrl}
                    alt="profileImg"
                    className="Chat--OtherProfile--Container"
                  />
                  <div className={`Chat--OtherChat--TextBox--${mode}`}>
                    {chat.message}
                  </div>
                  <div className="Chat--Chat--Time">
                    {convertTime(chat.createdTime)}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <Input
        type="chat"
        mode={mode}
        placeHolder="채팅을 입력해주세요."
        value={chat}
        sendMessage={sendMessage}
        onChange={onChangeChat}
      />
    </div>
  );
};

export default ChatComponent;
