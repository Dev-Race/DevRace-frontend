import '../../styles/common/Button.scss';
import { useSelector } from 'react-redux';
import google_icon from '../../assets/icons/google_icon.svg';
import git_icon from '../../assets/icons/git_icon.svg';
/**
 * 버튼 타입 -> small, normal(1,2,3), large, modal, login
 * 라이트 / 다크 모드 -> light, dark
 * 버튼 모양 -> angle, non-angle
 * 버튼 내용 -> text, icon (optional)
 *
 * -> btn--${type}--${mode}--${shape}
 * -> 이벤트는 부모 컴포넌트에서 작성해서 props로 넘겨줄 것
 * disable 해야하는 경우, disable props에 true로 넘겨주면 됨
 * default 값은 false이므로, false인 경우에는 props로 넘겨주지 않아도 됨
 * 
 * icon type 받아옴 - 로그인 버튼의 경우
 */

const Button = (props) => {
  const { type, shape, text, icon, onClick, disable } = props;
  const { mode } = useSelector((state) => state.toggle);

  return (
    <button
      className={`btn--${type}--${mode}--${shape}`}
      onClick={onClick}
      disabled={disable ? disable : false}
    >
      {type === 'login' && <img src={icon === 'google' ? google_icon : git_icon} alt={text} />}
      {text}
    </button>
  );
};

export default Button;
