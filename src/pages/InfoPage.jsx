import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../component/common/Modal';

import '../styles/pages/InfoPage.scss';
import errorIcon from '../assets/icons/error_icon.svg';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import Button from '../component/common/Button';

import imageEdit from '../assets/icons/setting.svg';
import yes from '../assets/icons/yes_black.svg';
import noProfile from '../assets/noProfile.png';
import Input from '../component/common/Input';
import { signUpApi } from '../apis/register';
import { memberInfo } from '../apis/member';

const InfoPage = () => {
    const [infoActive, setInfoActive] = useState(false);
    const [imageEditActive, setImageEditActive] = useState(false);
    const [bojActive, setBojActive] = useState(false);
    const [completeActive, setCompleteActive] = useState(false);
    const [signUpState, setSignUpState] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isChangeImage, setIsChangeImage] = useState(0);
    const imgRef = useRef();

    const [name, setName] = useState('');
    const [bojId, setBojId] = useState('');

    const [nameError, setNameError] = useState(false);
    const [bojIdError, setBojIdError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [nameTouched, setNameTouched] = useState(false);
    const [bojIdTouched, setBojIdTouched] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

  const { mode } = useSelector((state) => state.toggle);

  const onChangeImage = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 선택
    if (!file) return;

    const reader = new FileReader();
    setImageUrl(file);
    reader.onloadend = () => {
      // 이미지를 미리보기로 설정
      setPreview(reader.result);
    };
    setIsChangeImage(1);
    reader.readAsDataURL(file);
  };

  const onClickFileBtn = () => {
    imgRef.current.click();
  };

  const onClickDefaultImage = () => {
    setIsChangeImage(1);
    setImageUrl(null);
    setPreview(null);
  };

  const onSumbit = async (file, nickname, bojId, isChangeImage) => {
    setNameTouched(true);
    setBojIdTouched(true);

    if (name && bojId) {
      let res = await signUpApi(
        file,
        nickname,
        bojId,
        isChangeImage,
        setBojIdError,
        setErrorMessage,
      );
      if (res !== null) {
        sessionStorage.setItem('bojId', res.userResponseDto.bojId);
        sessionStorage.setItem('imageUrl', res.userResponseDto.imageUrl);
        sessionStorage.setItem('nickname', res.userResponseDto.nickname);
        sessionStorage.setItem('userId', res.userResponseDto.userId);
        sessionStorage.setItem('accessToken', res.tokenResponseDto.accessToken);
        sessionStorage.setItem(
          'refreshToken',
          res.tokenResponseDto.refreshToken,
        );
        sessionStorage.setItem(
          'expirationTime',
          res.tokenResponseDto.accessTokenExpiresIn,
        );
        setBojActive(true);
      }
    }
  };

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop(); 
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
  };

  const infoButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        setInfoActive(false);
      }}
    />,
  ];

  const imageEditButton = [
    <Button
      type="modalBtn1"
      shape="angle"
      text="기본 프로필로 변경"
      onClick={onClickDefaultImage}
    />,
    <Button
      type="modalBtn2"
      shape="angle"
      text="사진 불러오기"
      onClick={onClickFileBtn}
    />,
  ];

  const bojButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        window.open('https://www.acmicpc.net/setting/solved.ac', '_blank');
        setBojActive(false);
        setSignUpState(true);
      }}
    />,
  ];

  const completeButton = [
    <Button
      type="modal"
      shape="angle"
      text="확인"
      onClick={() => {
        setCompleteActive(false)
        navigate('/')
      }}
    />,
  ];

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && accessTokenExpiresIn && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('expirationTime', accessTokenExpiresIn);
        sessionStorage.setItem('refreshToken', refreshToken);
    }
    memberInfo();
    navigate('/info');
    setInfoActive(true); 
  }, []);

  useEffect(() => {
    const image = sessionStorage.getItem('imageUrl');
    const nickname = sessionStorage.getItem('nickname');

    if (image !== null) {
      setPreview(image);
      setImageUrl(convertURLtoFile(image));
    }

    if (nickname !== null) {
      setName(nickname);
    }
  }, [infoActive])

  useEffect(() => {
    if (nameTouched && (name === '' || name === null)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name, nameTouched]);

  useEffect(() => {
    if (bojIdTouched && (bojId === '' || bojId === null)) {
      setBojIdError(true);
    } else {
      setBojIdError(false);
    }
  }, [bojId, bojIdTouched]);

  return (
    <>
      <Header headerType="login" />
      {infoActive && (
        <div className="Info--Modal--Wrapper">
          <Modal
            imageSource={errorIcon}
            title="회원가입으로 이동합니다!"
            content="가입되지 않은 계정입니다."
            buttons={infoButton}
            isActive={infoActive}
            setIsActive={setInfoActive}
          />
        </div>
      )}
      {imageEditActive && (
        <div className="Info--Modal--Wrapper">
          <Modal
            buttons={imageEditButton}
            isActive={imageEditActive}
            setIsActive={setImageEditActive}
            preview={preview}
          />
        </div>
      )}
      {bojActive && (
        <div className="Info--Modal--Wrapper">
          <Modal
            imageSource={errorIcon}
            title="백준페이지로 이동합니다!"
            content="solved를 연동시켜주세요."
            buttons={bojButton}
            isActive={bojActive}
            setIsActive={setBojActive}
          />
        </div>
      )}
      {completeActive && (
        <div className="Info--Modal--Wrapper">
          <Modal
            imageSource={yes}
            title="가입이 완료되었습니다."
            buttons={completeButton}
            isActive={completeActive}
            setIsActive={setCompleteActive}
          />
        </div>
      )}
      <div className={`Info--Container--${mode}`}>
        <div className="Info--InputForm">
          <div className="Info--InputForm--Text">Sign Up</div>
          {!signUpState ? (
            <>
              <img
                src={preview ? preview : noProfile}
                className="Info--InputImage"
                alt="profileImage"
              />
              <input
                type="file"
                ref={imgRef}
                onChange={onChangeImage}
                style={{ display: 'none' }}
              />
              <img
                src={imageEdit}
                alt="imageEdit"
                className="Info--EditImage"
                onClick={() => setImageEditActive(!imageEditActive)}
              />
              <div className="Info--InputBox--label">이름을 작성해주세요.</div>
              <div className="Info--InputBox">
                <Input
                  type="normal"
                  placeHolder="이름을 입력하세요."
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!nameTouched) setNameTouched(true);
                  }}
                  error={nameTouched && nameError}
                  value={name}
                />
              </div>
              <div className="Info--InputBox--label">
                백준 id를 입력해주세요.
              </div>
              <div className="Info--InputBox">
                <Input
                  type="normal"
                  placeHolder="백준 ID를 입력하세요."
                  onChange={(e) => {
                    setBojId(e.target.value);
                    if (!bojIdTouched) setBojIdTouched(true);
                  }}
                  error={bojIdTouched && bojIdError}
                />
                {bojIdError && (
                  <div className="Info--InputBox--error">{errorMessage}</div>
                )}
              </div>
              <Button
                type="modal"
                shape="angle"
                text="설정 완료하기"
                onClick={() => onSumbit(imageUrl, name, bojId, isChangeImage)}
                disable={nameError || bojIdError}
              />
            </>
          ) : (
            <>
              <img
                src={
                  sessionStorage.getItem('imageUrl')
                    ? sessionStorage.getItem('imageUrl')
                    : noProfile
                }
                className="Info--Image"
                alt="profileImage"
              />
              <div className="Info--Nickname">
                {sessionStorage.getItem('nickname')}
              </div>
              <div className="Info--bojId">
                {sessionStorage.getItem('bojId')}
              </div>
              <Button
                type="modal"
                shape="angle"
                text="가입 완료하기"
                onClick={() => {
                  setCompleteActive(!completeActive);
                }}
              />
            </>
          )}
        </div>
      </div>
      <Footer type="default" />
    </>
  );
};

export default InfoPage;
