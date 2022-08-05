import React from 'react';
import SignupForm from 'components/Auth/SignupForm';
import { SignUpContainer } from 'styles/PageStyle';
import signupImg from 'assets/image/signup-page-img.png';

const RegisterPage = () => {
    return (
        <SignUpContainer>
            <SignupForm />
            <img src={signupImg} alt=''/>
        </SignUpContainer>
    );
};

export default RegisterPage;