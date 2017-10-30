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
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            return _super.call(this) || this;
        }
        LoadingScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.loadingView = new LC.LoadingLayer();
            this.addChild(this.loadingView);
        };
        return LoadingScene;
    }(LC.Scene));
    LC.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "LC.LoadingScene");
})(LC || (LC = {}));
//# sourceMappingURL=LoadingScene.js.map