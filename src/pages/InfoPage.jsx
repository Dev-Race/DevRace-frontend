import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InfoPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');
        const refreshToken = searchParams.get('refreshToken');

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('expirationTime', accessTokenExpiresIn);
        sessionStorage.setItem('refreshToken', refreshToken);
        navigate('/info');
    }, []);

    return <div></div>;
};

export default InfoPage;