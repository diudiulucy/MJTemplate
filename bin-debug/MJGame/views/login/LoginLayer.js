var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            _this.percentWidth = 100;
            _this.percentHeight = 100;
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
            //   LC.Tips.show("\u7528\u6237\u5728\u5176\u4ed6\u684c\u5b50\u4e2d");
            // this._ctrl.sendDebugLoginReq(this.edit_name.text, this.edit_psw.text);
            LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(1001));
        };
        return LoginLayer;
    }(LC.Layer));
    LC.LoginLayer = LoginLayer;
    __reflect(LoginLayer.prototype, "LC.LoginLayer");
})(LC || (LC = {}));
//# sourceMappingURL=LoginLayer.js.map