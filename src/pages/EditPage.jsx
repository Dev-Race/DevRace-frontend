import React, { useEffect, useRef, useState } from 'react';
import '../styles/pages/EditPage.scss';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useSelector } from 'react-redux';
import { memberInfo } from '../apis/member';
import Button from '../component/common/Button';
import Modal from '../component/common/Modal';
import noProfile from '../assets/noProfile.png';
import imageEdit from '../assets/icons/setting.svg';
import Input from '../component/common/Input';
import Apis from '../apis/Api';
import { useNavigate } from 'react-router-dom';

const EditPage = () => {
    const { mode } = useSelector((state) => state.toggle);
    const navigate = useNavigate();

    const [info, setInfo] = useState(null);
    const [imageEditActive, setImageEditActive] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isChangeImage, setIsChangeImage] = useState(0);
    const imgRef = useRef();
    const [name, setName] = useState(null);

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
        setImageEditActive(false);
    };

    const onClickDefaultImage = () => {
        setIsChangeImage(1);
        setImageUrl(null);
        setPreview(null);
        setImageEditActive(false)
    };

    const convertURLtoFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      const ext = url.split('.').pop();
      const filename = url.split('/').pop();
      const metadata = { type: `image/${ext}` };
      return new File([data], filename, metadata);
    };

    const onSumbit = async (file, nickname, isChangeImage) => {
      const formData = new FormData();

      formData.append('imageFile', isChangeImage !== 0 && file ? file : null);
      formData.append(
        'userUpdateRequestDto',
        JSON.stringify({
          nickname: nickname,
          isImageChange: isChangeImage,
        }),
      );
        Apis.put('/users', formData)
        .then((response) => {
            navigate('/mypage')
            sessionStorage.setItem('edit', true);
        })
    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await memberInfo();
                setInfo(response);
            } catch (error) {
                console.error('Error fetching member info:', error);
            }};
        fetchData();
    }, []);

    useEffect(() => {
        if (info !== null) {
            if(info.imageUrl != null) {
              setPreview(info.imageUrl);
              setImageUrl(convertURLtoFile(info.imageUrl));
            } else {
              setPreview(null);
              setImageUrl(null);
            }
            setName(info.nickname);
        }
    }, [info])

    return (
      <>
        {imageEditActive && (
          <div className="editpage--Modal--Wrapper">
            <Modal
              buttons={imageEditButton}
              isActive={imageEditActive}
              setIsActive={setImageEditActive}
              preview={preview}
            />
          </div>
        )}
        <div className={`editpage--container--${mode}`}>
          <Header headerType="default" text={'프로필 수정'} />
          <div className="editpage--modal">
            <div className="editpage--edit--text">Profile</div>
            <img
              src={preview ? preview : noProfile}
              className="editpage--InputImage"
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
              className="editpage--EditImage"
              onClick={() => setImageEditActive(!imageEditActive)}
            />
            <div className="editpage--InputBox">
              <Input
                type="normal"
                placeHolder="이름을 입력하세요."
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
            <Button
              type="modal"
              shape="angle"
              text="설정 완료하기"
              onClick={() => onSumbit(imageUrl, name, isChangeImage)}
            />
          </div>
          <Footer type="default" />
        </div>
      </>
    );
};

export default EditPage;