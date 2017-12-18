var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户数据
 */
var LC;
(function (LC) {
    var UserState;
    (function (UserState) {
        UserState[UserState["UNREADY"] = 1] = "UNREADY";
        UserState[UserState["READY"] = 2] = "READY";
        UserState[UserState["PLAYING"] = 3] = "PLAYING";
        UserState[UserState["ESCAPE"] = 4] = "ESCAPE";
    })(UserState = LC.UserState || (LC.UserState = {}));
    var NetState;
    (function (NetState) {
        NetState[NetState["OFFLINE"] = 0] = "OFFLINE";
        NetState[NetState["ONLINE"] = 1] = "ONLINE";
    })(NetState = LC.NetState || (LC.NetState = {}));
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