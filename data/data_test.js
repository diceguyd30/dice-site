//Unit tests for the data module

exports.testStringLength = function(beforeExit, assert) {
    assert.equal(6, 'foobar'.length);
};

exports.testBasicAssert = function(beforeExit, assert) {
    assert.equal(true, true);
};