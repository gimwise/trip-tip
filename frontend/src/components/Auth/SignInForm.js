import React from 'react';
import useLogin from 'hooks/useLogin';
import AuthFormContainer from 'styles/AuthForm';

const SignInForm = () => {
    const { form, onChange, onSubmit } = useLogin();
    const { nickname, password } = form;

    console.log(nickname);

    return (
        <AuthFormContainer className='signin-content'>
            <form onSubmit={onSubmit}>
                <h1>로그인</h1>
                {/* 아이디 */}
                <input
                    name = 'nickname'
                    value = {nickname}
                    onChange={onChange}
                    placeholder='아이디'
                    required
                />
                <br/>
                {/* 비밀번호 */}
                <input
                    name = 'password'
                    value = {password}
                    onChange={onChange}
                    placeholder='비밀번호'
                    required
                />
                <br/>
                <input type='submit' value="로그인" />
            </form>
        </AuthFormContainer>
    );
};

export default SignInForm;



