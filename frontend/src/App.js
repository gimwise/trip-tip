import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Header from 'components/Header/Header';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import StartPage from 'pages/Auth/StartPage';
import MainPage from 'pages/Main/MainPage';
import ClearPage from 'pages/Group/ClearPage';
import CalculatePage from 'pages/Group/CalculatePage';
import GroupPage from 'pages/Group/GroupPage';
import InputCodePage from 'pages/Group/InputCodePage.js';
import AlertPage from 'pages/Main/AlertPage';
import NotFound from 'pages/NotFound';
import AxiosAPI from 'apis/AxiosAPI';
import MyPage from 'pages/Auth/MyPage';
import { getCookie } from 'utils/Cookie';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    try {
      let refresh = { refresh : getCookie("refresh-token")};
      // console.log(JSON.stringify(refresh));
      AxiosAPI.post("/users/signin/refresh/", JSON.stringify(refresh))
      .then(res => {
        // console.log("access-token : " + res.data.access);
        AxiosAPI.defaults.headers.common['Authorization'] = 'JWT ' + res.data.access;
        setIsLogin(true);
      })
      .catch(err => {
          console.log("App Client Request Fail : " + err);
          setIsLogin(false);
        })
        .finally(()=>{
          console.log("Login Request End");
          setLoading(true);
        });
    }catch(e){
      console.log(e);
    }
  }, []);


  if(loading ){
    return (
      <div className='App'>
        <BrowserRouter>
          <Header isLogin={isLogin}/>
          <Routes>
            <Route path="/" element={<StartPage isLogin={isLogin}/>}/>
            <Route path="main" element={<MainPage/>} />
            <Route path="signin" element={<LoginPage/>} />
            <Route path="signup" element={<RegisterPage/>} />
            <Route path="alert" element={<AlertPage/>}/>
            <Route path="mypage" element={<MyPage/>}/>
            <Route path="group" element={<GroupPage/>} />
            <Route path="calculate" element={<CalculatePage/>} />
            <Route path="code" element={<InputCodePage/>} />
            <Route path="clear" element={<ClearPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>    
      </div>
    )
  }
  else{
    return(
      <div>
        Loading...
      </div>
    )
  }

}

export default App;
