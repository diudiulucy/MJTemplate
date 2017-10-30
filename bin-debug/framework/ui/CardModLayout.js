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
    // export class CombData {
    //     CombValue: [number, number, number, number];
    // }
    // export interface CardMod {
    //     handCardList?: Array<number>;
    //     outCardList?: Array<number>;
    //     combList?: Array<CombData>;
    // }
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
        // public initView(direction: LC.Directions, handCardList: Array<number>, data: CardMod) {
        //     this.currentState = LC.Directions[direction];
        //     //手牌
        //     for (let value of handCardList) {
        //         let card = new LC.Card;
        //         card.setCardTexture(direction, LC.CardState.Stand, value);
        //         this.HandCards.addChild(card);
        //     }
        //     let combList = [
        //         22,
        //         22,
        //         22,
        //         22,
        //         // 23,
        //         // 24,
        //     ];
        //     //组合牌
        //     for (let i = 0; i < 4; i++) {
        //         let combCards = new LC.ComboCards;
        //         combCards.bottom = 0;
        //         combCards.setCombCardsTexture(direction, combList, LC.CardCombType.AnGang);
        //         // this.AllCards.addChild(combCards);
        //     }
        //     // this._childAddToHandCards();
        //     this.AllCards.setChildIndex(this.HandCards, 10);
        //     //摸的牌
        //     let drawCard = new LC.Card();
        //     drawCard.setCardTexture(direction, LC.CardState.Stand, 38);
        //     // drawCard.setCardTexture(LC.CardSkinState.stand_up, 38);
        //     drawCard.bottom = 0;
        //     this.AllCards.addChild(drawCard);
        //     //打出的牌
        //     for (let i = 0; i < data.outCardList.length; i++) {
        //         let card = new LC.Card;
        //         card.scaleX = 0.75;
        //         card.scaleY = 0.75
        //         card.setCardTexture(direction, LC.CardState.Fall, data.outCardList[i]);
        //         this.OutCards.addChild(card);
        //     }
        // }
        /**
         * 初始化手牌（注：初始状态只有手牌,庄家多一张摸牌）
         *
         */
        CardModLayout.prototype.initHandCards = function (direction, handCardList, drawCardValue) {
            var _this = this;
            this.currentState = LC.Directions[direction];
            var drawCard = drawCardValue && this.addDrawCard(direction, drawCardValue);
            var _loop_1 = function (i) {
                var card = new LC.Card;
                card.setCardTexture(direction, LC.CardState.Stand, handCardList[i]);
                this_1.HandCards.addChild(card);
                direction == LC.Directions.Down && card.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    console.log(i);
                    if (_this.HandCards.numChildren > 1) {
                        _this.HandCards.removeChild(card);
                        _this.addOutCards(direction, handCardList[i]);
                        drawCard && _this.addDrawCardAt(direction, drawCard, 4);
                    }
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < handCardList.length; i++) {
                _loop_1(i);
            }
        };
        /**
        * 将摸的牌插入手牌list
        * @param direction   方向
        * @param value       牌值
        * @param index       索引
        */
        CardModLayout.prototype.addDrawCardAt = function (direction, cardObj, index) {
            if (!cardObj) {
                console.log("没有摸牌对象");
                return;
            }
            var card = this.AllCards.removeChild(cardObj);
            cardObj = null;
            this.HandCards.addChildAt(card, index);
        };
        /**
        * 摸牌
        * @param direction   方向
        * @param value       牌值
        *
        */
        CardModLayout.prototype.addDrawCard = function (direction, value) {
            var drawCard = new LC.Card();
            drawCard.setCardTexture(direction, LC.CardState.Stand, value);
            drawCard.bottom = 0;
            this.AllCards.addChild(drawCard);
            return drawCard;
        };
        /**
        * 出牌
        *
        */
        CardModLayout.prototype.addOutCards = function (direction, value) {
            var card = new LC.Card;
            card.scaleX = 0.75;
            card.scaleY = 0.75;
            card.setCardTexture(direction, LC.CardState.Fall, value);
            this.OutCards.addChild(card);
        };
        /**
        * 添加组合牌
        * @param direction   方向
        * @param combList    牌值数组
        * @param type        组合类型
        */
        CardModLayout.prototype.addComboCards = function (direction, combList, type) {
            var combCards = new LC.ComboCards;
            combCards.bottom = 0;
            combCards.setCombCardsTexture(direction, combList, type);
            this.AllCards.addChild(combCards);
        };
        return CardModLayout;
    }(eui.Component));
    LC.CardModLayout = CardModLayout;
    __reflect(CardModLayout.prototype, "LC.CardModLayout");
})(LC || (LC = {}));
//# sourceMappingURL=CardModLayout.js.map