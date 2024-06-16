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
  const { type, placeHolder, onChange, error, value, sendMessage, isRetry } = props;
  const { mode } = useSelector((state) => state.toggle);

  return (
    <div className={`input--${type}--${mode}--wrapper`}>
      <input
        className={`input--${type}--${mode}${error ? '--error' : ''}`}
        placeholder={isRetry === 'RETRY' || isRetry === 'FINISH' ? '이미 종료된 채팅입니다.' : placeHolder}
        onChange={onChange}
        disabled={isRetry === 'RETRY' || isRetry === 'FINISH' ? true : false}
        value={value}
        onKeyDown={(e) => {
          if ((type === 'chat') && e.keyCode === 13) {
            sendMessage(e);
          }
        }}
      />
      {type === 'chat' ? (
        <img src={sendIcon} alt="sendIcon" onClick={isRetry === 'RETRY' || isRetry === 'FINISH' ? () => {} : (e) => sendMessage(e)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
