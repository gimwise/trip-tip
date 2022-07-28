import React, { useEffect } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie, removeCookie } from 'utils/Cookie';
import styled from 'styled-components';

const LogoutButton = () => {

    const onClick = () => {

        const body = {
            refresh : getCookie('refresh-token')
        }

        console.log(body);

        AxiosAPI.get("/users/signout",body,{
            Authorization: `JWT ${getCookie('access-token')}`
        }).then((res)=> {
            // setList(res.data);
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
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