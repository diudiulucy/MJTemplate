var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 加载层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoadingLayer = (function (_super) {
        __extends(LoadingLayer, _super);
        function LoadingLayer() {
            var _this = _super.call(this) || this;
            _this.w = 0;
            _this.h = 0;
            return _this;
        }
        LoadingLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            this.w = egret.MainContext.instance.stage.stageWidth;
            this.h = egret.MainContext.instance.stage.stageHeight;
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes("PreLoadingBg_png");
            this.bg.width = this.w;
            this.bg.height = this.h;
            this.addChild(this.bg);
            this.pgBg = new egret.Bitmap;
            this.pgBg.texture = RES.getRes("PreLoadingBarBg_png");
            this.pgBg.x = this.w / 2 - this.pgBg.width / 2;
            this.pgBg.y = this.h - this.pgBg.height - 50;
            this.addChild(this.pgBg);
            this.pgBar = new egret.Bitmap;
            this.pgBar.texture = RES.getRes("PreLoadingBar_png");
            this.pgBar.x = this.w / 2 - this.pgBar.width / 2;
            this.pgBar.y = this.pgBg.y + 20;
            this.addChild(this.pgBar);
            this.textField = new egret.TextField();
            this.textField.size = 24;
            this.textField.textColor = 0xFFFFFF;
            this.textField.bold = true;
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.addChild(this.textField);
            this.textField.width = 100;
            this.textField.x = this.w / 2 - this.textField.width / 2;
            this.textField.y = this.pgBg.y + 20;
            this.textField.textAlign = "center";
            this.textField.text = "0%";
            this.pgBar.width = 0;
        };
        /**
         * 进度条
         */
        // public progressBar:egret.gui.ProgressBar;
        LoadingLayer.prototype.setProgress = function (current, total) {
            // if(this.progressBar)
            // {
            //     this.progressBar.maximum = total;
            //     this.progressBar.value = current;
            // }
            var rate = Math.round((current / total) * 100);
            this.textField.text = rate + "%";
            this.pgBar.width = 641 * (current / total);
        };
        LoadingLayer.prototype.registerCustomEvents = function () {
            _super.prototype.registerCustomEvents.call(this);
            LC.EventManager.getInstance().register(CustomEvents.UPDATE_VIEW, this.updateView, this);
        };
        LoadingLayer.prototype.updateView = function () {
            console.log("updateView");
        };
        LoadingLayer.prototype.unRegisterCustomEvents = function () {
            _super.prototype.unRegisterCustomEvents.call(this);
            LC.EventManager.getInstance().unRegister(CustomEvents.UPDATE_VIEW, this.updateView, this);
        };
        return LoadingLayer;
    }(LC.Layer));
    LC.LoadingLayer = LoadingLayer;
    __reflect(LoadingLayer.prototype, "LC.LoadingLayer");
})(LC || (LC = {}));
//# sourceMappingURL=LoadingLayer.js.map