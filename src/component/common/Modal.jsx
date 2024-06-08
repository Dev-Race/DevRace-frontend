import React, { useEffect, useState } from 'react';
import close from '../../assets/icons/modal_close.svg';
import noProfile from '../../assets/noProfile.png';
import '../../styles/common/Modal.scss';

const Modal = (props) => {
  const {imageSource, title, content, buttons, isActive, setIsActive, preview} = props;
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    switch (title) {
      case undefined:
      case '백준에 코드를 제출하세요!':
      case '퇴장하시나요?':
      case '문제풀이에 실패했어요.':
        setIsClose(true);
        break;
      default:
        setIsClose(false);
        break;
    }
  }, [])
  return (
    <>
      {isActive && (
        <div className="modal--container">
          {isClose && (
            <img
              src={close}
              alt="close"
              className="modal--close"
              onClick={() => setIsActive(!isActive)}
            />
          )}
          <div className="modal--wrapper">
            <img
              src={
                title === undefined && content === undefined
                  ? preview
                    ? preview
                    : noProfile
                  : imageSource
              }
              alt="imageSource"
              className={
                title === undefined && content === undefined
                  ? 'modal--Profile'
                  : 'modal-Icon'
              }
            />
            {title && <div className="modal--title">{title}</div>}
            {content && <div className="modal--content">{content}</div>}
            <div className="modal--buttons">
              {buttons.length === 1 ? buttons[0] : buttons.map((btn) => btn)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
