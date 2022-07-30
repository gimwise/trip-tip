import React, { useEffect } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie, removeCookie } from 'utils/Cookie';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from 'store/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = () => {

        const body = {
            refresh : getCookie('refresh-token')
        }

        dispatch(logout(body)).then(res => {
            console.log("🟢 LOGOUT SUCCESS");
            removeCookie("refresh-token");
            removeCookie("access-token");
            navigate("/");
        }).catch(err=>{
            console.log("🔴 LOGINOUT FAILURE");
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