import './Button.scss';

/**
 * 버튼 타입 -> small, normal(1,2,3), large, modal
 * 라이트 / 다크 모드 -> light, dark
 * 버튼 모양 -> angle, non-angle
 * 버튼 내용 -> text, icon (optional)
 *
 * -> btn--${type}--${mode}--${shape}
 * -> 이벤트는 부모 컴포넌트에서 작성해서 props로 넘겨줄 것
 * disable 해야하는 경우, disable props에 true로 넘겨주면 됨
 * default 값은 false이므로, false인 경우에는 props로 넘겨주지 않아도 됨
 */

const Button = ({ type, mode, shape, text, icon, onClick, disable }) => {
  return (
    <button
      className={`btn--${type}--${mode}--${shape}`}
      onClick={onClick}
      disabled={disable ? disable : false}
    >
      {type === 'leftIcon' && icon && <img src={icon} alt={text} />}
      {text}
    </button>
  );
};

export default Button;
