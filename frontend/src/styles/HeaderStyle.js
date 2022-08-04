import styled from "styled-components";
import cssTheme from "./cssTheme";


const COLOR = {
    DarkBlue : `#001E6C`,
};

const FONT_SIZE = {
    h1 : `32px`,
    h2 : `24px`,
    h3 : `18px`,
    h4 : `11px`,
};

const HeaderContainer = styled.div`
    width : 100%;
    height : 15vh;
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a{
        
    }
    .logo{
        margin-left : 50px;
        width : 15%;
        display : flex;
        flex-direction : row;
        justify-content: space-around;
        align-items: center;
        
        .img{
            width : 70px;
        }

        .title{
            font-size : 20px;
            font-weight : bold;
            color : ${COLOR.DarkBlue};
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
    }

    @media ${cssTheme.mobile} {
        background-color : orange;
    }
    @media ${cssTheme.tabletMin} and ${cssTheme.tabletMax}{
        background-color : gray;
    }
    
    @media ${cssTheme.desktop} {
        background-color : pink;
    }
`;


export default HeaderContainer;
