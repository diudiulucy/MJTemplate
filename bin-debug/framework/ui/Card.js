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
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    /**
     * 麻将牌
     */
    var Card = (function (_super) {
        __extends(Card, _super);
        //this.currentState 当前的状态，根据当前的状态显示不同的皮肤
        function Card() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.Card";
            return _this;
        }
        Card.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        Card.prototype.setOutLineSkin = function (direction, state) {
            this.currentState = state + "_" + direction;
        };
        return Card;
    }(eui.Component));
    LC.Card = Card;
    __reflect(Card.prototype, "LC.Card");
})(LC || (LC = {}));
//# sourceMappingURL=Card.js.map