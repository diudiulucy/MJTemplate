var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 场景类(一个场景下可以加多个Layer或者其他的组件)
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
        /**组件创建完毕*/
        Scene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._isRunning = true;
        };
        Object.defineProperty(Scene.prototype, "isRunning", {
            get: function () {
                return this._isRunning;
            },
            enumerable: true,
            configurable: true
        });
        // 场景被添加到舞台时调用，需要覆盖
        Scene.prototype.init = function () {
            console.log(this.TAG + " init");
        };
        // 进入层而且过渡动画结束时调用           
        Scene.prototype.onEnterTransitionDidFinish = function () {
            console.log(this.TAG + " onEnterTransitionDidFinish");
            // egret.Tween.get(this).to({x:this.stage.width*1.5 }, 0, egret.Ease.backInOut).to({x:0 }, 600, egret.Ease.sineInOut);
        };
        // 退出层而且开始过渡动画时调用       
        Scene.prototype.onExitTransitionDidStart = function () {
            console.log(this.TAG + " onExitTransitionDidStart");
            // egret.Tween.get(this).to({x:-this.stage.width}, 0, egret.Ease.backInOut);
        };
        /**场景被销毁时调用*/
        Scene.prototype.onDestroy = function () {
            console.log(this.TAG + " onDestroy");
        };
        return Scene;
    }(eui.UILayer));
    LC.Scene = Scene;
    __reflect(Scene.prototype, "LC.Scene");
})(LC || (LC = {}));
//# sourceMappingURL=Scene.js.map