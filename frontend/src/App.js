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
import NotFound from 'pages/NotFound';


function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token') === null){
      console.log("isLogin :: ", isLogin);
    }else{
      setIsLogin(true);
      console.log("isLogin :: ", isLogin);
    }
  }, [isLogin]);

  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path="/" element={<StartPage/>}/>
        <Route path="main" element={<MainPage/>} />
        <Route path="signin" element={<LoginPage/>} />
        <Route path="signup" element={<RegisterPage/>} />
        <Route path="group" element={<GroupPage/>} />
        <Route path="calculate" element={<CalculatePage/>} />
        <Route path="code" element={<InputCodePage/>} />
        <Route path="clear" element={<ClearPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
