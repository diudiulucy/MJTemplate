var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户数据
 */
var LC;
(function (LC) {
    var ReadyState;
    (function (ReadyState) {
        ReadyState[ReadyState["UNREADY"] = 1] = "UNREADY";
        ReadyState[ReadyState["READY"] = 2] = "READY";
        ReadyState[ReadyState["PLAYING"] = 3] = "PLAYING";
        ReadyState[ReadyState["ESCAPE"] = 4] = "ESCAPE";
    })(ReadyState = LC.ReadyState || (LC.ReadyState = {}));
    var User = (function () {
        function User() {
            this.nick = "";
            this.isBanker = false; //是否是庄家
        }
        return User;
    }());
    LC.User = User;
    __reflect(User.prototype, "LC.User");
})(LC || (LC = {}));
//# sourceMappingURL=User.js.map