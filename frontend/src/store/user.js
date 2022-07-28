import AxiosAPI from "apis/AxiosAPI";

const REGISTER = "USER/REGISTER";
const LOGIN = "USER/LOGIN";
const LOGOUT = "USER/LOGOUT";
const SET_ISLOGIN = "USER/SET_ISLOGIN";


export const registerUser = (req) => {

    const request = AxiosAPI.post(
        "/users/signup/",
        req
    ).then(res => res.data);

    return {
        type : REGISTER,
        payload : request
    }
}

export const loginUser = (req) => {
    const request = AxiosAPI.post(
        "/users/signin/",
    ).then(res => res.data);

    return {
        type : LOGIN,
        payload : request
    }
}

export const setIsLogin = (req) => {
    return {
        type : SET_ISLOGIN,
        boolean : req,
    }
}

const initialState = {
    isLogin : false,
    access_token : "",
    payload : "",
}

const user = (state = initialState, action) => {
    switch(action.type){
        case REGISTER :
            return {
                ...state,
                payload : action.payload
            };
        
        case LOGIN :
            return {
                ...state,
                payload : action.payload
            }
        case SET_ISLOGIN :
            return {
                ...state,
                isLogin : action.boolean,
            }
        default : 
            return state;
    }
}


export default user;
