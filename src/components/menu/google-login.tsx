import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

export const GoogleLoginComponent: React.FC = () => {
  const dispatch = useDispatch();

  const responseGoogle = useCallback(response => {
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
  }, []);
  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      buttonText="Login"
      clientId={environment.googleClientId}
    ></GoogleLogin>
  );
};
