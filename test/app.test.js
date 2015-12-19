var assert = require("chai").assert;
var expect = chai.expect;

describe('Code blocks', function () {

describe('test describe', function() {
  it('test it', function() {
    // expect(true).to.be(true);
    assert.deepEqual(true, true);
  });
   it('test it2', function() {
    // expect(true).to.be(true);
    expect('foo').to.be.a('string')
  });
});
    // var Person;
    // beforeEach(module('Joy'));
    // beforeEach(inject(function (_Person_) {
    //     Person = _Person_;
    // }));

    // describe('Constructor', function () {
    //     it('assigns a name', function () {
    //         expect(new Person('Ben')).to.have.property('name', 'Ben');
    //     });
    // });

});