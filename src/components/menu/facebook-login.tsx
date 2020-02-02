import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import FacebookLogin from 'react-facebook-login';

import { environment } from '@environment/environment';
import { setAuth } from '@store/auth/auth.actions';
import { setUser } from '@store/user/user.actions';

export const FacebookLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const responseFacebook = useCallback(response => {
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
  }, []);
  return (
    <FacebookLogin
      appId={environment.facebookClientId}
      icon={<TiSocialFacebookCircular />}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};
