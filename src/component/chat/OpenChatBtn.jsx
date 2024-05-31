import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import open_chat_icon from '../../assets/icons/open_chat_icon.svg';
import '../../styles/components/ChatComponent.scss';

const OpenChatBtn = ({ onClick, isFirstMounted, top, setTop }) => {
  const { mode } = useSelector((state) => state.toggle);
  const btnRef = useRef(null);
  const startY = useRef(0);
  const startTop = useRef(0);
  const hasDragged = useRef(false);

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
    if (!hasDragged.current) {
      onClick();
    }
  };

  return (
    <div
      ref={btnRef}
      className={`Chat--Open--Btn--${mode}`}
      onMouseDown={handleMouseDown}
      style={{
        top: isFirstMounted ? '180px' : `${top}px`,
        position: 'absolute',
      }}
    >
      <img src={open_chat_icon} alt="Open Chat" />
    </div>
  );
};

export default OpenChatBtn;
