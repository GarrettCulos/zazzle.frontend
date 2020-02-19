export interface Environment {
  env: 'dev' | 'prod';
  googleClientId: string;
  facebookClientId: string;
  graphqlEndpoint: string;
  features: { [s: string]: boolean };
}
export const environment: Environment = {
  env: 'dev',
  graphqlEndpoint: 'http://localhost:8080/graphql',
  googleClientId: '961748212630-1ejc8smms57kn77f8helruvkds9k1s8e.apps.googleusercontent.com',
  facebookClientId: '1048745462190816',
  features: {
    favorites: true,
    myProjects: true
  }
};
