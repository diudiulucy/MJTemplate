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
 * 场景管理类(全局唯一管理场景的地方)控制游戏场景流程的切换 不用枚举来创建场景，避免过多依赖
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._runningScene = null;
            _this._scenesStack = [];
            _this._nextScene = null;
            return _this;
        }
        Object.defineProperty(SceneManager, "Instance", {
            //为方便提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype._setNextScene = function () {
            egret.MainContext.instance.stage.addChild(this._nextScene);
            if (this._runningScene) {
                this._runningScene.onExitTransitionDidStart();
            }
            this._nextScene.onEnterTransitionDidFinish();
            if (this._sendCleanupToScene && this._runningScene) {
                this._runningScene.parent.removeChild(this._runningScene);
            }
            this._runningScene = this._nextScene;
            this._nextScene = null;
        };
        //启动游戏，并运行scene场景。本方法在主程序第一次启动主场景的时候调用。如果已有正在运行的场景则不能调用该方法；会调用pushScene-->startAnimation。
        SceneManager.prototype.runWithScene = function (scene) {
            console.assert(scene != null, "This command can only be used to start the SceneManager. There is already a scene present.");
            console.assert(this._runningScene == null, "_runningScene should be null");
            this.pushScene(scene);
        };
        //直接使用传入的scene替换当前场景来切换画面，当前场景被释放。这是切换场景时最常用的方法。
        SceneManager.prototype.replaceScene = function (scene) {
            console.assert(scene != null, "the scene should not be null");
            if (this._runningScene == null) {
                this.runWithScene(scene);
                return;
            }
            if (scene == this._nextScene)
                return;
            if (this._nextScene) {
                if (this._nextScene.isRunning) {
                    this._nextScene.parent.removeChild(this._nextScene);
                }
                this._nextScene = null;
            }
            this._sendCleanupToScene = true;
            var len = this._scenesStack.length;
            this._scenesStack.splice(len - 1, 1, scene);
            this._nextScene = scene;
            this._setNextScene();
        };
        //将当前运行中的场景暂停并压入到代码执行场景栈中，再将传入的scene设置为当前运行场景，只有存在正在运行的场景时才调用该方法；
        SceneManager.prototype.pushScene = function (scene) {
            console.assert(scene != null, "the scene should not null");
            this._sendCleanupToScene = false;
            this._scenesStack.push(scene);
            this._nextScene = scene;
            this._setNextScene();
        };
        //释放当前场景，再从代码执行场景中弹出栈顶的场景，并将其设置为当前运行场景。如果栈为空，直接结束应用。和PushScene结对使用
        SceneManager.prototype.popScene = function () {
            console.assert(this._runningScene != null, "running scene should not null");
            this._scenesStack.pop();
            var len = this._scenesStack.length;
            if (len == 0) {
                //结束程序
            }
            else {
                this._sendCleanupToScene = true;
                this._nextScene = this._scenesStack[len - 1];
                this._setNextScene();
            }
        };
        Object.defineProperty(SceneManager.prototype, "runningScene", {
            get: function () {
                return this._runningScene;
            },
            enumerable: true,
            configurable: true
        });
        //end() 释放和终止执行场景，同时退出应用
        SceneManager.prototype.end = function () {
        };
        // 暂停当前运行场景中的所有计时器和动作，场景仍然会显示在屏幕上
        SceneManager.prototype.pause = function () {
        };
        //恢复当前运行场景的所有计时器和动作，场景仍然会显示在屏幕上
        SceneManager.prototype.resume = function () {
        };
        return SceneManager;
    }(LC.Single));
    LC.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "LC.SceneManager");
})(LC || (LC = {}));
//# sourceMappingURL=SceneManager.js.map