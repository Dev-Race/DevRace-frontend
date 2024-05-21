import React from 'react';
import close from '../../assets/icons/modal_close.svg';
import noProfile from '../../assets/noProfile.png';
import '../../styles/common/Modal.scss';

const Modal = (props) => {
  const {imageSource, title, content, buttons, isActive, setIsActive} = props;
  
  console.log(isActive)
  return (
    <>
      {isActive && (
        <div className="modal--container">
          <img
            src={close}
            alt="close"
            className="modal--close"
            onClick={() => setIsActive(!isActive)}
          />
          <div className="modal--wrapper">
            <img
              src={
                ((title === undefined) && (content === undefined))
                  ? noProfile
                  : imageSource
              }
              alt="imageSource"
              className={
                ((title === undefined) && (content === undefined))
                  ? "modal--Profile"
                  : "modal-Icon"
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
