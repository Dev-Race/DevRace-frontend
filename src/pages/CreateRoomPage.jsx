import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import Input from '../component/common/Input';
import Button from '../component/common/Button';
import '../styles/pages/CreateRoomPage.scss';
import plus_icon from '../assets/icons/plus_icon.svg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProblem } from '../apis/createProblem';

const CreateRoomPage = () => {
  const { mode } = useSelector((state) => state.toggle);
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const expirationTime = sessionStorage.getItem('expirationTime');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!accessToken || !expirationTime || !refreshToken) {
      sessionStorage.clear();
      navigate('/');
    } else return;
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = async (input) => {

    if (inputText === '' || inputText === null) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }

    let res = await createProblem(input);
    console.log(res)
  }

  return (
    <div>
      <Header
        headerType="create"
        text={'로그아웃'}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className={`Create--Container--${mode}`}>
        <div className="Create--InputForm">
          <img src={plus_icon} alt="Plus Icon" className="Create--Icon" />
          <span className="Create--Text">방 생성하기</span>
          <span className="Create--Text--Caption">
            문제번호를 입력하여 방을 생성하세요!
          </span>
          <div className="Create--InputForm--Box">
            <Input
              type="normal"
              placeHolder="문제 번호를 입력하세요 예)1234"
              onChange={handleInputChange}
              error={inputError}
            />
            <Button
              type="modal"
              shape="angle"
              text="확인"
              disable={inputText === '' || inputText === null ? true : false}
              onClick={() => onSubmit(inputText)}
            />
          </div>
        </div>
      </div>
      <Footer type="default" />
    </div>
  );
};

export default CreateRoomPage;
