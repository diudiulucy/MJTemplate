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
 * 提示(待优化)
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Tips = (function (_super) {
        __extends(Tips, _super);
        function Tips() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._pool = [];
            return _this;
        }
        Object.defineProperty(Tips, "Instance", {
            //为方便提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Tips.show = function (msg) {
            Tips.Instance._initView(msg);
        };
        Tips.prototype._initView = function (msg) {
            var _this = this;
            var stage = egret.MainContext.instance.stage;
            var item = this._pool.length > 0 ? this._pool.pop() : new TipItem;
            item.text = msg;
            item.alpha = 0;
            var ty = stage.stageHeight / 2 - 200;
            egret.MainContext.instance.stage.addChild(item);
            var time = this._pool.length > 0 ? 1000 : 0;
            egret.Tween.get(item).wait(time).to({ y: ty - 100, alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.quadOut)
                .wait(1000).to({ y: ty - 180, alpha: 0 }, 500, egret.Ease.quadIn).call(function (target) {
                stage.removeChild(target);
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
            _this._bg = new egret.Sprite();
            _this._init();
            return _this;
        }
        TipItem.prototype._init = function () {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this._group = new eui.Group();
            this.addChild(this._group);
            this._txt = new eui.Label();
            this._txt.size = 26;
            this._txt.bold = true;
            this._txt.textColor = 0xffffff;
            this._txt.multiline = true;
            this._txt.wordWrap = true;
            this._txt.textAlign = egret.HorizontalAlign.CENTER;
            this._group.addChild(this._txt);
        };
        Object.defineProperty(TipItem.prototype, "text", {
            set: function (v) {
                this._txt.text = v;
                this._bg.graphics.clear();
                this._bg.graphics.beginFill(0x000000, 0.8);
                this._bg.graphics.drawRoundRect(0, 0, this._txt.width + 40, this._txt.height + 20, 30, 30);
                this._group.addChild(this._bg);
                this._group.width = this._bg.width;
                this._group.height = this._bg.height;
                this._txt.horizontalCenter = 0;
                this._txt.y = (this._group.height - this._txt.height);
                this._group.anchorOffsetX = this._group.width / 2;
                this._group.horizontalCenter = 0;
                this.validateNow();
            },
            enumerable: true,
            configurable: true
        });
        return TipItem;
    }(eui.Component));
    __reflect(TipItem.prototype, "TipItem");
})(LC || (LC = {}));
//# sourceMappingURL=Tips.js.map