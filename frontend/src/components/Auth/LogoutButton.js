import React from 'react';
import styled from 'styled-components';
import useLogout from 'hooks/useLogout';
import { SignoutBtn } from 'styles/BtnStyle';

const LogoutButton = () => {
    const LogOutOnClick = useLogout();

    return (
        <div>
            <SignoutBtn onClick={LogOutOnClick}>로그아웃</SignoutBtn>        
        </div>
    );
};

export default LogoutButton;

