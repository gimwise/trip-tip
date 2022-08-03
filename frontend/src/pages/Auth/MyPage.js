import React from 'react';
import { NavLink } from 'react-router-dom';
import AxiosAPI from 'apis/AxiosAPI';
import LogoutButton from 'components/Auth/LogoutButton';
import styled from 'styled-components';
import girl1 from 'assets/image/girl1.png'

const MyPage = () => {
    return (
        <Container>
            <Box>
                <h2>내 정보</h2>
                <h3>프로필</h3>
                <div className='profile'>
                    <div>
                        <img src={girl1} alt="girl" />
                    </div>
                    <div className='right'>
                        <div className='name'>이름</div>
                        <div className='accountNumber'>
                            <div className='account'>계좌 :  </div>
                            <div className='number'>1234567-123</div>
                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='unSettled'>
                        <h3>미정산 내역</h3>
                        <div className='box'>
                            <div>그룹명</div>
                            <div className='settle'>~정산 요청</div>
                        </div>
                    </div>
                    <div className='settled'>
                        <h3>정산 내역 ></h3>
                        <div className='box'>
                            <div>그룹명</div>
                            <div className='settle'>~정산 완료</div>
                        </div>
                        <div className='box'>
                            <div>그룹명</div>
                            <div className='settle'>~정산 완료</div>
                        </div>
                    </div>
                    <Logout>
                        <LogoutButton />
                    </Logout>
                </div>
            </Box>
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
    position : relative;
    width : 100%;
    height : 90%;
    display : flex;
    flex-direction: column;
    align-items: center;
`
const Box = styled.div`
    display : flex;
    flex-direction: column;
    background-color : white;
    border-radius : 10px;
    width : 30vw;
    height : 70vh;
    padding : 30px 40px;
    box-shadow: 0px 2px 3px 1px #C8DCF3;

    h2{
        padding-bottom : 20px;
        border-bottom: 1px solid #B5D2FF;
    }
    .profile{
        display:flex;
        align-items: center;
        padding-bottom : 20px;
        padding-left : 7vw;
        
        .accountNumber{
            display: flex;
        }
        .account{
            color : #747474
        }
        .number{
            color : #0065FF
        }
        img{
            width : 50px;
            padding-right : 10px;
        }
    }

    .bottom{
        display : flex;
        flex-direction: column;
        height : 40vh;
        justify-content: space-between;

        .unSettled{
            display:flex;
            flex-direction: column;

            .box{
                background-color : #EDF4FF;
                border-radius : 10px;
                padding-left: 20px;
                padding-right: 10px;
            }
            .settle{
                color: #6A6A6A
            }
        }

        .settled{
            border-top: 0.5px solid #B5D2FF;
            display:flex;
            flex-direction: column;

            .box{
                background-color : #F9F9F9;
                color:#747474;
                border-radius : 10px;
                padding-left: 20px;
                padding-right: 10px;
            }
            .settle{
                color:#A0A0A0;
            }
        }

        .box{
            width : 21vw;
            height : 2vw;
            display:flex;
            align-self: flex-end;
            justify-content: space-between;
            align-items: center;
            margin : 5px 20px 20px 7vw
        }
    }
`
const Logout = styled.div`
    width : 150px;
    height : 50px;
    display : flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    background-color : #0065FF;
    text-decoration : none;
    border-radius : 5px;
    margin-right : 20px;
    color : white;
`
