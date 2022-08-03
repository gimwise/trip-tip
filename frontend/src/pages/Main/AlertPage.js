import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import clock from 'assets/image/clock.svg'



const AlertPage = () => {
    return (
        <Container>
            <Box>
                <h2>알림</h2>
                <div className='bottom'>
                    <div className='box'>
                        <div className='settle'>
                            <img src={clock} alt="clock" />
                            <h4>정산 요청</h4>
                            <p className='time'>시간</p>
                        </div>
                        <p className='request'>~님께서 ~원 정산을 요청하였습니다.</p>
                    </div>
                    <div className='box end'>
                        <div className='settle'>
                            <img src={clock} alt="clock" />
                            <h4>정산 요청</h4>
                            <p className='time'>시간</p>
                        </div>
                        <p className='request'>~님께서 ~원 정산을 요청하였습니다.</p>
                    </div>
                    <div className='box end'>
                    <div className='settle'>
                            <img src={clock} alt="clock" />
                            <h4>정산 요청</h4>
                            <p className='time'>시간</p>
                        </div>
                        <p className='request'>~님께서 ~원 정산을 요청하였습니다.</p>
                    </div>
                    <Check to="/main">
                        확인
                    </Check>
                </div>
            </Box>
        </Container>
    );
};

export default AlertPage;

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
    justify-content: space-between;
    background-color : white;
    border-radius : 10px;
    width : 30vw;
    height : 70vh;
    padding : 50px 60px;
    box-shadow: 0px 2px 3px 1px #C8DCF3;

    h2{
        margin-bottom : 5vw;
    }

    .bottom{
        display : flex;
        flex-direction: column;
        height : 65vh;
        justify-content: space-between;

            .box{
                display: flex;
                flex-direction: column;
                background-color : #EDF4FF;
                border-radius : 10px;
                padding-left: 20px;
                padding-right: 10px;
                box-shadow: 0px 2px 3px 1px #B5D2FF;

                .settle{
                    display: flex;
                    align-items: flex-end;
                    
                    img{
                        width : 20px;
                        padding-left:10px;
                    }
                    p{
                        padding-left : 10px;
                        margin-block-end: 0px;
                    }
                    h4{
                        padding-left : 5px;
                        margin-block-end: 0px;
                    }
                    .time{
                        font-size:10px;
                    }
                }
                .request{
                    align-self: flex-end;
                }
            }
            .end{
                background-color : #F9F9F9;
                box-shadow: 0px 2px 3px 1px #E8E8E8;
            }
        }
`
const Check = styled(NavLink)`
    width : 150px;
    height : 50px;
    display : flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    background-color : #white;
    color : #0065FF;
    border: 1px solid #0065FF;
    text-decoration : none;
    border-radius : 5px;
    margin-top :80px;
`
