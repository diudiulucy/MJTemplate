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