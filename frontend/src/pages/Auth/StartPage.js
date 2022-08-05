import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import startImg from 'assets/image/main-page-image.png';
import { StartContainer } from 'styles/PageStyle';

const StartPage = ({isLogin}) => {

    if(isLogin === true){
        window.location.replace("/main");
    }

    return (
        <StartContainer>
            <div className='left'>
                <img src={startImg} alt='비둘기'/>
            </div>

            <div className='right'>
                <h1>
                    이번 모임 총무하실분...?
                </h1>
                <h1>
                    저희가 합니다, 그 총무!
                </h1>
                <p>TRIP TIP으로 쉽게 정산하세요.</p>
                <div className='btns'>
                    <NavLink 
                        className='signup'
                        to="/signup"
                    >
                        회원가입
                    </NavLink>
                    <NavLink 
                        className='signin'
                        to="/signin"
                    >
                        로그인
                    </NavLink>
                </div>
            </div>
        </StartContainer>
    );
};

export default StartPage;

