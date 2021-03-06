const HtmlWebpackPlugin = require("html-webpack-plugin"); // <-- NEW
const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/cube.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/test_view.html",
        }),
    ],
};