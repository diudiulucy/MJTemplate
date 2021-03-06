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
 * 出牌指针
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var CardPointer = (function (_super) {
        __extends(CardPointer, _super);
        function CardPointer() {
            var _this = _super.call(this) || this;
            _this._moveDist = -10; //移动距离
            _this.width = 50;
            _this.height = 64;
            return _this;
        }
        /**
         * 组件创建完毕
         * 此方法仅在组件第一次添加到舞台时回调一次
        */
        CardPointer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var image = new eui.Image();
            image.source = "outCardPointer_png";
            this.addChild(image);
            image.anchorOffsetY = image.height / 2;
            this.start();
        };
        //开始上下移动的动画
        CardPointer.prototype.start = function () {
            var yPos = this.y;
            egret.Tween.removeTweens(this);
            egret.Tween.get(this, { loop: true }).to({ y: yPos + this._moveDist }, 500).to({ y: yPos }, 500);
        };
        return CardPointer;
    }(LC.Layer));
    LC.CardPointer = CardPointer;
    __reflect(CardPointer.prototype, "LC.CardPointer");
})(LC || (LC = {}));
//# sourceMappingURL=CardPointer.js.map