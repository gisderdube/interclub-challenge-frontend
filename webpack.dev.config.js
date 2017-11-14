const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                'react-hot-loader/webpack',
                'babel-loader'
            ]
        },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']

                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!less-loader']

                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        port: 3000
    }

};
if (process.env.NODE_ENV === 'production') {
    config.devtool = "cheap-module-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1,
            moveToParents: true

        })
    )

} else {
    config.devtool = "cheap-module-eval-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({ disable: true }),
        new webpack.NamedModulesPlugin()
    )
}

module.exports = config;