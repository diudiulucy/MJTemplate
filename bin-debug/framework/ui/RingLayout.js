var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author lucywang
 * @date 2017/10/24
 *
 */
var LC;
(function (LC) {
    /**自定义的环形布局类*/
    var UIComponentClass = "eui.UIComponent";
    var RingLayout = (function (_super) {
        __extends(RingLayout, _super);
        function RingLayout() {
            return _super.call(this) || this;
        }
        /**
    * 计算target的尺寸
    * 因为环形布局，依赖容器尺寸来定义半径，所以需要容器显式的设置width和height,在这种情况下measure方法将失去作用
    * 所以在这个例子里面，不需要重写measure方法
    * 如果您的自定义布局需要根据内部子项计算尺寸，请重写这个方法
    **/
        RingLayout.prototype.measure = function () {
            _super.prototype.measure.call(this);
        };
        /**
         * 重写显示列表更新
         */
        RingLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.target == null)
                return;
            console.log(unscaledWidth, unscaledHeight);
            var angleBaseRdm = Math.PI * 2 * Math.random(); /// 增加随机因子起始角度
            var centerX = unscaledWidth / 2; // 获得容器中心的X坐标
            var centerY = unscaledHeight / 2; // 获得容器中心的Y坐标
            var horizon = centerX / 2; // 获得水平可用长度的一半
            var vertical = centerY / 2; // 获得垂直可用长度的一半
            var radius = horizon > vertical ? vertical : horizon; // 取小的为圆形半径
            var count = this.target.numElements;
            var maxX = 0;
            var maxY = 0;
            /// 第一轮循环收集可布局元素，或者说过滤不可布局元素
            var vcElemInLayout = new Array();
            for (var i = 0; i < count; i++) {
                var layoutElement = (this.target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.includeInLayout) {
                    /// 非布局元素需要排除在布局运算中
                    console.log("非布局", i);
                }
                else {
                    vcElemInLayout.push(layoutElement);
                }
            }
            /// debug
            /*var mark:egret.Shape = new egret.Shape;
            mark.graphics.lineStyle( 1 );
            mark.graphics.beginFill( 0x00ff00, 1 );
            mark.graphics.drawRect( -2, -2 ,4, 4 );
            mark.graphics.endFill();
            mark.x = centerX;
            mark.y = centerY;
            this.target.addChild( mark );
            */
            count = vcElemInLayout.length;
            for (var i = 0; i < count; i++) {
                var elementWidth = 0;
                var elementHeight = 0;
                var angle = angleBaseRdm + 2 * Math.PI * i / count; // 获得角度的大小
                var childX = centerX + radius * Math.sin(angle) - elementWidth / 2; // 获得圆周点的X坐标
                var childY = centerY - radius * Math.cos(angle) - elementHeight / 2; // 获得圆周点的Y坐标
                vcElemInLayout[i].anchorOffsetX = vcElemInLayout[i].width / 2;
                vcElemInLayout[i].anchorOffsetY = vcElemInLayout[i].height / 2;
                vcElemInLayout[i].setLayoutBoundsPosition(childX, childY);
                maxX = Math.max(maxX, childX + elementWidth);
                maxY = Math.max(maxY, childY + elementHeight);
            }
            this.target.setContentSize(maxX, maxY);
        };
        return RingLayout;
    }(eui.LayoutBase));
    LC.RingLayout = RingLayout;
    __reflect(RingLayout.prototype, "LC.RingLayout");
})(LC || (LC = {}));
//# sourceMappingURL=RingLayout.js.map