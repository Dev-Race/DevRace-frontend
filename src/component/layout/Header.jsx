import rogo_light from '../../icons/rogo_light.svg';
import rogo_dark from '../../icons/rogo_dark.svg';
import rogo_icon_light from '../../icons/rogo_icon_light.svg';
import rogo_icon_dark from '../../icons/rogo_icon_dark.svg';
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
  let rogo, rogo_icon, people_icon;

  // mode에 따라 이미지 결정
  if (mode === 'light') {
    rogo = rogo_light;
    rogo_icon = rogo_icon_light;
    people_icon = people_light;
  } else if (mode === 'dark') {
    rogo = rogo_dark;
    rogo_icon = rogo_icon_dark;
    people_icon = people_dark;
  }

  return (
    <div className={`header_container--${mode}`}>
      <div className="header_left_items">
        {leftContent === 'rogo' ? (
          <>
            <img src={rogo_icon} alt="Rogo icon" />
            <img src={rogo} alt="Rogo" />
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
          <img src={people_icon} alt="People icon" />
        </div>
      )}
    </div>
  );
};

export default Header;
