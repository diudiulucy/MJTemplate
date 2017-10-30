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
        function CardModLayout() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.CardModLayout";
            return _this;
        }
        CardModLayout.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化手牌（注：初始状态只有手牌,庄家多一张摸牌）
         *
         */
        CardModLayout.prototype.initHandCards = function (direction, handCardList, drawCardValue) {
            this.currentState = LC.Directions[direction];
            drawCardValue && this.addDrawCard(direction, drawCardValue);
            for (var i = 0; i < handCardList.length; i++) {
                var card = this._createHandCard(direction, handCardList[i]);
                this.HandCards.addChild(card);
            }
        };
        CardModLayout.prototype._handCardHandler = function (event) {
            var card = event.currentTarget;
            //打印其深度
            var index = this.HandCards.getChildIndex(card);
            console.log("inner initHandCards" + index);
            this.OutACard(card);
        };
        /**
        * 打出一张牌
        * @param card 牌类
        */
        CardModLayout.prototype.OutACard = function (card) {
            if (this.HandCards.numChildren > 1) {
                this._addOutCard(card.direction, card.value);
                card.parent.removeChild(card);
            }
        };
        /**
        * 将摸的牌插入手牌列表
        * @param value       牌值
        * @param index       索引
        */
        CardModLayout.prototype.moveDrawCardToHandList = function (cardObj, index) {
            if (!cardObj) {
                return;
            }
            var card = this._createHandCard(cardObj.direction, cardObj.value);
            this.HandCards.addChildAt(card, index);
            cardObj.parent.removeChild(cardObj);
            this.drawCard = null;
        };
        /**
        * 摸牌(摸的牌只有一张)
        * @param direction   方向
        * @param value       牌值
        *
        */
        CardModLayout.prototype.addDrawCard = function (direction, value) {
            this.drawCard = this._createHandCard(direction, value);
            this.AllCards.addChild(this.drawCard);
        };
        /**
        * 添加牌到出牌列表
        * @param direction   方向
        * @param value       牌值
        */
        CardModLayout.prototype._addOutCard = function (direction, value) {
            var card = new LC.Card;
            card.scaleX = 0.75;
            card.scaleY = 0.75;
            card.setCardTexture(direction, LC.CardState.Fall, value);
            this.OutCards.addChild(card);
        };
        /**
        * 创建手牌
        * @param direction   方向
        * @param value       牌值
        */
        CardModLayout.prototype._createHandCard = function (direction, value) {
            var card = new LC.Card;
            card.setCardTexture(direction, LC.CardState.Stand, value);
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, this._handCardHandler, this);
            return card;
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
            this.AllCards.addChildAt(combCards, 0);
        };
        return CardModLayout;
    }(eui.Component));
    LC.CardModLayout = CardModLayout;
    __reflect(CardModLayout.prototype, "LC.CardModLayout");
})(LC || (LC = {}));
//# sourceMappingURL=CardModLayout.js.map