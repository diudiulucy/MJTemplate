var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoginLayer = (function (_super) {
        __extends(LoginLayer, _super);
        function LoginLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.LoginLayer";
            return _this;
        }
        LoginLayer.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        LoginLayer.prototype.setOnTouchListener = function () {
            this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginClick, this);
        };
        LoginLayer.prototype.removeOnTouchListener = function () {
            this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginClick, this);
        };
        LoginLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        LoginLayer.prototype.onLoginClick = function () {
            this._ctrl.sendDebugLoginReq(this.edit_name.text, this.edit_psw.text);
        };
        return LoginLayer;
    }(LC.Layer));
    LC.LoginLayer = LoginLayer;
    __reflect(LoginLayer.prototype, "LC.LoginLayer");
})(LC || (LC = {}));
//# sourceMappingURL=LoginLayer.js.map