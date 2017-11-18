module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  target: "node",
  output: {
    path: __dirname + "/browser",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}