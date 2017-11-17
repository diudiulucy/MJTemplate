var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 提示(待优化)
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Tips = (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Tips, "Instance", {
            //为方便提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Tips.prototype.setLayer = function (layer) {
            this._layer = layer;
            this._pool = [];
            this._queue = [];
        };
        Tips.show = function (msg) {
            Tips.Instance._initView(msg);
        };
        Tips.prototype._initView = function (msg) {
            var _this = this;
            var item = this._pool.length > 0 ? this._pool.pop() : new TipItem;
            item.text = msg;
            item.alpha = 0;
            item.x = (this._layer.stage.stageHeight) / 2;
            var ty = this._layer.stage.stageHeight / 2 - 200;
            item.y = ty;
            item.scaleX = item.scaleY = 1.2;
            this._layer.addChild(item);
            var time = this._pool.length > 0 ? 1500 : 0;
            this._queue.push(1);
            egret.Tween.get(item).wait(time).to({ y: ty - 100, alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.quadOut)
                .wait(1500).to({ y: ty - 180, alpha: 0 }, 500, egret.Ease.quadIn).call(function (target) {
                _this._layer.removeChild(target);
                _this._pool.push(target);
            }, this, [item]);
        };
        return Tips;
    }(LC.Single));
    LC.Tips = Tips;
    __reflect(Tips.prototype, "LC.Tips");
    var TipItem = (function (_super) {
        __extends(TipItem, _super);
        function TipItem() {
            var _this = _super.call(this) || this;
            _this._init();
            return _this;
        }
        TipItem.prototype._init = function () {
            this.width = egret.MainContext.instance.stage.width * 0.6;
            this._txt = new eui.Label();
            this._txt.size = 26;
            this._txt.bold = true;
            this._txt.textColor = 0xffffff;
            this._txt.multiline = true;
            this._txt.wordWrap = true;
            this._txt.textAlign = egret.HorizontalAlign.CENTER;
            this._txt.width = egret.MainContext.instance.stage.width * 5;
            this._txt.y = 10;
            this.addChild(this._txt);
            this._bg = new egret.Shape();
            this.addChild(this._bg);
        };
        Object.defineProperty(TipItem.prototype, "text", {
            set: function (v) {
                this._txt.text = v;
                this.anchorOffsetX = this.width / 2;
                this.anchorOffsetY = this.height / 2;
                this._bg.graphics.clear();
                this._bg.graphics.beginFill(0x000000, 0.8);
                this._bg.graphics.drawRoundRect(0, 0, this._txt.width, this.height + 20, 30, 30);
                this._txt.x = (this.width - this._txt.width) / 2;
            },
            enumerable: true,
            configurable: true
        });
        return TipItem;
    }(eui.Component));
    __reflect(TipItem.prototype, "TipItem");
})(LC || (LC = {}));
//# sourceMappingURL=Tips.js.map