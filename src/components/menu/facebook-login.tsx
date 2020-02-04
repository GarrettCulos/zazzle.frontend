import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaFacebookF } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

import { LoginButton } from './login-button-styled';
import { LoginButtonInterface } from './social-login';

const FacebookLoginButton = styled(LoginButton)`
  border-color: var(--facebook-blue);
  background-color: var(--facebook-blue);
  margin-bottom: 0;
`;

export const FacebookLoginComponent: React.FC<LoginButtonInterface> = ({ tinyButton }: LoginButtonInterface) => {
  const dispatch = useDispatch();
  const responseFacebook = useCallback(
    response => {
      if (response) {
        dispatch(setAuth({ token: response.accessToken, provider: 'facebook', responseData: response }));
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
    },
    [dispatch]
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
