import { useDispatch } from "react-redux";
import useAuthStore from "./useAuthStore";
import { useState } from "react";
import { login, setIsLogin } from 'store/auth';
import { setCookie } from "utils/Cookie";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authStore} = useAuthStore();

    const [form, setForm] = useState({
        nickname : "",
        password : "",
    });

    const onChange = (e) => {
        // console.log(e.target.name);
        const {name, value} = e.target;
        setForm({
            ...form,
            [name] : value,
        });
    }


    const onSubmit = (e) =>{
        e.preventDefault();

        const body = {
            nickname : form.nickname,
            password : form.password,
        };

        dispatch(login(body)).then(res => {
            console.log("🟢 LOGIN SUCCESS");
            dispatch(setIsLogin(true));
            setCookie("refresh-token", res.payload.data.refresh);
            setCookie("access-token", res.payload.data.access);
            // dispatch(setAccessToken(`JWT ${res.payload.data.refresh}`));
            console.log(authStore);
            navigate("/main");
        }).catch(err => {
            console.log(err);
            console.log("🔴 LOGIN ERROR CODE : " + err.response.status);
            dispatch(setIsLogin(false));
            alert("아이디 또는 비밀번호를 올바르게 입력하세요.");
        });

    };

    return {
        form,
        onChange,
        onSubmit
    }
};

export default useLogin;