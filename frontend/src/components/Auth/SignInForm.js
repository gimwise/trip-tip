import React, { useState } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import styled from 'styled-components';
import { getCookie, setCookie } from 'utils/Cookie';

const SignInForm = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();

        AxiosAPI.post(
            '/users/signin/', {
                nickname : nickname,
                password : password
            }
        ).then((res)=>{
            console.log(res.data.refresh);
            localStorage.setItem('refresh', res.data.refresh);
            setCookie('access-token', res.data['access-token']);
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
                <input type='submit' value="로그인"/>
            </form>
        </Container>
    );
};

export default SignInForm;

const Container = styled.div`
    width : 100%;
    height : 90%;
    display : flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

