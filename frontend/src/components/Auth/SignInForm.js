import React, { useState } from 'react';
import { request } from 'apis/request';
import styled from 'styled-components';
import { setCookie } from 'utils/Cookie';
import { Axios } from 'axios';


const SignInForm = () => {

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();

        const body = {
            nickname : nickname,
            password : password
        };


        Axios.post(
            '/users/signin/', {
                nickname : nickname,
                password : password
            }
        ).then((res)=>{
            console.log(res);
            setCookie('refresh-token', res.refresh);
            setCookie('access-token', res.access);
            setCookie('nickname', nickname);
            
            window.location.replace("http://localhost:3000/main");
        }).catch((error)=> {
            console.log(error);
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            setNickname("");
            setPassword("");
        });
    }

    return (
        <Container className='signin-content'>
            <h1>로그인</h1>
            <form onSubmit={onSubmit}>
                {/* 아이디 */}
                <input
                    name = 'nickname'
                    value = {nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder='아이디'
                    required
                />
                <br/>
                {/* 비밀번호 */}
                <input
                    name = 'password'
                    value = {password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='비밀번호'
                    required
                />
                <br/>
                <input type='submit' value="로그인" />
            </form>
        </Container>
    );
};

export default SignInForm;

const Container = styled.div`
    width : 100%;
    height : 80vh;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-size : 22px;
    }
    form{
        display:flex;
        flex-direction: column;
        justify-content : center;
        align-items : center;
    };
    input{
        border : 1px solid #C7C7C7;
        border-radius : 25px;
        width : 350px;
        padding : 15px;
        margin : 10px 0;
    }
    input[type="submit"]{
        cursor : pointer;
        background-color : #0065FF;
        color : white;
        width : 200px;
        border : 0px;
        border-radius : 10px;
    }
`

