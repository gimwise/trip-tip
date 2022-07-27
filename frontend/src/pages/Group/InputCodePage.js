import React from 'react';
import JoinGroupForm from 'components/Group/JoinGroupForm';
import styled from 'styled-components';

const InputCodePage = () => {

    return (
        <Container>
            <div>
                <h2>코드 입력</h2>
                <JoinGroupForm/>
            </div>
        </Container>
    );
};
export default InputCodePage;

const Container = styled.div`
    width : 100%;
    height : 80vh;
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2{
        width : 590px;
        text-align:left;
    }

    form{
        display : flex;
        flex-direction : column;
        align-items : center;
    }
    .input{
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
    .submit{
        padding : 15px;
        background-color : #0065FF;
        width : 250px;
        border : none;
        border-radius : 10px;
        color : white;
        cursor : pointer;
    }
}
`
