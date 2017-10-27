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
    var CombData = (function () {
        function CombData() {
        }
        return CombData;
    }());
    LC.CombData = CombData;
    __reflect(CombData.prototype, "LC.CombData");
    /**
    * 麻将布局类
    * 麻将吃碰打出的牌手牌的变换位置等的操作全在此类进行
    *
    */
    var CardModLayout = (function (_super) {
        __extends(CardModLayout, _super);
        function CardModLayout() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.CardModLayout";
            return _this;
        }
        CardModLayout.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        CardModLayout.prototype.initView = function (direction, handCardList, data) {
            this.currentState = LC.Directions[direction];
            //手牌
            for (var i = 0; i < data.handCardList.length; i++) {
                var card = new LC.Card;
                card.setCardTexture(direction, LC.CardState.Stand, handCardList[i]);
                this.HandCards.addChild(card);
            }
            var combList = [
                22,
                22,
                22,
                22,
            ];
            //组合牌
            for (var i = 0; i < 3; i++) {
                var combCards = new LC.ComboCards;
                combCards.bottom = 0;
                combCards.setCombCardsTexture(direction, combList, LC.CardCombType.AnGang);
                this.AllCards.addChild(combCards);
            }
            // this._childAddToHandCards();
            this.AllCards.setChildIndex(this.HandCards, 10);
            //摸的牌
            var drawCard = new LC.Card();
            drawCard.setCardTexture(direction, LC.CardState.Stand, 38);
            // drawCard.setCardTexture(LC.CardSkinState.stand_up, 38);
            drawCard.bottom = 0;
            this.AllCards.addChild(drawCard);
            //打出的牌
            for (var i = 0; i < data.outCardList.length; i++) {
                var card = new LC.Card;
                card.scaleX = 0.75;
                card.scaleY = 0.75;
                card.setCardTexture(direction, LC.CardState.Fall, data.outCardList[i]);
                this.OutCards.addChild(card);
            }
        };
        return CardModLayout;
    }(eui.Component));
    LC.CardModLayout = CardModLayout;
    __reflect(CardModLayout.prototype, "LC.CardModLayout");
})(LC || (LC = {}));
//# sourceMappingURL=CardModLayout.js.map