import styled from "styled-components";
import cssTheme from "./cssTheme";

const HeaderContainer = styled.div`
    width : 100%;
    height : 10vh;
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .logo{
        margin-left : 50px;
        width : 15%;
        display : flex;
        flex-direction : row;
        justify-content: space-around;
        align-items: center;
        text-decoration : none;
        
        .img{
            width : 40px;
        }

        .title{
            font-size : ${cssTheme.h3};
            font-weight : bold;
            color : ${cssTheme.DarkBlue};
        }
    }

    .nav{
        margin-right : 50px;
        list-style : none;
        width : 5%;
        display : flex;
        flex-direction : row;
        align-items : center;
        justify-content: space-between;

        .nav-img{
            width : 20px;
        }
    }

    @media ${cssTheme.mobile} {
        // background-color : orange;

        .logo > .title {
            display : none;
        }

    }
    @media ${cssTheme.tabletMin} {
        // background-color : pink;
    }
`;

export default HeaderContainer;
