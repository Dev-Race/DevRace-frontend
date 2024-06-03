import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';

// import errorIcon from '../assets/icons/error_icon.svg';
// import Button from '../component/common/Button';
// import Modal from '../component/common/Modal';

const ProfilePage = () => {
  /*
  const resignButton = [
    <Button
      type="modalBtn1"
      shape="angle"
      text="돌아가기"
      onClick={() => {
        console.log('clicked');
      }}
    />,
     <Button
      type="modalBtn2"
      shape="angle"
      text="탈퇴하기"
      onClick={() => {
        console.log('clicked');
      }}
    />
  ];
  */

  return (
    <div>
      <Header headerType="default" text="마이페이지" />
      {/*  <div>
          <Modal
            imageSource={errorIcon}
            title="탈퇴하시나요?"
            content="원치 않으시면 돌아가기를 눌러주세요."
            buttons={resignButton}
          />
        </div>*/}
      <Footer type="default" />
    </div>
  );
};

export default ProfilePage;
