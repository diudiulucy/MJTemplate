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
 * 出牌模板
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var OutCardLayout = (function (_super) {
        __extends(OutCardLayout, _super);
        function OutCardLayout() {
            return _super.call(this) || this;
        }
        OutCardLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
        };
        /**
         * 重写显示列表更新
         */
        OutCardLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.target == null)
                return;
            var count = this.target.numElements;
            /// 第一轮循环收集可布局元素，或者说过滤不可布局元素
            var vcElemInLayout = new Array();
            for (var i = 0; i < count; i++) {
                var layoutElement = this.target.getElementAt(i);
                vcElemInLayout.push(layoutElement);
            }
            count = vcElemInLayout.length;
            for (var i = 1; i <= count; i++) {
                var elementWidth = vcElemInLayout[i - 1].width;
                var elementHeight = vcElemInLayout[i - 1].height - 10;
                var t = count - i;
                console.log(t);
                var childX = unscaledWidth - (t % 6) * elementWidth;
                var childY = unscaledHeight - Math.floor(t / 6) * elementHeight;
                vcElemInLayout[i - 1].x = childX;
                vcElemInLayout[i - 1].y = childY;
            }
        };
        return OutCardLayout;
    }(eui.LayoutBase));
    LC.OutCardLayout = OutCardLayout;
    __reflect(OutCardLayout.prototype, "LC.OutCardLayout");
})(LC || (LC = {}));
//# sourceMappingURL=OutCardLayout.js.map