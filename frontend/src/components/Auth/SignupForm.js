import React, {useState, useEffect} from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import styled from 'styled-components';
import signupImg from 'assets/image/signup-page-img.png';

const BANK = [
    "하나",
    "국민",
    "카카오뱅크",
    "대구",
    "신한"
];

const SignupForm = () => {

    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [bank, setBank] = useState("");
    const [account, setAccount] = useState("");
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            window.location.replace("http://localhost:3000/");    
        }else{
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        if(password1 !== password2){
            return alert("비밀번호와 비밀번호 확인은 같아야합니다.");
        }

        const users = {
            nickname : nickname,
            username : username,
            password : password1,
        };

        console.log(users);

        AxiosAPI.post(
            '/users/signup/',
            {
                nickname : nickname,
                username : username,
                password : password1
            }
        ).then((res)=>{
            console.log(res);
            window.location.replace("http://localhost:3000/signin");
        }).catch((error)=> {
            console.log(error);
            if(error.response.data.nickname[0] === 'user with this nickname already exists.'){
                alert("이미 사용중인 아이디입니다.");
            }else{
                alert("정확히 정보를 입력하세요.");
            }
        });
    };

    return (
        <Container className='signup-content'>
            <LeftContent>
                {loading === false && <h1>회원가입</h1>}
                <form onSubmit={onSubmit}>
                    {/* 이름 */}
                    <input
                        name = 'username'
                        value = {username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='이름'
                        required
                    />
                    <br/>
                    {/* 아이디 */}
                    <input
                        name = 'nickname'
                        value = {nickname}
                        onChange = {e => setNickname(e.target.value)}
                        placeholder='아이디'
                        required
                    />
                    <br/>
                    {/* 비밀번호 */}
                    <input
                        name = 'password1'
                        value = {password1}
                        onChange={e => setPassword1(e.target.value)}
                        placeholder='비밀번호'
                        required
                    />
                    <br/>
                    {/* 비밀번호 확인 */}
                    <input
                        name = 'password2'
                        value = {password2}
                        onChange={e => setPassword2(e.target.value)}
                        placeholder='비밀번호 확인'
                        required
                    />
                    <br/>
                    {/* 휴대폰 번호 */}
                    <input
                        name = 'phone'
                        value = {phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder='휴대폰 번호'
                        required
                    />
                    <br/>
                    {/* 은행 */}
                    <select
                        className='select'
                        name='select-bank'
                        onChange = {e => setBank(e.target.value)}
                        placeholder='은행'
                        required
                        defaultValue="은행"
                    >
                        <option value = "은행" disabled>은행</option>
                        {BANK.map((e, i) => (<option key={i} value={e}>{e}</option>))}
                    </select>
                    <br/>
                    {/* 계좌 */}
                    <input
                        name = 'account'
                        value = {account}
                        onChange={e => setAccount(e.target.value)}
                        placeholder='계좌'
                        required
                    />
                    <br/>
                    <input type='submit' value="회원가입"/>
                </form>
            </LeftContent>
            <RightContent>
                <img src={signupImg} alt=''/>
            </RightContent>


        </Container>
    );
};

export default SignupForm;

const Container = styled.div`
    width : 100%;
    height : 90%;
    display : flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const LeftContent = styled.div`
    display : flex;
    flex-direction: column;
    justify-content : center;
    align-items: center;
    margin-right : 100px;

    h1{
        font-size : 22px;
    }
    form{
        display:flex;
        flex-direction: column;
        justify-content : center;
        align-items : center;
    }
    input{
        border : 1px solid #C7C7C7;
        border-radius : 25px;
        width : 350px;
        padding : 15px;
        margin : 10px 0;
    }
    input[type="submit"]{
        cursor : pointer;
        background-color : #0065FF;
        color : white;
        width : 200px;
        border : 0px;
        border-radius : 10px;
    }
    select{ 
        position : relative;
        margin : 10px 0;
        border-radius : 25px;
        padding: 15px;
        color : white;
        border: 0;
        border-right: 16px solid transparent;
        background-color : #84A6FF;
        left : -128px;
    }

    
`;

const RightContent = styled.div`
    img{
        width : 566px;
    }
`;

