import { expect, assert, should } from "chai"
import "mocha"
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
            // [1, 2, 3].indexOf(5).should.equal(-1);
            // [1, 2, 3].indexOf(0).should.equal(-1);
        });
    })
});

describe('Array1', function () {
    describe('#indexOf()', function () {

        before(function () {
            // runs before all tests in this block
            // console.log("before");
        });

        after(function () {
            // runs after all tests in this block
            // console.log("after");
        });

        beforeEach(function () {
            // runs before each test in this block
            // console.log("beforeEach");
        });

        afterEach(function () {
            // runs after each test in this block
            // console.log("afterEach");
        });
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
            // [1, 2, 3].indexOf(5).should.equal(-1);
            // [1, 2, 3].indexOf(0).should.equal(-1);
        });
    })
});

