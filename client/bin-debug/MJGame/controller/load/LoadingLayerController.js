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
 * 加载层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoadingLayerController = (function (_super) {
        __extends(LoadingLayerController, _super);
        //加入构造器，代码才可以跳转到此类，否则直接跳到父类
        function LoadingLayerController() {
            return _super.call(this) || this;
        }
        LoadingLayerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Rev100000,
            ];
        };
        LoadingLayerController.prototype.on_100000_event = function (event) {
            console.log(this.TAG + " on_100000_event: " + event.data);
        };
        return LoadingLayerController;
    }(LC.Controller));
    LC.LoadingLayerController = LoadingLayerController;
    __reflect(LoadingLayerController.prototype, "LC.LoadingLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=LoadingLayerController.js.map