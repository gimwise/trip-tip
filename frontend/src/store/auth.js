import { request } from "apis/request";
import { getCookie } from "utils/Cookie";
import produce from "immer";
import { useDispatch, useSelector } from "react-redux";

const REFRESH_TOKEN = "REFRESH_TOKEN";
const REGISTER = "AUTH/REGISTER";
const LOGIN = "AUTH/LOGIN";
const LOGOUT = "AUTH/LOGOUT";
const SET_ACCESSTOKEN = "SET_ACCEESSTOKEN";
const SET_REFRESHTOKEN = "SET_REFRESHTOKEN";
const SET_ISLOGIN = "SET_ISLOGIN";

const USERS_URL = "/users";

// REFRESH TOKEN
export const refreshToken = (refresh) => {
    // console.log(refresh);
    const data = request("post", USERS_URL + "/signin/refresh/", refresh);

    return {
        type : REFRESH_TOKEN,
        payload : data
    }
};

// REGISTER
export const register = (req) => {
    const data = request("post", USERS_URL + "/signup/", req);

    return {
        type : REGISTER,
        payload : data,
    }
};

// LOGIN
export const login = (req) => {
    const data = request("post", USERS_URL + "/signin/", req);

    return {
        type : LOGIN,
        payload : data,
    }
}

// LOGOUT
export const logout = (req) => {
    const author = {
        Authorization : `JWT ${getCookie('access-token')}`
    }
    const data = request("post", USERS_URL + "/signout/", req,author);

    return {
        type : LOGOUT,
        payload : data,
    }
}

// SET ACCESS-TOKEN
export const setAccessToken = (token) => {
    return {
        type : SET_ACCESSTOKEN,
        payload : token,
    }
}

// SET REFRESH-TOKEN
export const setRefreshToken = (token) => {
    return {
        type : SET_REFRESHTOKEN,
        payload : token,
    }
}

// SET ISLOGIN
export const setIsLogin = (bool) => {
    return {
        type : SET_ISLOGIN,
        payload : bool
    }
}

const initialState = {
    isLogin : false,
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case REGISTER :
            return produce(state, (draft)=>{
                
            })
        case LOGIN : 
            return {
                ...state,
            }
        case LOGOUT :
            return produce(state, (draft)=>{
                draft.isLogin = false;
            })
        case REFRESH_TOKEN :
            return produce(state, (draft)=>{
                
            })
        case SET_ISLOGIN :
            return produce(state, (draft)=>{
                draft.isLogin = action.payload;
            })
        default :
            return state;
    }
}

export default auth;