var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        function LoginScene() {
            return _super.call(this) || this;
        }
        LoginScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.loginLayer = new LC.LoginLayer();
            this.loginLayer.Ctrl = new LC.LoginLayerController();
            this.addChild(this.loginLayer);
        };
        return LoginScene;
    }(LC.Scene));
    LC.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "LC.LoginScene");
})(LC || (LC = {}));
//# sourceMappingURL=LoginScene.js.map