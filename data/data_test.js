//Unit tests for the data module

exports["testSomething"] = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports["testSomethingElse"] = function(test){
    test.ok(3 == 3, "this assertion should also pass");
    test.done();
};