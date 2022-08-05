import styled from "styled-components";
import cssTheme from "./cssTheme";

const AuthFormContainer = styled.div`
    width : 45vw;
    display : flex;
    flex-direction : column;
    justify-content : center;
    // align-items : center;

    h1{
        font-size : ${cssTheme.h2};
    }
    form {
        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : center;

        input{
            border : 1px solid #C7C7C7;
            border-radius : 30px;
            width : 350px;
            padding : 15px;
            margin : 5px 0;
        }

        input[type="submit"]{
            width : 180px;
            cursor : pointer;
            background-color : #0065FF;
            color : white;
            border : 0;
        }
        select{
            position : relative;
            margin : 5px 0;
            border-radius : 30px;
            padding: 15px;
            color : white;
            border: 0;
            border-right: 16px solid transparent;
            background-color : #84A6FF;
            left : -128px;
        }

    }
`;

export default AuthFormContainer;