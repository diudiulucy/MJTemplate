var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 层级类,只处理UI上的逻辑(一个layer对应一个controller,处理和后端的交互)，其子类不用关心销毁的操作 全在此类进行，销毁时移除监听事件和触摸事件以及调用Ctrl的销毁
 * 所有的组件都继承自Layer
 * 继承自eui.Component可以自定义外观组件
 * 可在构造函数中this.skinName = "Skin.GameLayer"和皮肤绑定
 * 1.用户与界面交互后通知controller来处理相应的逻辑
 * 2.游戏逻辑处理完毕后消息派发通知UI来更新界面
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
            _this.UIEventList = null; //对此数组赋值，可以快速绑定 不需要重复操作，注意对每个id添加对应的函数
            _this.TAG = egret.getQualifiedClassName(_this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
            return _this;
        }
        /**
         * 组件创建完毕
         * 此方法仅在组件第一次添加到舞台时回调一次
        */
        Layer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
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
        Object.defineProperty(Layer.prototype, "Size", {
            set: function (size) {
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 进行一些初始化的操作
        */
        Layer.prototype.init = function () {
            // console.log(this.TAG + " init");	
            this.UIEventList = new Array();
            this.setOnTouchListener();
            this.registerCustomEvents();
            this._registerManyUIEvents(true);
            this.watchData();
        };
        /**
         * 进行数据的监视
        */
        Layer.prototype.watchData = function () {
        };
        /**
         * 以某种特定的格式来注册ui消息
         * 协议的回调函数以 ui + socket的id + event 的函数名
         * @param isRegister true 表示注册  false表示注销
         */
        Layer.prototype._registerManyUIEvents = function (isRegister) {
            if (!this.UIEventList)
                return;
            for (var _i = 0, _a = this.UIEventList; _i < _a.length; _i++) {
                var value = _a[_i];
                var eventName = value.toString();
                var funcName = "ui_" + eventName;
                if (this[funcName]) {
                    if (isRegister) {
                        LC.EventManager.getInstance().register(eventName, this[funcName], this);
                    }
                    else {
                        LC.EventManager.getInstance().unRegister(eventName, this[funcName], this);
                    }
                }
                else {
                    console.error("\u672A\u6DFB\u52A0" + this.TAG + "\u7684" + funcName + "\u7684\u76D1\u542C");
                }
            }
        };
        // 触摸消息的注册全在这里操作
        Layer.prototype.setOnTouchListener = function () {
            // console.log(this.TAG + " setOnTouchListener");
        };
        Layer.prototype.removeOnTouchListener = function () {
            // console.log(this.TAG + " removeOnTouchListener");
        };
        Layer.prototype.registerCustomEvents = function () {
            // console.log(this.TAG + " registerCustomEvents");
        };
        Layer.prototype.unRegisterCustomEvents = function () {
            // console.log(this.TAG + " unRegisterCustomEvents");
        };
        // 进入层而且过渡动画结束时调用           
        Layer.prototype.onEnterTransitionDidFinish = function () {
        };
        // 退出层而且开始过渡动画时调用       
        Layer.prototype.onExitTransitionDidStart = function () {
        };
        /**
         * 层被销毁时调用移除触摸监听和事件派发的监听
         *
         *
        */
        Layer.prototype.onDestroy = function () {
            // console.log(this.TAG + " onDestroy");
            this.removeOnTouchListener();
            this.unRegisterCustomEvents();
            this._registerManyUIEvents(false);
            this.UIEventList = null;
            this.Ctrl && this.Ctrl.onDestroy();
            this.Ctrl = null;
        };
        return Layer;
    }(eui.Component));
    LC.Layer = Layer;
    __reflect(Layer.prototype, "LC.Layer");
})(LC || (LC = {}));
//# sourceMappingURL=Layer.js.map