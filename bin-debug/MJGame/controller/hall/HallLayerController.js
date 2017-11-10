var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var HallLayerController = (function (_super) {
        __extends(HallLayerController, _super);
        function HallLayerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HallLayerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Send100002,
            ];
        };
        /**登录消息返回 */
        HallLayerController.prototype.on_100002_event = function (event) {
            var data = event.data;
            console.log(this.TAG + " on_100002_event: " + event.data);
            var obj = JSON.parse(data);
            if (data.code = 200) {
                console.log("登录成功,是否断线重连:" + obj.info.reconnect);
            }
        };
        /**连接socket */
        HallLayerController.prototype.connectSocket = function () {
            LC.Socket.Instance.startConnect(LC.Config.SERVER_URL, this.onSocketConnect, this);
        };
        /**socket连接成功*/
        HallLayerController.prototype.onSocketConnect = function () {
            console.log(this.TAG + " connenct socket success");
            //游戏服务器连接成功，发送登录请求
            this._wServerLogin();
        };
        /**发送登录游戏服务器*/
        HallLayerController.prototype._wServerLogin = function () {
            var obj = {};
            obj.pass = LC.Config.MD5PASS;
            obj.userid = 9123;
            LC.Socket.Instance.sendData(JSON.stringify(obj), LC.SocketEvents.Send100002);
        };
        return HallLayerController;
    }(LC.Controller));
    LC.HallLayerController = HallLayerController;
    __reflect(HallLayerController.prototype, "LC.HallLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=HallLayerController.js.map