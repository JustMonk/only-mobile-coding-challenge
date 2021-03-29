const path = require("path");

module.exports = {
  entry: [
     "./src/app.jsx",
     "./public/index.html",
     "./public/style.css"
   ],
  mode: "development",
  output: {
    filename: "./main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["file-loader?name=[name].[ext]"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
         test: /\.html$/, 
         use: ["file-loader?name=[name].[ext]"]
       },
    ]
  },
};