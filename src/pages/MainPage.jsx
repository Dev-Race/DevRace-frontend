import '../styles/pages/MainPage.scss';
import Button from '../component/common/Button';
import Footer from '../component/layout/Footer';
import Header from '../component/layout/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const navigate = useNavigate();

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
      <Footer type="default" />
    </div>
  );
};

export default MainPage;
