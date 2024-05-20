import modal_close from '../../assets/icons/modal_close.svg';
import '../../styles/common/Modal.scss';
import { SelectModal } from '../../utils/SelectModalType';
import Button from './Button';

/**
 * 모달 타입 -> regist_modal , id_link_modal , rejoin_modal 와 같이 나눠놓음
 * title, body , icon 모두 부모 컴포넌트에서 받아온 type 에 따라 나눠놓았으므로 따로 지정해주지 않아도 됨
 * 각 모달에 들어있는 버튼 마다 이벤트 등록 하기
 * 문제 풀이 성공 모달은 props 로 rank 받아오기
 */

const Modal = ({ type, setIsActive, rank }) => {

  const { title, icon, body, buttonAction, buttonVisible, buttons } = SelectModal(type, rank);

  return (
    <div className="modal_container">
      <div className="modal_close_btn" onClick={() => setIsActive(false)}>
        <img src={modal_close} alt="Modal close" />
      </div>
      {icon && <img src={icon} alt="icon" style={{ marginTop: '25px' }} />}
      {title && <div className="modal_title">{title}</div>}
      {body && <div className="modal_body">{body}</div>}

      {buttonVisible && (
        <div style={{ marginBottom: '20px' }}>
          <Button
            onClick={buttonAction}
            type="modal" // buttonVisible이 true일 때의 type
            mode="light"
            shape="angle"
            text="확인"
          />
        </div>
      )}

      {buttons && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button
            onClick={buttons[0].action}
            type="small_modal"
            mode="dark"
            shape="angle"
            text={buttons[0].text}
          />
          <Button
            onClick={buttons[1].action}
            type="small_modal"
            mode="light"
            shape="angle"
            text={buttons[1].text}
          />
        </div>
      )}
    </div>
  );
};

export default Modal;
