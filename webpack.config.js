const path = require('path');

module.exports = {
entry: './src/index.ts',
module: {
    rules: [
    {
        test: /\.css?$/,
        use: 'css-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    ],
},
resolve: {
    extensions: ['.tsx', '.ts', '.js'],
},
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
},
experiments: { topLevelAwait: true },
};