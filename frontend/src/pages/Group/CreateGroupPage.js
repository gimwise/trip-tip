import React from 'react';
import MakeGroup from 'components/Group/MakeGroup';
import styled from 'styled-components';

const CreateGroupPage = () => {
    return (
        <CreateGroupContent>
                <h2>그룹 생성</h2>
                <MakeGroup/>
        </CreateGroupContent>
    );
};

export default CreateGroupPage;

const CreateGroupContent = styled.div`
    height : 70vh;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;

    form{
        margin-top : 50px;
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
    }

    input:focus {
        outline: 0;
    }

    .group-name-input{
        background-color : transparent;
        border : none;
        border-bottom : double #B5D2FF;
        font-size : 20px;
        width : 700px;
        padding : 20px;
        margin-bottom : 80px;
    }

    .submit-btn {
        width : 350px;
        height : 60px;
        font-size : 16px;
        border : none;
        border-radius : 5px;
        color : white;
        background-color : #0065FF;
    }
`;