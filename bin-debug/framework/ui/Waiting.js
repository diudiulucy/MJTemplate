/**
 * 转菊花等待
 * @author lucywang
 * @date 2017/10/19
 */
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
var LC;
(function (LC) {
    var Waiting = (function (_super) {
        __extends(Waiting, _super);
        function Waiting() {
            var _this = _super.call(this) || this;
            _this.bg = new egret.Sprite();
            return _this;
        }
        Waiting.prototype.init = function () {
            _super.prototype.init.call(this);
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
            this.bg.graphics.clear();
            this.bg.graphics.beginFill(0x000000, 0.3);
            this.bg.graphics.drawRect(0, 0, this.width, this.height);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.waitImg = new eui.Image();
            this.waitImg.source = RES.getRes("loadingCircle_png");
            this.addChild(this.waitImg);
            this.waitImg.horizontalCenter = 0;
            this.waitImg.verticalCenter = 0;
            EffectUtils.rotationEffect(this.waitImg, 1000);
        };
        return Waiting;
    }(LC.Layer));
    __reflect(Waiting.prototype, "Waiting");
    var WaitingManager = (function (_super) {
        __extends(WaitingManager, _super);
        function WaitingManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.waiting = new Waiting();
            return _this;
        }
        Object.defineProperty(WaitingManager, "Instance", {
            //为方便提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        WaitingManager.prototype.show = function () {
            if (this.waiting == null) {
                this.waiting = new Waiting();
            }
            LC.SceneManager.Instance.runningScene.addChild(this.waiting);
        };
        WaitingManager.prototype.hide = function () {
            if (LC.SceneManager.Instance.runningScene.contains(this.waiting)) {
                LC.SceneManager.Instance.runningScene.removeChild(this.waiting);
                this.waiting = null;
            }
        };
        return WaitingManager;
    }(LC.Single));
    LC.WaitingManager = WaitingManager;
    __reflect(WaitingManager.prototype, "LC.WaitingManager");
})(LC || (LC = {}));
//# sourceMappingURL=Waiting.js.map