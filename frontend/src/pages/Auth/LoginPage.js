import React from 'react';
import SignInForm from 'components/Auth/SignInForm';
import { SignInContainer } from 'styles/PageStyle';

const LoginPage = () => {
    return (
        <SignInContainer>
            <SignInForm/>
        </SignInContainer>
        
    );
};

export default LoginPage;