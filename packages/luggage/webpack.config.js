module.exports = {
  mode: 'production',
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/browser',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
