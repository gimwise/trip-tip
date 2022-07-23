import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import startImg from 'assets/image/main-page-image.png';

const StartPage = ({isLogin}) => {

    if(isLogin === true){
        window.location.replace("http://localhost:3000/main");
    }

    return (
        <Container>
            <div className='left'>
                <img src={startImg} />
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
                    <NavBlue to="/signup">회원가입</NavBlue>
                    <NavWhite to="/signin">로그인</NavWhite>
                </div>
            </div>
        </Container>
    );
};

export default StartPage;

const Container = styled.div`
    height : 90%;
    display : flex;
    justify-content: center;
    align-items: center;

    img{
        width : 620px;
    }
    .right{
        margin-left : 50px;
    }
    p{
        color : #747474;
    }
    .btns{
        display : flex;
        flex-direction : column;
    }
`;

const NavBlue = styled(NavLink)`
    width : 300px;
    background-color : #0065FF;
    color : white;
    text-decoration : none;
    padding : 20px;
    text-align : center;
    border-radius : 5px;
    margin-bottom : 20px;
`;

const NavWhite = styled(NavLink)`
    width : 300px;
    text-decoration : none;
    color : black;
    padding : 20px;
    text-align : center;
    border-radius : 5px;
    box-shadow: 0px 0px 10px 2px #E8E8E8;
`;