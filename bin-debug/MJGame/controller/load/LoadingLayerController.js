var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 加载层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoadingLayerController = (function (_super) {
        __extends(LoadingLayerController, _super);
        function LoadingLayerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingLayerController.prototype.registerSocket = function () {
            LC.EventManager.getInstance().register(LC.SocketEvents.Rev100000.toString(), this.on100000_event, this);
        };
        LoadingLayerController.prototype.unRegisterSocket = function () {
            LC.EventManager.getInstance().unRegister(LC.SocketEvents.Rev100000.toString(), this.on100000_event, this);
        };
        LoadingLayerController.prototype.text = function () {
            console.log("test");
            var js = { id: 1 };
            LC.Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100000);
        };
        LoadingLayerController.prototype.on100000_event = function (event) {
            console.log(this.TAG + " on100000_event: " + event.data);
        };
        return LoadingLayerController;
    }(LC.Controller));
    LC.LoadingLayerController = LoadingLayerController;
    __reflect(LoadingLayerController.prototype, "LC.LoadingLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=LoadingLayerController.js.map