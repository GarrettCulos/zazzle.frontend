const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.(ts|tsx|js|jsx)"],
  rules: [{
    test: /\.scss$/,
    sideEffects: true,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  }],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
        }
      }
    },
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      }
    }
  ]
};