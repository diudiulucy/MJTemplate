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
 * 游戏场景
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            return _super.call(this) || this;
        }
        GameScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.gameLayer = new LC.GameLayer();
            this.gameLayer.Ctrl = new LC.GameLayerController();
            this.addChild(this.gameLayer);
            // Tips.show(ErrorCodeManager.Instance.getErrorCode(902));
        };
        return GameScene;
    }(LC.Scene));
    LC.GameScene = GameScene;
    __reflect(GameScene.prototype, "LC.GameScene");
})(LC || (LC = {}));
//# sourceMappingURL=GameScene.js.map