export interface AuthData {
  provider: 'google' | 'facebook';
  token: string;
  responseData?: any;
}
