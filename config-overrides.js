const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: false, // or require.resolve('net') if needed
        tls: false, // or require.resolve('tls') if needed
        fs: false,
        url: require.resolve('url'),
        path: require.resolve('path-browserify'),
        timers: require.resolve('timers-browserify'),
        querystring: require.resolve('querystring-es3'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}