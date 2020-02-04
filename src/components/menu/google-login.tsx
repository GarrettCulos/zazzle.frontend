import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';
import { LoginButtonInterface } from './social-login';
import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

import { LoginButton } from './login-button-styled';

const GoogleLoginButton = styled(LoginButton)`
  /* color: var(--facebook-blue); */
`;
export const GoogleLoginComponent: React.FC<LoginButtonInterface> = ({ tinyButton }: LoginButtonInterface) => {
  const dispatch = useDispatch();

  const responseGoogle = useCallback(
    response => {
      if (response) {
        dispatch(setAuth({ token: response.accessToken, provider: 'google', responseData: response }));
        dispatch(
          setUser({
            userName: response.profileObj.name,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            avatar: {
              width: 50,
              height: 50,
              url: response.profileObj.imageUrl
            }
          })
        );
      }
    },
    [dispatch]
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
