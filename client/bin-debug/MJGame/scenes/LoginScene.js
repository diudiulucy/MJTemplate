var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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