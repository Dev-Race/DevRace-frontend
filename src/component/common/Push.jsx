import React, { useState, useEffect } from 'react';
import '../../styles/common/Push.scss';
import profile_edited from '../../assets/icons/profile_edited.svg';
import light_mode from '../../assets/icons/light_mode.svg';
import dark_mode from '../../assets/icons/dark_mode.svg';
import { useSelector } from 'react-redux';

/**
 * 푸시 알림 타입 -> profileEdit, modeChange, inviteFriend
 * profileEdit 일땐 mode 선택 필요가 없으므로 무시
 * 3초 간 렌더링 후 사라짐
 * 
 * text -> ?
 * '프로필 수정이 완료되었습니다.'
 * '라이트모드로 변경되었습니다!'
 * '다크모드로 변경되었습니다!';
 * '친구들에게 초대링크를 보내세요!';
 */
const ICONS = {
  profileEdit: profile_edited,
  light: light_mode,
  dark: dark_mode,
};

const Push = ({ type, text }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { mode } = useSelector((state) => state.toggle);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getClassName = () => {
    return type === 'profileEdit' ? `push--${type}` : `push--${type}--${mode}`;
  };

  const getIcon = () => {
    if (type === 'profileEdit') return ICONS.profileEdit;
    if (type === 'modeChange')
      return mode === 'light' ? ICONS.light : ICONS.dark;
    return null;
  };

  return (
    <div className={getClassName()}>
      {getIcon() && <img src={getIcon()} alt="icon" />}
      {text}
    </div>
  );
};

export default Push;
