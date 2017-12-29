import { expect, assert } from "chai"
import User = require('./User')
import "mocha"

describe('User', function () {
    describe('#save()', function () {
        it('should save without error', function (done) {
            let user = new User('Lua');
            user.save(function (err) {
                if (err) throw err;
                done();
            });
        });
    });
});

