var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 场景类(一个场景下可以加多个Layer或者其他的组件) 其子类不用关心销毁的操作 全在此类进行，销毁时移除所有的子节点以触发其相应的destory
 * 场景类中只处理UI的切换，不做协议的处理
 * 继承自eui.UILayer
 * UILayer 是 Group 的子类，它除了具有容器的所有标准功能，还能够自动保持自身尺寸始终与舞台尺寸相同（Stage.stageWidth,Stage.stageHeight）
 * 当舞台尺寸发生改变时，它会跟随舞台尺寸改变
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            var _this = _super.call(this) || this;
            _this.TAG = "";
            _this.TAG = egret.getQualifiedClassName(_this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
            return _this;
        }
        /**
         * 组件创建完毕
         * 此方法仅在组件第一次添加到舞台时回调一次
        */
        Scene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._isRunning = true;
        };
        Object.defineProperty(Scene.prototype, "isRunning", {
            /**
             * 场景是否在运行
             * @return boolean true表示正在运行，falseb表示没有运行
            */
            get: function () {
                return this._isRunning;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 场景被添加到舞台时调用
         * 进行一些初始化的操作
        */
        Scene.prototype.init = function () {
            // console.log(this.TAG + " init");
        };
        // 进入层而且过渡动画结束时调用           
        Scene.prototype.onEnterTransitionDidFinish = function () {
            // console.log(this.TAG + " onEnterTransitionDidFinish");
            // egret.Tween.get(this).to({x:this.stage.width*1.5 }, 0, egret.Ease.backInOut).to({x:0 }, 600, egret.Ease.sineInOut);
        };
        // 退出层而且开始过渡动画时调用       
        Scene.prototype.onExitTransitionDidStart = function () {
            // console.log(this.TAG + " onExitTransitionDidStart");
            // egret.Tween.get(this).to({x:-this.stage.width}, 0, egret.Ease.backInOut);
        };
        /**
         * 场景被销毁时调用
         * 场景被销毁时注意移除其所有的子节点，会触发相应的Destory来清理注册事件
        */
        Scene.prototype.onDestroy = function () {
            // console.log(this.TAG + " onDestroy");
            this.removeChildren();
        };
        return Scene;
    }(eui.UILayer));
    LC.Scene = Scene;
    __reflect(Scene.prototype, "LC.Scene");
})(LC || (LC = {}));
//# sourceMappingURL=Scene.js.map