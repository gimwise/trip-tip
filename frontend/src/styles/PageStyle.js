import styled from "styled-components";
import cssTheme from "./cssTheme";

const DEFAULT_STYLE = `
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

export const AppContainer = styled.div`
    margin : 0;
    padding : 0;
    height : 100%;
`;

export const StartContainer = styled.div`
    height : 90%;
    display : flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    .left{
        width : 60%;
        display :flex;
        justify-content: center;
        align-items: center;

        img{
            width : 75%;
        }
    }
    .right{
        width : 40%;

        p{
            color : #747474;
        }

        .btns{
            display : flex;
            flex-direction : column;
    
            a{
                width : 55%;
                padding : 20px;
                border-radius : 5px;
                text-align : center;
                text-decoration : none;
                color : black;
                margin-bottom : 20px;
            }
    
            .signup{
                background-color : ${cssTheme.Blue};
                color : white;
            }
    
            .signin{    
                background-color : white;
                box-shadow: 0px 0px 10px 2px #E8E8E8;
            }   
        }
    }

    @media ${cssTheme.mobile} {
        // background-color : orange;
        height : 120%;
        flex-direction : column;

        .left {
            width : 80%;
            margin-bottom : 80px;
        }
        .right {
            display : flex;
            flex-direction : column;
            justify-content: center;
            align-items: center;

            .btns > a{
                width : 250px;
            }
        }

        
    }
    @media ${cssTheme.tabletMin} {
        // background-color : pink;
    }
`;

export const MainContainer = styled.div`
    ${DEFAULT_STYLE}
`;

export const SignUpContainer = styled.div`
    height : 80%;
    ${DEFAULT_STYLE}
`;

export const SignInContainer = styled.div`
    height : 80%;
    ${DEFAULT_STYLE}
`;

export const GroupListContainer = styled.div`
    ${DEFAULT_STYLE}
    flex-direction : column;
    align-items : flex-start;
    padding : 0 60px;

    h2{
        font-size : ${cssTheme.h2};
    }
    .line{
        width : 90vw;
        height : 1px;
        background-color : #B5D2FF;
    }

    .group-list{
        display : flex;

        .group{
            width : 180px;
            height : 250px;
            background-color : pink;

            .img-wrapper{
                width : 100%;
                height : 180px;
            }
            img{
                width : 100%;
                overflow : hidden;
                
            }
        }
    }
`;