import React, { useState, useEffect } from 'react';
import '../../styles/common/Push.scss';
import profile_edited from '../../assets/icons/profile_edited.svg';
import light_mode from '../../assets/icons/light_mode.svg';
import dark_mode from '../../assets/icons/dark_mode.svg';

/**
 * 푸시 알림 타입 -> profileEdit, modeChange, inviteFriend
 * profileEdit 일땐 mode 선택 필요가 없으므로 무시
 * 3초 간 렌더링 후 사라짐
 */
const Push = ({ type, mode }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // profileEdit 일땐 mode 선택 필요가 없으므로 무시
  const className =
    type === 'profileEdit' ? `push--${type}` : `push--${type}--${mode}`;

  const getText = () => {
    switch (type) {
      case 'profileEdit':
        return '프로필 수정이 완료되었습니다.';
      case 'modeChange':
        return mode === 'light'
          ? '라이트모드로 변경되었습니다!'
          : '다크모드로 변경되었습니다!';
      case 'inviteFriend':
        return '친구들에게 초대링크를 보내세요!';
      default:
        return '';
    }
  };

  let icon;
  if (type === 'profileEdit') {
    icon = profile_edited;
  } else if (type === 'modeChange') {
    icon = mode === 'light' ? light_mode : dark_mode;
  }

  return (
    <div className={className}>
      {icon && <img src={icon} alt="icon" />}
      {getText()}
    </div>
  );
};

export default Push;
