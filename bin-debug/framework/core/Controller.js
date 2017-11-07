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
            console.log(this.TAG + " created");
        }
        return Controller;
    }());
    LC.Controller = Controller;
    __reflect(Controller.prototype, "LC.Controller");
})(LC || (LC = {}));
//# sourceMappingURL=Controller.js.map