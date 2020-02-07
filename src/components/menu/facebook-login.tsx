import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaFacebookF } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginButton } from './login-button-styled';
import { LoginButtonInterface } from './social-login';

const FacebookLoginButton = styled(LoginButton)`
  border-color: var(--facebook-blue);
  background-color: var(--facebook-blue);
  margin-bottom: 0;
`;

const EXCHANGE_FACEBOOK_TOKEN = gql`
  mutation exchangeFacebook($email: String!, $idToken: String!) {
    exchangeFacebook(auth: { email: $email, idToken: $idToken }) {
      token
      expiresIn
      user {
        emailAddress
      }
    }
  }
`;

export const FacebookLoginComponent: React.FC<LoginButtonInterface> = ({ tinyButton }: LoginButtonInterface) => {
  const dispatch = useDispatch();
  const [exchangeFacebookToken] = useMutation<any, any>(EXCHANGE_FACEBOOK_TOKEN);
  const responseFacebook = useCallback(
    async response => {
      try {
        if (response) {
          const data: any = await exchangeFacebookToken({
            variables: { email: response.email, idToken: response.accessToken }
          });
          const { token } = data.data.exchangeFacebook;
          dispatch(setAuth({ token, provider: 'facebook', responseData: response }));
          dispatch(
            setUser({
              userName: response.name,
              avatar: {
                width: response.picture.data.width,
                height: response.picture.data.height,
                url: response.picture.data.url
              }
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, exchangeFacebookToken]
  );
  return (
    <FacebookLogin
      appId={environment.facebookClientId}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => (
        <FacebookLoginButton tinyButton={tinyButton} onClick={renderProps.onClick} disabled={renderProps.isDisabled}>
          {tinyButton ? (
            <>
              <FaFacebookF />
            </>
          ) : (
            <>
              <FaFacebookF />
              <span>Continue with Facebook</span>
            </>
          )}
        </FacebookLoginButton>
      )}
    />
  );
};
