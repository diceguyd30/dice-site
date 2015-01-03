function config(argv) {
    this.ENVIRONMENT = argv.environment

    this.PORT = process.env.PORT;
    if (!this.PORT) {
        this.PORT = 8443;
    }
    if (argv.port) {
        this.PORT = argv.port;
    }

    this.TESTTOKEN = argv.test_token;
    this.SESSION_SECRET = argv.session_secret;
}

module.exports = 
    function(argv) { 
        return new config(argv); 
    };