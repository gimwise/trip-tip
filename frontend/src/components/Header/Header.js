import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from 'assets/image/logo-blue.png';
import { NavLink } from 'react-router-dom';
import { getCookie } from 'utils/Cookie';

const Header = () => {
    const [username, setUsername] = useState("");

    useEffect(()=>{
        setUsername(getCookie("nickname")); // 지금은 nickname
    }, [username]);

    return (
        <Container>
            <Logo href='/'>
                <LogoImg
                    src={logo}
                    alt='logo'
                />
                <LogoTitle>TRIP TIP</LogoTitle>
            </Logo>
            <Element>
                <>      
                    {/* 로그인되어있으면 프로필, 알림 이미지 */}
                    {username}
                </> 
            </Element>

        </Container>
    );
};

export default Header;

const Container = styled.div`
    width : 100%;
    height : 10%;
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // border-bottom : 1px solid black;
`;

const Element = styled.div`
    display : flex;
    padding-right : 20px;
    justify-content: space-between;
`;

const Logo = styled.a`
    text-decoration : none;
    margin-top : 40px;
    margin-left : 70px;
    display : flex;
    align-items : center;
    justify-content: center;
`;

const LogoImg = styled.img`
    width : 50px;
`;

const LogoTitle = styled.p`
    margin-left : 30px;
    font-size: 16px;
    font-weight: bold;
    color : #001E6C;
`;

const SignupButton = styled(NavLink)`
    text-decoration : none;
    color : black;
    border : none;
    cursor: pointer;
    padding : 10px 15px;
    border-radius: 0.5rem;
    background-color : white;
    margin : 0 15px;
`;

const SigninButton = styled(NavLink)`
    text-decoration : none;
    border : none;
    cursor: pointer;
    padding : 10px 15px;
    border-radius: 0.5rem;
    background-color: #035397;
    color : white;
    margin : 0 15px;
`;
