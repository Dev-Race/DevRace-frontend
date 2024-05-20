import Button from '../component/common/Button';
import { useNavigate } from 'react-router-dom';
import Pagination from '../component/common/Pagination';
import { useState } from 'react';
import Input from '../component/common/Input';
import Dropdown from '../component/common/DropDown';
import Push from '../component/common/Push';
import Modal from '../component/common/Modal';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import Toggle from '../component/common/Toggle';
import RankList from '../component/common/RankList';

const TestPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const rankings = [
    { rank: 1, name: 'qwer' },
    { rank: 2, name: 'qwer' },
    { rank: 3, name: 'qwer' },
    { rank: '4', name: 'qwer' },
    { rank: '-', name: 'qwer' },
  ];

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSelect = (select) => {
    setSelectedOption(select);
  };
  return (
    <>
      <br />
      <Dropdown type="language" onSelect={handleSelect} />
      <br />
      <Dropdown type="status" onSelect={handleSelect} />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="small"
        shape="angle"
        text="문제확인"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="modal"
        shape="angle"
        text="확인"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        shape="angle"
        text="확인"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        shape="non-angle"
        text="시작하기"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal1"
        shape="angle"
        text="시작하기"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal2"
        shape="angle"
        text="시작하기"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal3"
        shape="angle"
        text="시작하기"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="login"
        shape="angle"
        text="Log in with Github"
        icon="github"
      />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="login"
        shape="angle"
        text="Log in with Google"
        icon="google"
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
      <Push type="profileEdit" />
      <br />
      <Push type="modeChange" />
      <br />
      <Push type="inviteFriend" />
      <br />
      <Modal type="regist_modal" />
      <br />
      <Modal type="edit_image_modal" />
      <br />
      <Header leftContent="내 코드 페이지" />
      <br />
      <Header
        type="with_right_items"
        buttonTexts={['내 코드', '로그아웃']}
        leftContent="logo"
      />
      <br />
      <Footer />
      <br />
      <Toggle />
      <br />
      <RankList rankings={rankings} />
    </>
  );
};

export default TestPage;
