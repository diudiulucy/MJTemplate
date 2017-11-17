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
        //加入构造器，代码才可以跳转到此类，否则直接跳到父类
        function HallLayerController() {
            return _super.call(this) || this;
        }
        HallLayerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Send100002,
            ];
        };
        /**登录消息返回 */
        HallLayerController.prototype.on_100002_event = function (event) {
            console.log(this.TAG + " on_100002_event: ");
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("登录游戏服务器成功");
            }
            else {
            }
        };
        /**连接socket */
        HallLayerController.prototype.connectSocket = function () {
            LC.Socket.Instance.startConnect(LC.Config.SERVER_URL, this._onSocketConnect, this, this._onSocketClose);
        };
        /**socket连接成功*/
        HallLayerController.prototype._onSocketConnect = function () {
            // console.log(this.TAG + " connenct socket success");
            //游戏服务器连接成功，发送登录请求
            this._wServerLogin();
            this.timer = egret.setInterval(this._sentHeart, this, 1800000);
        };
        /**socket连接关闭*/
        HallLayerController.prototype._onSocketClose = function () {
            console.log(this.TAG + " onSocketClose");
            egret.clearInterval(this.timer);
        };
        /**发送心跳包*/
        HallLayerController.prototype._sentHeart = function () {
            console.log("发送心跳");
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100000, "");
        };
        /**发送登录游戏服务器*/
        HallLayerController.prototype._wServerLogin = function () {
            var obj = {};
            obj.passwd = LC.Config.MD5PASS;
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100002, JSON.stringify(obj));
        };
        return HallLayerController;
    }(LC.Controller));
    LC.HallLayerController = HallLayerController;
    __reflect(HallLayerController.prototype, "LC.HallLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=HallLayerController.js.map