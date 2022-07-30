import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import StartPage from 'pages/Auth/StartPage';
import MainPage from 'pages/Main/MainPage';
import ClearPage from 'pages/Group/ClearPage';
import CalculatePage from 'pages/Group/CalculatePage';
import CreateGroupPage from 'pages/Group/CreateGroupPage';
import InputCodePage from 'pages/Group/InputCodePage.js';
import AlertPage from 'pages/Main/AlertPage';
import NotFound from 'pages/NotFound';
import MyPage from 'pages/Auth/MyPage';
import GroupListPage from 'pages/Group/GroupListPage';
import GroupInfoPage from 'pages/Group/GroupInfoPage';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from 'store/auth';
import { getCookie, removeCookie, setCookie } from 'utils/Cookie';
import { useCookies } from 'react-cookie';

function App() {

  const dispatch = useDispatch();
  const authStore = useSelector(store => store.auth);
  // console.log(store);

  useEffect(() => {
    
    const refresh_token = {
      refresh : `${getCookie('refresh-token')}`
    };

    const access_token = {
      Authorization : `JWT ${getCookie('access-token')}`
    }
    console.log(refresh_token);
    console.log(access_token);

    dispatch(refreshToken(refresh_token)).then(res => {
      setCookie("access-token", res.payload.data.access);
      console.log("🍪 HAVE COOKIE, REFRESH ACCESS-TOKEN");
    }).catch(err => {
      console.log(err);
      if(err.response.status === 401){
        console.log("🍪 NO COOKIE or TOKEN IS NOT VALID");
        removeCookie("access-token");
        // removeCookie("refresh-token");
      }
    });

  }, []);
  


  return (
    <div className='App'>
      <BrowserRouter>
        
        <Header />
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="main" element={<MainPage/>} />

          <Route path="/signin" element={<LoginPage/>} />
          <Route path="/signup" element={<RegisterPage/>} />
          <Route path="/alert" element={<AlertPage/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/group/:group_id" element={<GroupInfoPage/>}/>
          <Route path="/group/list" element={<GroupListPage/>}/>
          <Route path="/group/new" element={<CreateGroupPage/>} />
          <Route path="/calculate" element={<CalculatePage/>} />
          <Route path="/group/code" element={<InputCodePage/>} />
          <Route path="/clear" element={<ClearPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>    
    </div>
  )

}

export default App;
