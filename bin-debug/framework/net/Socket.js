var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Socket协议类
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Socket = (function (_super) {
        __extends(Socket, _super);
        function Socket() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._connectInterval = 4500;
            _this._headSize = 12;
            return _this;
        }
        Object.defineProperty(Socket, "Instance", {
            //为方便代码提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建socket
         */
        Socket.prototype._initWebSocket = function () {
            //创建 WebSocket 对象
            this._socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this._socket.type = egret.WebSocket.TYPE_BINARY;
            //添加链接打开侦听，连接成功会调用此方法
            this._socket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
            //添加收到数据侦听，收到数据会调用此方法
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this._socket.addEventListener(egret.Event.CLOSE, this._onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
        };
        /**
         * 开始根据提供的url连接socket
         * @param url  全地址。如ws://echo.websocket.org:80
         */
        Socket.prototype.startConnect = function (url) {
            egret.log("start connect " + url);
            this._initWebSocket();
            this._socket.connectByUrl(url);
            this._timerId = egret.setTimeout(this.timeOutHandler, this, this._connectInterval);
        };
        /**
         * 关闭socket
         *
         */
        Socket.prototype.closeSocket = function () {
            egret.clearTimeout(this._timerId);
            this._socket.removeEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this._onSocketClose, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
            this._socket.connected && this._socket.close();
        };
        /**
         * 发送数据
         * @param data 	      待发送json数据
         * @param mainID      主ID
         * @param AssistantID 辅ID
         */
        Socket.prototype.sendData = function (data, mainID, AssistantID) {
            if (this._socket && this._socket.connected) {
                console.log("Send: mainID = " + mainID + " data = " + data);
                //创建 ByteArray 对象
                var byte = this._EnvelopedMessage(data, mainID, AssistantID);
                byte.endian = egret.Endian.LITTLE_ENDIAN;
                byte.position = 0;
                //发送数据
                this._socket.writeBytes(byte, 0, byte.length);
            }
            else {
                egret.log("socket is not connected");
            }
        };
        /**是否已连接*/
        Socket.prototype.isConnected = function () {
            if (this._socket && this._socket.connected) {
                return true;
            }
            return false;
        };
        Socket.prototype.timeOutHandler = function () {
            if (!this._socket.connected) {
                egret.log("connect time out!");
                this.closeSocket();
            }
        };
        /**
         * 连接成功回调
         */
        Socket.prototype._onSocketOpen = function (event) {
            egret.log("connect successed");
        };
        /**
         * 关闭连接回调
         *
         */
        Socket.prototype._onSocketClose = function (event) {
            egret.log("onSocketClose");
        };
        /**
         * 连接错误回调
         *
         */
        Socket.prototype._onSocketError = function (event) {
            egret.log("_onSocketError");
        };
        /**
         * 接收数据回调
         * @param e 事件
         */
        Socket.prototype._onReceiveMessage = function (event) {
            //创建 ByteArray 对象
            var byte = new egret.ByteArray();
            //读取数据
            this._socket.readBytes(byte);
            this._parseMessage(byte);
        };
        /**
         * 解析数据
         * @param byte 待解析的数据
         */
        Socket.prototype._parseMessage = function (byte) {
            byte.endian = egret.Endian.LITTLE_ENDIAN;
            var len = byte.readInt();
            var mainID = byte.readInt();
            var AssistantID = byte.readInt();
            var data = byte.readUTFBytes(len - this._headSize);
            console.log("Receive: mainID = " + mainID + " data = " + data);
            LC.EventManager.getInstance().dispatchEventWith(mainID.toString(), false, data);
        };
        /**
         * 封装数据
         * @param byte 待封装的数据
         */
        Socket.prototype._EnvelopedMessage = function (data, mainID, AssistantID) {
            if (AssistantID === void 0) { AssistantID = 0; }
            var body = new egret.ByteArray();
            body.endian = egret.Endian.LITTLE_ENDIAN;
            //写入数据
            body.writeUTFBytes(data);
            var byte = new egret.ByteArray();
            byte.endian = egret.Endian.LITTLE_ENDIAN;
            var len = this._headSize + body.length;
            byte.writeInt(len);
            //写入主命令
            byte.writeInt(mainID);
            //写入辅命令
            byte.writeInt(AssistantID);
            byte.writeBytes(body, 0, len);
            return byte;
        };
        return Socket;
    }(LC.Single));
    LC.Socket = Socket;
    __reflect(Socket.prototype, "LC.Socket");
})(LC || (LC = {}));
//# sourceMappingURL=Socket.js.map