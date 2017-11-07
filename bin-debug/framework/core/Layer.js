var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 层级类,只处理UI上的逻辑(一个layer对应一个controller,处理和后端的交互)
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super.call(this) || this;
            _this.TAG = "";
            return _this;
        }
        // 此方法仅在组件第一次添加到舞台时回调一次。
        Layer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.TAG = egret.getQualifiedClassName(this);
            this.init();
        };
        Object.defineProperty(Layer.prototype, "Ctrl", {
            get: function () {
                return this._ctrl;
            },
            set: function (ctrl) {
                this._ctrl = ctrl;
            },
            enumerable: true,
            configurable: true
        });
        // 进行一些初始化的操作
        Layer.prototype.init = function () {
            console.log(this.TAG + " init");
            this.setOnTouchListener();
            this.registerCustomEvents();
        };
        // 触摸消息的注册全在这里操作
        Layer.prototype.setOnTouchListener = function () {
            console.log(this.TAG + " setOnTouchListener");
        };
        Layer.prototype.removeOnTouchListener = function () {
            console.log(this.TAG + " removeOnTouchListener");
        };
        Layer.prototype.registerCustomEvents = function () {
            console.log(this.TAG + " registerCustomEvents");
        };
        Layer.prototype.unRegisterCustomEvents = function () {
            console.log(this.TAG + " unRegisterCustomEvents");
        };
        // 进入层时调用
        Layer.prototype.onEnter = function () {
        };
        // 进入层而且过渡动画结束时调用           
        Layer.prototype.onEnterTransitionDidFinish = function () {
        };
        // 退出层时调用     
        Layer.prototype.onEixt = function () {
        };
        // 退出层而且开始过渡动画时调用       
        Layer.prototype.onEixtTransitionDidStart = function () {
        };
        //层对象被清除时调用
        Layer.prototype.cleanup = function () {
            this.removeOnTouchListener();
            this.unRegisterCustomEvents();
        };
        return Layer;
    }(eui.Component));
    LC.Layer = Layer;
    __reflect(Layer.prototype, "LC.Layer");
})(LC || (LC = {}));
//# sourceMappingURL=Layer.js.map