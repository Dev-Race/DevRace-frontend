import { useSelector } from 'react-redux';
import '../../styles/common/Input.scss';
/**
 * 인풋 타입 -> nomal , chat_input
 * 라이트 / 다크 모드 -> light, dark
 * -> error 발생 여부 부모 컴포넌트에서 전달 true false
 * -> onChange 이벤트 부모 컴포넌트에서 전달
 */

const Input = ({ type, placeHolder, onChange, error }) => {
  const { mode } = useSelector((state) => state.toggle);
  return (
    <input
      className={`input--${type}--${mode}${error ? '--error' : ''}`}
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
};

export default Input;
