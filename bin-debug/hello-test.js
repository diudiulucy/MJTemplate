"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_1 = require("../hello");
var chai_1 = require("chai");
require("mocha");
describe("Hello function", function () {
    it("should return hello world", function () {
        var result = hello_1.default();
        chai_1.expect(result).to.equal("Hello World!");
    });
});
//# sourceMappingURL=hello-test.js.map