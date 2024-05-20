import logo_light from '../../icons/logo_light.svg';
import logo_dark from '../../icons/logo_dark.svg';
import logo_icon_light from '../../icons/logo_icon_light.svg';
import logo_icon_dark from '../../icons/logo_icon_dark.svg';
import people_light from '../../icons/people_light.svg';
import people_dark from '../../icons/people_dark.svg';

import Toggle from '../common/Toggle';

import '../../styles/layout/Header.scss';

/**
 * 헤더 모드 -> 다크, 라이트
 * 헤더에서 토글(화면모드 변경) 을 포함한다면
 * 부모 컴포넌트에서 onToggleChange 이벤트 받아오기
 * 헤더 타입 -> 부모 컴포넌트에서 type 넘겨주지 않으면 기본 스타일(왼쪽에만 아이템 존재)
 *  -> type="with_right_items" 이면 양쪽에 아이템 존재 하는 스타일로 지정 가능
 * 부모 컴포넌트에서 버튼에 들어갈 텍스트인 buttonTexts 를 넘겨주면 됨
 * -> 버튼이 2개일땐 buttonTexts={['내 코드', '로그아웃']}
 * -> 버튼이 1개일땐 buttonTexts={['로그아웃']}
 */

const Header = ({ mode, onToggleChange, type, buttonTexts, leftContent }) => {
  return (
    <div className={`header_container--${mode}`}>
      <div className="header_left_items">
        {leftContent === 'logo' ? (
          <>
            <img
              src={mode === 'light' ? logo_icon_light : logo_icon_dark}
              alt="Logo icon"
            />
            <img src={mode === 'light' ? logo_light : logo_dark} alt="Logo" />
          </>
        ) : (
          <div className={`header_title--${mode}`}>{leftContent}</div>
        )}
      </div>
      {type === 'with_right_items' && (
        <div className="header_right_items">
          <Toggle isOn={mode === 'dark'} onToggleChange={onToggleChange} />
          {buttonTexts.map((text, index) => (
            <button key={index} className={`header_text--${mode}`}>
              {text}
            </button>
          ))}
          <img
            src={mode === 'light' ? people_light : people_dark}
            alt="People icon"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
