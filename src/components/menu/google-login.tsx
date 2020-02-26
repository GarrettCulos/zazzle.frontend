import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

import { LoginButtonInterface } from './social-login';
import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

import { LoginButton } from './login-button-styled';

const GoogleLoginButton = styled(LoginButton)`
  /* color: var(--facebook-blue); */
`;

const EXCHANGE_GOOGLE_TOKEN = gql`
  mutation exchangeGoogle($email: String!, $idToken: String!) {
    exchangeGoogle(auth: { email: $email, idToken: $idToken }) {
      token
      expiresIn
      user {
        email
        id
        userIcon
        userName
        myProjects
        favorites {
          projectId
        }
      }
    }
  }
`;

export const GoogleLoginComponent: React.FC<LoginButtonInterface> = ({ tinyButton }: LoginButtonInterface) => {
  const dispatch = useDispatch();
  const [exchangeGoogleToken] = useMutation<any, any>(EXCHANGE_GOOGLE_TOKEN);
  const responseGoogle = useCallback(
    async response => {
      try {
        if (response) {
          const data: any = await exchangeGoogleToken({
            variables: { email: response.profileObj.email, idToken: response.tokenId }
          });
          const { token, user } = data.data.exchangeGoogle;
          dispatch(setAuth({ token, provider: 'google', responseData: response }));
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, exchangeGoogleToken]
  );
  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      buttonText="Login"
      render={renderProps => (
        <GoogleLoginButton tinyButton={tinyButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
          {tinyButton ? (
            <>
              <FaGoogle />
            </>
          ) : (
            <>
              <FaGoogle />
              <span> Continue with Google</span>
            </>
          )}
        </GoogleLoginButton>
      )}
      clientId={environment.googleClientId}
    ></GoogleLogin>
  );
};
