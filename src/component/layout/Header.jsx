import logo_light from '../../assets/icons/logo_light.svg';
import logo_dark from '../../assets/icons/logo_dark.svg';
import logo_icon_light from '../../assets/icons/logo_icon_light.svg';
import logo_icon_dark from '../../assets/icons/logo_icon_dark.svg';
import people_light from '../../assets/icons/people_light.svg';
import people_dark from '../../assets/icons/people_dark.svg';

import Toggle from '../common/Toggle';

import '../../styles/layout/Header.scss';
import { useSelector } from 'react-redux';
import RankList from '../common/RankList';
import { useState } from 'react';
import Dropdown from '../common/DropDown';
import { useNavigate } from 'react-router-dom';

/**
 * headerType : login, main, create, wait, solve, review, mycode, default
 */
const Header = (props) => {
  const { headerType, text, setIsLoggedIn, leaveWaitRoom, invite } = props;
  const { mode } = useSelector((state) => state.toggle);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const rankings = [
    { rank: 1, name: 'qwer' },
    { rank: 2, name: 'qwer' },
    { rank: 3, name: 'qwer' },
    { rank: '4', name: 'qwer' },
    { rank: '-', name: 'qwer' },
  ];

  const handleSelect = (select) => {
    setSelectedOption(select);
  };

  switch (headerType) {
    case 'login':
      return (
        <>
          <div
            className={`header--${mode}--container`}
            style={{ background: 'none' }}
          >
            <img
              src={mode === 'light' ? logo_icon_light : logo_icon_dark}
              alt="logo"
              className="header--logo"
            />
            <img
              src={mode === 'light' ? logo_light : logo_dark}
              alt="logo_text"
              className="header--logo--text"
            />
          </div>
        </>
      );
    case 'main':
    case 'create':
    case 'wait':
      return (
        <>
          <div
            className={
              headerType === 'main'
                ? `header--${mode}--container--main`
                : `header--${mode}--container`
            }
          >
            <img
              src={mode === 'light' ? logo_icon_light : logo_icon_dark}
              alt="logo"
              className="header--logo"
            />
            <img
              src={mode === 'light' ? logo_light : logo_dark}
              alt="logo_text"
              className="header--logo--text"
            />
            <div className={`header--${mode}--btn--box`}>
              <Toggle />
              {headerType === 'main' && (
                <button
                  className={`header--${mode}--btn`}
                  onClick={() => navigate('/mycode')}
                >
                  내 코드
                </button>
              )}
              {headerType === 'wait' && (
                <button
                  className={`header--${mode}--btn`}
                  style={{ color: '#66F' }}
                  onClick={invite}
                >
                  초대링크
                </button>
              )}
              <button
                className={`header--${mode}--btn`}
                onClick={
                  text === '로그아웃'
                    ? () => {
                        sessionStorage.clear();
                        setIsLoggedIn(false);
                        navigate('/');
                      }
                    : () => navigate('/login')
                }
              >
                {text}
              </button>
              {headerType === 'wait' && (
                <button
                  className={`header--${mode}--btn`}
                  onClick={()=>leaveWaitRoom()}
                >
                  나가기
                </button>
              )}
              <img
                src={mode === 'light' ? people_light : people_dark}
                alt="logo_text"
                className="header--logo--text"
                onClick={() => navigate('/profile')}
              />
            </div>
          </div>
        </>
      );
    case 'solve':
    case 'review':
      return (
        <>
          <div
            className={
              headerType === 'main'
                ? `header--${mode}--container--main`
                : `header--${mode}--container`
            }
          >
            <div className={`header--${mode}--problemNum`}>{text}</div>
            <div className={`header--${mode}--btn--box`}>
              <Toggle />
              <RankList rankings={rankings} />
              {headerType === 'solve' && (
                <Dropdown type="language" onSelect={handleSelect} />
              )}
              {headerType === 'solve' && (
                <button className={`header--${mode}--btn`}>초대링크</button>
              )}
              {headerType === 'solve' && (
                <div className={`header--${mode}--btn`}>여기에는 언어</div>
              )}
              <button className={`header--${mode}--btn`}>나가기</button>
            </div>
          </div>
        </>
      );
    case 'mycode':
      return (
        <>
          <div
            className={
              headerType === 'main'
                ? `header--${mode}--container--main`
                : `header--${mode}--container`
            }
          >
            <div className={`header--${mode}--problemNum`}>{text}</div>
            <div className={`header--${mode}--btn--box`}>
              <Dropdown type="status" onSelect={handleSelect} />
            </div>
          </div>
        </>
      );
    default:
      return (
        <>
          <div
            className={
              headerType === 'main'
                ? `header--${mode}--container--main`
                : `header--${mode}--container`
            }
          >
            <div className={`header--${mode}--problemNum`}>{text}</div>
          </div>
        </>
      );
  }
};

export default Header;
