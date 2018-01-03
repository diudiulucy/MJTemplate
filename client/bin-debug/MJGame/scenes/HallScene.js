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
    var HallScene = (function (_super) {
        __extends(HallScene, _super);
        function HallScene() {
            return _super.call(this) || this;
        }
        HallScene.prototype.init = function () {
            _super.prototype.init.call(this);
            var hallLayer = new LC.HallLayer();
            hallLayer.Ctrl = new LC.HallLayerController();
            this.addChild(hallLayer);
        };
        return HallScene;
    }(LC.Scene));
    LC.HallScene = HallScene;
    __reflect(HallScene.prototype, "LC.HallScene");
})(LC || (LC = {}));
//# sourceMappingURL=HallScene.js.map