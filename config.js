function config(argv) {
    this.ENVIRONMENT = argv.Environment

    this.PORT = process.env.PORT;
    if (!this.PORT) {
        this.PORT = 8080;
    }
    if (argv.Port) {
        this.PORT = argv.Port;
    }

    this.TESTTOKEN = argv.TestToken;
    this.SESSION_SECRET = argv.SessionSecret;
}

module.exports = 
    function(argv) { 
        return new config(argv); 
    };