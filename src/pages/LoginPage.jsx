import React from 'react';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import '../styles/pages/LoginPage.scss';
import { useSelector } from 'react-redux';
import Button from '../component/common/Button';

const LoginPage = () => {
    const ENDPOINT = process.env.REACT_APP_ENDPOINT;
    const { mode } = useSelector((state) => state.toggle);

    const navigateTo = (type) => {
        window.location.href = ENDPOINT + '/oauth2/authorization/' + type;
    }

    return (
      <>
        <Header headerType="login" />
        <div className={`Login--Container--${mode}`}>
          <div className="Login--Form">
            <div className="Login--Text">Login</div>
            <div className="Login--Buttons">
              <Button
                type="login"
                shape="angle"
                text="Log in with Google"
                icon="google"
                onClick={() => navigateTo('google')}
              />
              <Button
                type="login"
                shape="angle"
                text="Log in with Github"
                icon="github"
                onClick={() => navigateTo('github')}
              />
            </div>
          </div>
        </div>
        <Footer type="default" />
      </>
    );
};

export default LoginPage;