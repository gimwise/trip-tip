import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login, setAccessToken, setIsLogin, setRefreshToken } from 'store/auth';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'utils/Cookie';

const SignInForm = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.auth);
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();

        const body = {
            nickname : nickname,
            password : password
        };

        dispatch(login(body)).then(res => {
            console.log("🟢 LOGIN SUCCESS");
            dispatch(setIsLogin(true));
            setCookie("refresh-token", res.payload.data.refresh);
            setCookie("access-token", res.payload.data.access);
            // dispatch(setAccessToken(`JWT ${res.payload.data.refresh}`));
            console.log(store);
            navigate("/main");
        }).catch(err => {
            console.log(err);
            console.log("🔴 LOGIN ERROR CODE : " + err.response.status);
            dispatch(setIsLogin(false));
            alert("아이디 또는 비밀번호를 올바르게 입력하세요.");
        });

    };

    const on = () => {
        console.log(store);
    }
    return (
        <Container className='signin-content'>
            <button onClick={on}>확인</button>
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

