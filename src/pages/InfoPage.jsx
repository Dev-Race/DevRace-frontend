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
import noProfile from '../assets/noProfile.png';
import Input from '../component/common/Input';

const InfoPage = () => {

    const [infoActive, setInfoActive] = useState(false);
    const [imageEditActive, setImageEditActive] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [preview, setPreview] = useState(null);
    const imgRef = useRef();

    const [name, setName] = useState(null);
    const [bojId, setBojId] = useState(null);

    const [nameError, setNameError] = useState(false)
    const [bojIdError, setBojIdError] = useState(false);

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

      reader.readAsDataURL(file);
    };

    const onClickFileBtn = () => {
      imgRef.current.click();
    };

    const onClickDefaultImage = () => {
      setImageUrl(null);
      setPreview(null);
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
        text="기존 프로필로 변경"
        onClick={onClickDefaultImage}
      />,
      <Button
        type="modalBtn2"
        shape="angle"
        text="사진 불러오기"
        onClick={onClickFileBtn}
      />,
    ];

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');
        const refreshToken = searchParams.get('refreshToken');

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('expirationTime', accessTokenExpiresIn);
        sessionStorage.setItem('refreshToken', refreshToken);
        navigate('/info');
        setInfoActive(true);
    }, []);

    useEffect(() => {
        if(name === '' || name === null) {
            setNameError(true)
        } else {
            setNameError(false)
        }
    },[name])

    useEffect(() => {
        if (bojId === '' || bojId === null) {
          setBojIdError(true);
        } else {
          setBojIdError(false);
        }
    }, [bojId]);

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
        <div className={`Info--Container--${mode}`}>
          <div className="Info--InputForm">
            <div className="Info--InputForm--Text">Sign Up</div>
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
                onChange={(e) => setName(e.target.value)}
                error={nameError}
              />
            </div>
            <div className="Info--InputBox--label">백준 id를 입력해주세요.</div>
            <div className="Info--InputBox">
              <Input
                type="normal"
                placeHolder="백준 ID를 입력하세요."
                onChange={(e) => setBojId(e.target.value)}
                error={bojIdError}
              />
            </div>
            <Button
              type="modal"
              shape="angle"
              text="설정 완료하기"
              onClick={() => {}}
              disable={nameError || bojIdError}
            />
          </div>
        </div>
        <Footer type="default" />
      </>
    );
};

export default InfoPage;