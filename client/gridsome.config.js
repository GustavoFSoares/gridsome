// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/scss/app.scss"),
      ],
    });
}

module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-source-rest",
      options: {
        debug: false,
        axiosConfig: undefined,
        endpoint: "http://localhost:3000",
        typeName: "Pokemons",
        isStatic: false,
        isCollection: true,
        responseInterceptor: (responseData) => {
          console.log(responseData);

          return responseData;
        },
      },
    },
  ],
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = ["vue", "normal"];

    types.forEach((type) => {
      addStyleResource(config.module.rule("scss").oneOf(type));
    });
  },
};
