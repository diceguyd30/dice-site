function config(argv) {
    this.ENVIRONMENT = 'Prod';
    if (process.env.C9_USER) {
        this.ENVIRONMENT = 'Dev';
    }

    this.PORT = process.env.PORT;
    if (!this.PORT) {
        this.PORT = 8080;
    }
    if (argv.port) {
        this.PORT = argv.Port;
    }

    this.TESTTOKEN = argv.TestToken;
    this.SESSION_SECRET = argv.SessionSecret;
}

module.exports = 
    function(argv) { 
        return new config(argv); 
    };