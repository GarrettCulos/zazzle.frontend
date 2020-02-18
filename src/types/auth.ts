export interface AuthData {
  token: string;
  provider?: 'google' | 'facebook';
  responseData?: any;
}
