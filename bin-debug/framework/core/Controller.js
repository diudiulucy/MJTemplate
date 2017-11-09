var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Controller = (function () {
        function Controller() {
            this.TAG = "";
            this.TAG = egret.getQualifiedClassName(this);
            this.init();
        }
        // 进行一些初始化的操作
        Controller.prototype.init = function () {
            //监听协议
            this.registerSocket();
        };
        //监听协议的接口
        Controller.prototype.registerSocket = function () {
        };
        Controller.prototype.unRegisterSocket = function () {
        };
        Controller.prototype.onDestroy = function () {
            this.unRegisterSocket();
        };
        return Controller;
    }());
    LC.Controller = Controller;
    __reflect(Controller.prototype, "LC.Controller");
})(LC || (LC = {}));
//# sourceMappingURL=Controller.js.map