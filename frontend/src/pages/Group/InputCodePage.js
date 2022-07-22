import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const InputCodePage = () => {
    return (
        <Container>
            <h2>코드 입력</h2>
            <input
                placeholder='CODE'
            />
            <Btn to="/calculate">참여</Btn>
        </Container>
    );
};
export default InputCodePage;

const Container = styled.div`
    width : 100%;
    height : 90%;
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2{
        width : 590px;
        text-align:left;
    }

    input{
        border : 1px solid #C7C7C7;
        border-radius : 25px;
        width : 600px;
        padding : 15px;
        margin : 4% 0px;
        background-color: white;
        justify-content: center;
        text-align:left;
        font-color : 
    }
}
`
const Btn = styled(NavLink)`
    width : 300px;
    height : 25px;
    background-color: #0065FF;
    color : white;
    text-decoration : none;
    padding : 20px;
    text-align : center;
    border-radius : 5px;
    margin-top : 60px;
`;