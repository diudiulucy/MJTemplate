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
 * 加载层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoadingLayer = (function (_super) {
        __extends(LoadingLayer, _super);
        function LoadingLayer() {
            return _super.call(this) || this;
        }
        LoadingLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            this.percentWidth = 100;
            this.percentHeight = 100;
            var bg = new eui.Image();
            bg.source = RES.getRes("PreLoadingBg_png");
            bg.percentWidth = 100;
            bg.percentHeight = 100;
            this.addChild(bg);
            var group = new eui.Group();
            group.horizontalCenter = 0;
            group.bottom = 20;
            this.addChild(group);
            var pgBg = new eui.Image();
            pgBg.source = RES.getRes("PreLoadingBarBg_png");
            group.addChild(pgBg);
            this.pgBar = new eui.Image();
            this.pgBar.source = RES.getRes("PreLoadingBar_png");
            this.pgBar.left = 30;
            this.pgBar.verticalCenter = -5;
            group.addChild(this.pgBar);
            this.pgBarWidth = this.pgBar.width;
            this.proLabel = new eui.Label();
            this.proLabel.horizontalCenter = 0;
            this.proLabel.verticalCenter = -5;
            this.proLabel.textAlign = "center";
            this.proLabel.size = 24;
            this.proLabel.textColor = 0xFFFFFF;
            this.proLabel.bold = true;
            this.proLabel.stroke = 1;
            this.proLabel.strokeColor = 0x000000;
            group.addChild(this.proLabel);
            this.proLabel.text = "0%";
            this.pgBar.width = 0;
        };
        /**
         * 进度条
         */
        LoadingLayer.prototype.setProgress = function (current, total) {
            var rate = Math.round((current / total) * 100);
            this.proLabel.text = rate + "%";
            this.pgBar.width = this.pgBarWidth * (current / total);
        };
        return LoadingLayer;
    }(LC.Layer));
    LC.LoadingLayer = LoadingLayer;
    __reflect(LoadingLayer.prototype, "LC.LoadingLayer");
})(LC || (LC = {}));
//# sourceMappingURL=LoadingLayer.js.map