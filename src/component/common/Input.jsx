import { useSelector } from 'react-redux';
import '../../styles/common/Input.scss';
import sendIcon from '../../assets/icons/sendIcon.svg';
/**
 * 인풋 타입 -> normal , chat
 * 라이트 / 다크 모드 -> light, dark
 * -> error 발생 여부 부모 컴포넌트에서 전달 true false
 * -> onChange 이벤트 부모 컴포넌트에서 전달
 */

const Input = (props) => {
  const { type, placeHolder, onChange, error, disable, value, sendMessage } = props;
  const { mode } = useSelector((state) => state.toggle);

  return (
    <div className={`input--${type}--${mode}--wrapper`}>
      <input
        className={`input--${type}--${mode}${error ? '--error' : ''}`}
        placeholder={placeHolder}
        onChange={onChange}
        disabled={disable}
        value={value}
        onKeyDown={(e) => {
          if ((mode === 'chat') && e.keyCode === 13) {
            sendMessage(e);
          }
        }}
      />
      {type === 'chat' ? (
        <img src={sendIcon} alt="sendIcon" onClick={(e) => sendMessage(e)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
