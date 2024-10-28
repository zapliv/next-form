const path = require('path');

module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'node_modules/@ant-design/icons'),
                path.resolve(__dirname, 'node_modules/@ant-design/icons-svg'),
                path.resolve(__dirname, 'node_modules/rc-util'),
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['next/babel'],
                },
            },
        });

        return config;
    },
};
