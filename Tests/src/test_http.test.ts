import  from "../../client/src/needTest/MJ";
import { expect } from "chai";
import "mocha";

describe("SendLoginRequeset", () => {
    it("should return hello world", () => {
      let ctrl = new A();
      let name = "123";
      let psw = "112233";
    //   ctrl.sendDebugLoginReq(name,psw);
      expect(psw).to.equal("123");
    });
  });