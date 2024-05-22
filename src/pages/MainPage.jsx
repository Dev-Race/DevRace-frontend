import '../styles/pages/MainPage.scss';
import Button from '../component/common/Button';
import Footer from '../component/layout/Footer';
import Header from '../component/layout/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Push from '../component/common/Push';

const MainPage = () => {
  const { mode } = useSelector((state) => state.toggle);

  const [isMounted, setIsMounted] = useState(false);
  const [isChangedMode, setIsChangedMode] = useState(mode);

  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && mode !== isChangedMode) {
      setIsShow(true);
      setIsChangedMode(mode);
    }
  }, [mode]);

  return (
    <div className={`main_container--${mode}`}>
      <Header headerType="main" />
      <div className="main_content_container">
        <span className={`main_text_caption--${mode}`}>
          DEV RACE를 이용해서
        </span>
        <span className="main_text_headerLine">
          친구들과 함께 백준 문제를 풀어봐요!
        </span>
        <Button
          type="large"
          text="시작하기"
          mode={mode}
          shape="non-angle"
          onClick={() => navigate('/main/create')}
        />
      </div>
      <div className="main_push_container">
        {isShow && (
          <Push
            key={isChangedMode}
            type="modeChange"
            text={
              mode === 'light'
                ? '라이트모드로 변경되었습니다!'
                : '다크모드로 변경되었습니다!'
            }
          />
        )}
      </div>
      <Footer type="default" />
    </div>
  );
};

export default MainPage;
