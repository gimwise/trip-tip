import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "store/auth";

const useSignup = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        nickname : "",
        username : "",
        password1 : "",
        password2 : "",
        phone : "",
        bank : "",
        account : "",
    })

    const onChange = e => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name] : value,
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(form.password1 !== form.password2){
            return alert("비밀번호와 비밀번호 확인은 같아야합니다.");
        }

        const users = {
            nickname : form.nickname,
            username : form.username,
            password : form.password1,
            bank : form.bank,
            account : form.account,
            phone : form.phone
        };
        dispatch(register(users)).then(res => {
            console.log("🟢 REGISTER USER SUCCESS");
        }).catch(err => {
            if(err.response.data.nickname[0] === 'user with this nickname already exists.'){
                console.log("🔴 NICKNAME ALREADY EXISTS");
                alert("이미 사용중인 아이디입니다.");
            }else{
                console.log("🔴 REGISTER USER FAILURE");
                alert("정확히 정보를 입력하세요.");
            }
        })

    };

    return {
        form,
        onChange,
        onSubmit
    }
};

export default useSignup;