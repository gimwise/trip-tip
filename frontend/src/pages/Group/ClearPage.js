import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import clear from 'assets/image/clear.png'
const ClearPage = () => {
    return (
        <Container>
            <div>
                <img src={clear}/>
                <h1>정산 완료!</h1>
                <Check to="/main">확인</Check>
            </div>
        </Container>
    );
};

export default ClearPage;

const Container = styled.div`
    width : 100%;
    height : 90%;
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    *{
        display : flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin : 15px;
    }
`

const Check = styled(NavLink)`
    width : 300px;
    height : 50px;
    display : flex;
    justify-content: center;
    align-items: center;
    background-color : #0065FF;
    color : white;
    text-decoration : none;
    border-radius : 5px;
    margin-top :80px;
`