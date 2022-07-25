import React, { useEffect } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie, removeCookie } from 'utils/Cookie';
import styled from 'styled-components';

const LogoutButton = () => {

    const onClick = () => {
        AxiosAPI.post('/users/signout/', {
            "refresh" : getCookie('refresh-token')
        }, 
        {
            Authorization: `JWT ${getCookie('access-token')}`
        })
        .then(res => {
            removeCookie('access-token');
            removeCookie('refresh-token');
            removeCookie('nickname');

            window.location.replace("http://localhost:3000/");
        })
    }

    return (
        <div>
            <SignoutBtn onClick={onClick}>로그아웃</SignoutBtn>        
        </div>
    );
};

export default LogoutButton;

const SignoutBtn = styled.button`
    cursor : pointer;
    background-color : transparent;
    color : black;
    text-decoration : none;
    text-align : center;
    border : none;
`;