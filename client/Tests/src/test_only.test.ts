import { expect, assert, should } from "chai"
describe('Arrayonly', function () {
    describe('#indexof()', function () {
        // it.only('should return -1 unless present',function(){
        //       assert.equal(-1, [1, 2, 3].indexOf(5));
        // });
        it('should return -1 unless present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
        });

        // it.skip('should return the index when present', function () {
        //     assert.equal(-1, [1, 2, 3].indexOf(1));
        // });

        it('should return the index when present', function () {
            // this.skip();
            // assert.equal(-1, [1, 2, 3].indexOf(1));
        });
    })
});