module.exports = {
  watch: true,
  entry: {
    index: __dirname + '\\src\\assets\\scripts\\_index.js'
  },
  output: {
    path: __dirname + '\\src\\assets\\scripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
}