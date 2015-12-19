describe('Code blocks', function () {

    describe('sorting the list of users', function() {
      it('sorts in descending order by default', function() {
        var users = ['jack', 'igor', 'jeff'];
        var sorted = sortUsers(users);
        expect(sorted).toEqual(['jeff', 'jack', 'igor']);
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