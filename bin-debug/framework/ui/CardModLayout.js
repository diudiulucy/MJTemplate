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
 * @date 2017/10/23
 */
var LC;
(function (LC) {
    /**
    * 麻将布局类
    * 麻将吃碰打出的牌手牌的变换位置等的操作全在此类进行
    *
    */
    var CardModLayout = (function (_super) {
        __extends(CardModLayout, _super);
        // private _handCardState = [
        //     LC.CardState.stand_up,
        //     LC.CardState.stand_down,
        //     LC.CardState.stand_left,
        //     LC.CardState.stand_right
        // ]
        function CardModLayout() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.CardModLayout";
            return _this;
        }
        CardModLayout.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return CardModLayout;
    }(eui.Component));
    LC.CardModLayout = CardModLayout;
    __reflect(CardModLayout.prototype, "LC.CardModLayout");
})(LC || (LC = {}));
//# sourceMappingURL=CardModLayout.js.map