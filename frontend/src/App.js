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
import Main from 'pages/Main/Main';


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
        <Route path="main" element={<Main/>} />
        <Route path="signin" element={<LoginPage/>} />
        <Route path="signup" element={<RegisterPage/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
