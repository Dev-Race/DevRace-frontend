import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Apis from '../apis/Api';

const RedirectPage = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    console.log(params.link)
    
    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const expirationTime = sessionStorage.getItem('expirationTime');
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!accessToken || !expirationTime || !refreshToken) {
            localStorage.setItem('redirectUrl', pathname);
            sessionStorage.clear();
            navigate('/');
        }
    }, []);

    useEffect(() => {
        Apis.get(`/rooms`, {
            params : {
                link : params.link,
                page : 0
            }
        })
        .then(response => {
            if(response.data.data.roomState === 'WAIT') {
                navigate('/wait/'+response.data.data.roomId);
            } else {
                navigate('/solve/' + response.data.data.roomId);
            }
        })
    })
    return (
        <></>
    );
};

export default RedirectPage;