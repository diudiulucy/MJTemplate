import  "../../client/src/MJGame/controller/login/LoginLayerController";
import { expect } from "chai";
import "mocha";

describe("SendLoginRequeset", () => {
    it("should return hello world", () => {
      let ctrl = new LC.LoginLayerController();
      let name = "123";
      let psw = "112233";
      ctrl.sendDebugLoginReq(name,psw);
      expect(psw).to.equal("Hello World!");
    });
  });