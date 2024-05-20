import Button from '../component/common/Button';
import { useNavigate } from 'react-router-dom';
import google_icon from '../icons/google_icon.svg';
import git_icon from '../icons/git_icon.svg';
import Pagination from '../component/common/PageNation';
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

  const [mode, setMode] = useState('light');

  const handleToggleChange = (isOn) => {
    setMode(isOn ? 'dark' : 'light');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSelect = (select) => {
    setSelectedOption(select);
  };
  return (
    <>
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="small"
        mode="light"
        shape="angle"
        text="문제확인"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="small"
        mode="dark"
        shape="angle"
        text="문제확인"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="modal"
        mode="light"
        shape="angle"
        text="확인"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        mode="light"
        shape="angle"
        text="확인"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        mode="dark"
        shape="angle"
        text="확인"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        mode="light"
        shape="non-angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="large"
        mode="dark"
        shape="non-angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal1"
        mode="light"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal2"
        mode="light"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal3"
        mode="light"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal1"
        mode="dark"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal2"
        mode="dark"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="normal3"
        mode="dark"
        shape="angle"
        text="시작하기"
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="leftIcon"
        mode="dark"
        shape="angle"
        text="Log in with Google"
        icon={google_icon}
      />
      <br />
      <br />
      <Button
        onClick={() => navigate('/aaa')}
        type="leftIcon"
        mode="light"
        shape="angle"
        text="Log in with Github"
        icon={git_icon}
      />
      <br />
      <br />
      <Pagination
        currentPage={currentPage}
        totalPages="10"
        onPageChange={handlePageChange}
        mode="light"
      />
      <br />
      <br />
      <Pagination
        currentPage={currentPage}
        totalPages="10"
        onPageChange={handlePageChange}
        mode="dark"
      />
      <br />
      <br />
      <Input
        type="nomal"
        mode="light"
        placeHolder="이름을 입력하세요."
        onChange={handleInputChange}
        error={isError}
      />
      <br />
      <br />
      <Input
        type="nomal"
        mode="dark"
        placeHolder="이메일을 제외한 아이디만 적어주세요."
        onChange={handleInputChange}
        error={isError}
      />
      <br />
      <br />
      <Dropdown type="language" onSelect={handleSelect} />
      <br />
      <br />
      <Dropdown type="status" onSelect={handleSelect} />
      <br />
      <br />
      <Push type="profileEdit" />
      <br />
      <br />
      <Push type="modeChange" mode="light" />
      <br />
      <br />
      <Push type="modeChange" mode="dark" />
      <br />
      <br />
      <Push type="inviteFriend" mode="light" />
      <br />
      <br />
      <Push type="inviteFriend" mode="dark" />
      <br />
      <br />
      <Modal type="regist_modal" />
      <br />
      <br />
      <Modal type="edit_image_modal" />
      <br />
      <br />
      <Header mode={mode} leftContent="내 코드 페이지" />
      <br />
      <br />
      <Header
        mode={mode}
        onToggleChange={handleToggleChange}
        type="with_right_items"
        buttonTexts={['내 코드', '로그아웃']}
        leftContent="rogo"
      />
      <br />
      <br />
      <Footer mode="light" />
      <br />
      <br />
      <Footer mode={mode} />
      <br />
      <br />
      <Footer mode="none" />
      <br />
      <br />
      <Toggle isOn={mode === 'dark'} onToggleChange={handleToggleChange} />
      <br />
      <br />
      <RankList mode={mode} />
    </>
  );
};

export default TestPage;
