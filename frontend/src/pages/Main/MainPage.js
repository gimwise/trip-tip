import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import AxiosAPI from 'apis/AxiosAPI';
import styled from 'styled-components';
import MainPageLogo from 'assets/image/main-page-logo.png'
import boy1 from 'assets/image/boy1.png'
import boy2 from 'assets/image/boy1.png'
import girl1 from 'assets/image/girl1.png'
import girl2 from 'assets/image/girl2.png'


const Main = () => {
    return (
        <Container>
            <Top>
                <div className='TopContent'>
                    <div>
                        <div>
                            안녕하세요!<br></br>TRIP TIP이 여러분의 총무가 되어드립니다.
                        </div>
                    </div>
                    <div>
                        <img src={MainPageLogo} />
                    </div>
                </div>
            </Top>
            <Bottom>
                <div className='btns'>
                    <GroupMake to="/group">그룹 생성</GroupMake>
                    <GroupJoin to="/code">그룹 참여</GroupJoin>
                </div>
                <div className='box'>
                    <h1>
                        최근 활동 >
                    </h1>
                    <div className='party'>
                        <div>
                            멋사 MT
                            <Character>
                                <img src={girl1}/>
                                <img src={boy1}/>
                                <img src={girl2}/>
                                <img src={boy2}/>
                            </Character>
                        </div>
                        <div>
                            아뜰리에 빈
                            <Character>
                                <img src={girl1}/>
                                <img src={boy1}/>
                                <img src={girl2}/>
                            </Character>
                        </div>
                        <div>
                            낭만 주먹
                            <Character>
                                <img src={girl1}/>
                                <img src={boy1}/>
                                <img src={girl2}/>
                                <img src={boy2}/>
                            </Character>
                        </div>
                    </div>
                </div>
            </Bottom>
        </Container>
    );
};

export default Main;

const Container = styled.div`
    width : 100%;
    height : 90%;
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Top = styled.div`
    background-color: white;
    width : 100%;
    height : 15%;
    display : flex;
    flex-direction: row-reverse;
    text-align:right;
    margin-bottom : 3%;

    .TopContent{
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 20px;
        margin-right : 5%
        padding-top : 5%
    }
    img{
        height: 65px;
        padding: 0 20px;
    }
`;
const Bottom = styled.div`
    width : 80%;
    height : 72%;
    display : flex;
    flex-direction: column;

    .btns{
        display : flex;
        flex-direction: row;
    }   
    h1{
        color : #0065FF;
        margin : 3%;
    }
    .box{
        align-self: center;
        width : 100%;
        height : 80%;
        background-color : white;
        margin : 50px;
    }
    .party{
        display : flex;
        justify-content: space-evenly;
        font-size : 18px;
        font-weight: bold;
    }
    .party div{
        background-color: #F9F9F9;
        width: 30%;
        height: 200px;
        display: flex;
        justify-content: space-between;
    }
`;
const GroupMake = styled(NavLink)`
    width : 150px;
    height : 50px;
    display : flex;
    justify-content: center;
    align-items: center;
    background-color : #0065FF;
    color : white;
    text-decoration : none;
    text-align : center;
    border-radius : 5px;
    
`;
const GroupJoin = styled(NavLink)`
    width : 150px;
    height : 50px;
    display : flex;
    justify-content: center;
    align-items: center;
    background-color : #0065FF;
    color : white;
    text-decoration : none;
    text-align : center;
    border-radius : 5px;
    margin-left : 50px;
`
const Character = styled.div`

    img{
        align-self: end;
        width : 30px;
        height : 30px;
    }
`