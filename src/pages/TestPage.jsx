import Button from '../component/common/Button';
import { useNavigate } from 'react-router-dom';
import Pagination from '../component/common/Pagination';
import { useState } from 'react';
import Input from '../component/common/Input';
import Push from '../component/common/Push';
import Modal from '../component/common/Modal';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useSelector } from 'react-redux';
import reset_icon from '../assets/icons/reset_icon.svg';


const TestPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(true);
  const { mode } = useSelector((state) => state.toggle);

  const buttons1 = [
    <Button
      onClick={() => navigate('/aaa')}
      type="modalBtn1"
      shape="angle"
      text="문제확인"
    />,
    <Button
      onClick={() => navigate('/aaa')}
      type="modalBtn2"
      shape="angle"
      text="문제확인"
    />,
  ];

  const buttons2 = [
    <Button
      onClick={() => navigate('/aaa')}
      type="modal"
      shape="angle"
      text="문제확인"
    />,
  ];

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Modal buttons={buttons1} isActive={isActive} setIsActive={setIsActive} />
      <Modal
        imageSource={reset_icon}
        title="문제풀이에 실패했어요."
        content="재도전을 위해 문제풀이로 돌아갑니다."
        buttons={buttons2}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <br />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <br />
      <Input
        type="normal"
        placeHolder="이름을 입력하세요."
        onChange={handleInputChange}
        error={isError}
      />
      <br />
      <Input
        type="chat"
        placeHolder="메시지를 입력해주세요." // 소켓 연결 유무로 placholder 바뀜 -> disable과 짝
        onChange={handleInputChange}
        disable={false}
        // onClick={}
      />
      <br />
      <Push type="profileEdit" text="프로필 수정이 완료되었습니다." />
      <br />
      <Push
        type="modeChange"
        text={
          mode === 'light'
            ? '라이트모드로 변경되었습니다!'
            : '다크모드로 변경되었습니다!'
        }
      />
      <br />
      <Push type="inviteFriend" text="친구들에게 초대링크를 보내세요!" />
      {/*  * headerType : login, main, create, wait, solve, review, mycode, default */}
      <br />
      <Header headerType="login" />
      <br />
      <Header headerType="main" />
      <br />
      <Header headerType="create" />
      <br />
      <Header headerType="wait" />
      <br />
      <Header headerType="solve" text="1244.cpp" />
      <br />
      <Header headerType="review" text="1244.cpp" />
      <br />
      <Header headerType="mycode" text="내 코드 페이지" />
      <br />
      <Header headerType="default" text="마이 페이지" />
      <br />
      <Header headerType="default" text="프로필 수정" />
      <br />
      <Footer />
      <br />
      <Footer type="default"/>
    </>
  );
};

export default TestPage;
