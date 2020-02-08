const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    let configPath = resolve('src/environment/environment');
    console.log(process.env.REACT_APP_CONFIG_ENV);
    if (process.env.REACT_APP_CONFIG_ENV === 'production') {
      configPath = resolve('src/environment/environment.prod');
    }
    // ...add your webpack config
    config.resolve.alias = Object.assign(config.resolve.alias, {
      '@store': resolve('src/store'),
      '@services': resolve('src/services'),
      '@environment/environment': configPath,
      '@hooks': resolve('src/hooks'),
      '@gql': resolve('src/apollo'),
      '@appTypes': resolve('src/types')
    });
    return config;
  }
};
