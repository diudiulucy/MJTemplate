// import  from "../../src/needTest/MJ";
// import validator from "../../src/needTest/ZipCodeValidator";
import validator = require("../../client/src/needTest/ZipCodeValidator");
import * as H  from "../../client/src/needTest/A";
import { expect } from "chai";
import "mocha";

describe("SendLoginRequeset", () => {
    it("should return hello world", () => {
    //   let ctrl = new H.A();
    //   let myValidator = new validator();
    //   let name = "123";
      let psw = "112233";
    //   ctrl.sendDebugLoginReq(name,psw);
      expect(psw).to.equal("112233");
    });
  });