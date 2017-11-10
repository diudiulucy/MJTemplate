var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var LC;
(function (LC) {
    /**性别类型*/
    var SEX_TYPE;
    (function (SEX_TYPE) {
        SEX_TYPE[SEX_TYPE["boy"] = 1] = "boy";
        SEX_TYPE[SEX_TYPE["girl"] = 2] = "girl";
        SEX_TYPE[SEX_TYPE["unknow"] = 3] = "unknow";
    })(SEX_TYPE || (SEX_TYPE = {}));
    var User = (function () {
        function User() {
        }
        return User;
    }());
    LC.User = User;
    __reflect(User.prototype, "LC.User");
})(LC || (LC = {}));
//# sourceMappingURL=User.js.map