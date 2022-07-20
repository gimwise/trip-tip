import React from 'react';
import { NavLink } from 'react-router-dom';


const StartPage = () => {
    return (
        <div>
            START 페이지
            <>
                <NavLink to="/signup">회원가입</NavLink>
                <NavLink to="/signin">로그인</NavLink>
            </>
        </div>
    );
};

export default StartPage;