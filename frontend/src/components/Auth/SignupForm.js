import React, {useState, useEffect} from 'react';
import AuthFormContainer from 'styles/AuthForm';
import { useDispatch } from 'react-redux';
import { register } from 'store/auth';
import useSignup from 'hooks/useSignup';

const BANK = [
    "하나",
    "국민",
    "카카오뱅크",
    "대구",
    "신한"
];

const SignupForm = () => {
    const {form, onChange, onSubmit} = useSignup();
    const {nickname, username, password1, password2, phone, bank, account} = form;

    return (
        <AuthFormContainer className='signup-content'>
                <form onSubmit={onSubmit}>
                    <h1>회원가입</h1>
                    {/* 이름 */}
                    <input
                        name = 'username'
                        value = {username}
                        onChange={onChange}
                        placeholder='이름'
                        required
                    />
                    <br/>
                    {/* 아이디 */}
                    <input
                        name = 'nickname'
                        value = {nickname}
                        onChange = {onChange}
                        placeholder='아이디'
                        required
                    />
                    <br/>
                    {/* 비밀번호 */}
                    <input
                        name = 'password1'
                        value = {password1}
                        onChange={onChange}
                        placeholder='비밀번호'
                        required
                    />
                    <br/>
                    {/* 비밀번호 확인 */}
                    <input
                        name = 'password2'
                        value = {password2}
                        onChange={onChange}
                        placeholder='비밀번호 확인'
                        required
                    />
                    <br/>
                    {/* 휴대폰 번호 */}
                    <input
                        name = 'phone'
                        value = {phone}
                        onChange={onChange}
                        placeholder='휴대폰 번호'
                        required
                    />
                    <br/>
                    {/* 은행 */}
                    <select
                        className='select'
                        name='bank'
                        onChange = {onChange}
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
                        onChange={onChange}
                        placeholder='계좌'
                        required
                    />
                    <br/>
                    <input type='submit' value="회원가입"/>
                </form>
        </AuthFormContainer>
    );
};

export default SignupForm;

// const Container = styled.div`
//     width : 100%;
//     height : 90%;
//     display : flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
// `;

// const LeftContent = styled.div`
//     display : flex;
//     flex-direction: column;
//     justify-content : center;
//     align-items: center;
//     margin-right : 100px;

//     h1{
//         font-size : 22px;
//     }
//     form{
//         display:flex;
//         flex-direction: column;
//         justify-content : center;
//         align-items : center;
//     }
//     input{
//         border : 1px solid #C7C7C7;
//         border-radius : 25px;
//         width : 350px;
//         padding : 15px;
//         margin : 10px 0;
//     }
//     input[type="submit"]{
//         cursor : pointer;
//         background-color : #0065FF;
//         color : white;
//         width : 200px;
//         border : 0px;
//         border-radius : 10px;
//     }
//     select{ 
//         position : relative;
//         margin : 10px 0;
//         border-radius : 25px;
//         padding: 15px;
//         color : white;
//         border: 0;
//         border-right: 16px solid transparent;
//         background-color : #84A6FF;
//         left : -128px;
//     }

    
// `;

// const RightContent = styled.div`
//     img{
//         width : 566px;
//     }
// `;

