var config = {}

config.ENVIRONMENT = 'Prod';
if (process.env.C9_USER) {
    config.ENVIRONMENT = 'Dev';
}

config.PORT = process.env.PORT;
if (!process.env.PORT) {
    config.PORT = 8080;
}

module.exports = config;