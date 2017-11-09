var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制器（处理和后端的交互和纯游戏逻辑，不做UI处理，用派发器通知相应的界面来更新）
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Controller = (function () {
        function Controller() {
            this.TAG = "";
            this.SocketEventList = null; //对此数组赋值，可以快速绑定 不需要重复操作，注意对每个id添加对应的函数
            this.TAG = egret.getQualifiedClassName(this);
            this.init();
            this._registerManySockets(true);
        }
        // 进行一些初始化的操作
        Controller.prototype.init = function () {
            this.SocketEventList = new Array();
            this.registerSockets();
        };
        /**
         * 以某种特定的格式来注册协议
         * 协议的回调函数以 on + socket的id + event 的函数名
         * @param isRegister true 表示注册  false表示注销
         */
        Controller.prototype._registerManySockets = function (isRegister) {
            for (var _i = 0, _a = this.SocketEventList; _i < _a.length; _i++) {
                var value = _a[_i];
                var eventName = value.toString();
                var funcName = "on_" + eventName + "_event";
                if (this[funcName]) {
                    if (isRegister) {
                        LC.EventManager.getInstance().register(eventName, this[funcName], this);
                    }
                    else {
                        LC.EventManager.getInstance().unRegister(eventName, this[funcName], this);
                    }
                }
                else {
                    console.error("未添加相应的协议的监听");
                }
            }
        };
        /**
         * 注册协议
         * 保留此接口，一般省事儿用初始化SocketEventList即可
         */
        Controller.prototype.registerSockets = function () {
        };
        /**
         * 注销协议
         * 保留此接口，一般省事儿用初始化SocketEventList即可
         */
        Controller.prototype.unRegisterSockets = function () {
        };
        Controller.prototype.onDestroy = function () {
            // console.log(this.TAG + " onDestroy");
            this.unRegisterSockets();
            this._registerManySockets(false);
            this.SocketEventList = null;
        };
        return Controller;
    }());
    LC.Controller = Controller;
    __reflect(Controller.prototype, "LC.Controller");
})(LC || (LC = {}));
//# sourceMappingURL=Controller.js.map