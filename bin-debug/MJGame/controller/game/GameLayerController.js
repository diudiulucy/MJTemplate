var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var GameLayerController = (function (_super) {
        __extends(GameLayerController, _super);
        function GameLayerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameLayerController.prototype.registerSocket = function () {
        };
        GameLayerController.prototype.unRegisterSocket = function () {
        };
        GameLayerController.prototype.text = function () {
            console.log("test");
            egret.setTimeout(function () {
                var js = { id: 1 };
                LC.Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100000);
            }, this, 5000);
        };
        return GameLayerController;
    }(LC.Controller));
    LC.GameLayerController = GameLayerController;
    __reflect(GameLayerController.prototype, "LC.GameLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayerController.js.map