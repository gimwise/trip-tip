import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LogoutButton from 'components/Auth/LogoutButton';
import logo from 'assets/image/logo-blue.png';
import { NavLink } from 'react-router-dom';
import { getCookie } from 'utils/Cookie';
import noAlertImg from 'assets/image/bell-01.png';
import alertImg from 'assets/image/bell-02.png';
import user from 'assets/image/user.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderContainer from 'styles/HeaderStyle';
import useAuthStore from 'hooks/useAuthStore';
import useGroupStore from 'hooks/useGroupStore';

const Header = () => {

    const {authStore, handleAuthOnClick} = useAuthStore();

    const {groupStore, handleGroupOnClick} = useGroupStore();
    
    
    return (
        <HeaderContainer>
            <NavLink 
                className='logo'
                to= "/main"
            >
                <img
                    className='img' 
                    src={logo}
                    alt="trip-tip logo"
                />
                <p className='title'>
                    TRIP TIP
                </p>
            </NavLink>
            <ul className='nav'>
                {/* 임시 (스토어 확인용) */}
                {/* <li>
                    <button onClick={handleAuthOnClick}>사용자 스토어</button>
                    <button onClick={handleGroupOnClick}>그룹 스토어</button>
                </li> */}
                    {authStore.isLogin === true ? 
                        <>
                        {/* 나중에 알람 유무도 나눠야함 */}
                            <li>
                                <NavLink to="/alert">
                                    <img src={noAlertImg} alt='alert'/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/mypage">
                                    <img src={user} alt='user page'/>
                                </NavLink>
                            </li>
                        </>
            
                    : 
                        <></>
                    }
            </ul>
            

        </HeaderContainer>
    );
};

export default Header;
