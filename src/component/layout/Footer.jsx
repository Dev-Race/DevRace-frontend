import '../../styles/layout/Footer.scss';
import Button from '../common/Button';
import { useSelector } from 'react-redux';

/**
 * 푸터 타입 -> light dark none
 * " Dev Race @ 2024. All rights reserved. " 만 렌더링하고 싶은 경우
 * 타입 -> none 으로 지정해주기
 */

const Footer = (props) => {
  const { type, handleCompile, handleExampleCompile, openProblemPage } = props;
  const { mode } = useSelector((state) => state.toggle);
  if (type === 'default') {
    return (
      <div className={`footer_container--${mode} footer_container--default`}>
        <div className="footer_text_container">
          Dev Race @ 2024. All rights reserved.
        </div>
      </div>
    );
  }

  return (
    <div className={`footer_container--${mode}`}>
      <div className="footer_left_items">
        <Button
          type="normal1"
          mode={mode}
          shape="angle"
          text="예제 채점"
          onClick={handleExampleCompile}
        />
      </div>
      <div className="footer_right_items">
        <Button
          type="normal2"
          mode={mode}
          shape="angle"
          text="출력 확인"
          onClick={handleCompile}
        />
        <Button
          type="normal3"
          mode={mode}
          shape="angle"
          text="제출 하기"
          onClick={openProblemPage}
        />
      </div>
    </div>
  );
};

export default Footer;
