// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

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

          return responseData
        },
      },
    },
  ],
};
