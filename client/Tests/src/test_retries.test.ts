import { HttpTest } from "../../src/needTest/HttpTest"
import { expect } from "chai"
describe('retries', function () {
    this.retries(4);
    beforeEach(function () {
        // HttpTest.get('http://www.yahoo.com');
        //  browser.get('http://www.yahoo.com');
    });

    it('should succeed on the 3rd try', function () {
        this.retries(2);
        // expect($('.foo').isDisplayed()).to.eventually.be.true;
    });
})