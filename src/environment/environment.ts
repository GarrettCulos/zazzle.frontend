export interface Environment {
  env: 'dev' | 'prod';
  googleClientId: string;
  facebookClientId: string;
  features: { [s: string]: boolean };
}
export const environment: Environment = {
  env: 'dev',
  googleClientId: '961748212630-1ejc8smms57kn77f8helruvkds9k1s8e.apps.googleusercontent.com',
  facebookClientId: '1048745462190816',
  features: {}
};
