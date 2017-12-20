var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 麻将布局（每个模块对麻将的视图上的操作全部在此进行）
 * @author lucywang
 * @date 2017/10/23
 */
var LC;
(function (LC) {
    var UpDownState;
    (function (UpDownState) {
        UpDownState[UpDownState["Up"] = 0] = "Up";
        UpDownState[UpDownState["Down"] = 1] = "Down";
    })(UpDownState || (UpDownState = {}));
    LC.SelectCardComplete = "selectCardComplete"; //选牌完成
    /**
    * 麻将布局类
    * 麻将吃碰打出的牌手牌的变换位置等的操作全在此类进行
    *
    */
    var CardModLayout = (function (_super) {
        __extends(CardModLayout, _super);
        function CardModLayout() {
            var _this = _super.call(this) || this;
            //逻辑
            _this._handCardList = []; //当前的手牌数组
            _this._upDist = 40; //弹起的距离
            _this.canOutACard = false; //是否可以出牌
            _this.skinName = "Skin.CardModLayout";
            return _this;
        }
        CardModLayout.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 初始化手牌（未排序，这里对其排序）
         * @param direction    方向
         * @param handCardList 手牌列表
         */
        CardModLayout.prototype.initHandCards = function (direction, handCardList) {
            this.currentState = LC.Directions[direction]; //选择模块的状态
            ArrayUtils.sortByAsc(handCardList); //升序排列
            this._handCardList = handCardList; //记录当前模块的手牌
            this.HandCards.removeChildren(); //先移除手牌上的节点，再添加
            for (var i = 0; i < handCardList.length; i++) {
                var cardContainer = this._createHandCard(direction, handCardList[i], LC.CardState.Stand);
                this.HandCards.addChild(cardContainer);
            }
        };
        /**
         * 发牌补花(根据手牌来剔除花牌 hua_card代表花的多少与bu_cards的长度不一定相等)
         * @param direction   方向
         * @param hua_card    花牌
         * @param bu_cards    补牌
         */
        CardModLayout.prototype.appliqueCards = function (direction, hua_card, bu_cards) {
            if (direction != LC.Directions.Down)
                return; //其他的人的补花不做任何处理
            //删除花牌
            this._handCardList = this._deleteHuaCard(this._handCardList);
            //放入补花的牌
            for (var key in bu_cards) {
                this._handCardList.push(bu_cards[key]);
            }
            this.initHandCards(direction, this._handCardList);
        };
        /**
         * 将已碰的牌 变成杠牌显示 即显示四张
         * @param direction   方向
         * @param cardValue   牌值
         */
        CardModLayout.prototype.buGang = function (direction, cardValue) {
            for (var i = 0; i < this.AllCards.numChildren; i++) {
                var element = this.AllCards.getChildAt(i);
                if (element instanceof LC.ComboCards) {
                    element.changBuGang(direction, cardValue);
                }
            }
        };
        /**
         * 手牌到下
         */
        CardModLayout.prototype.fallDownAllHandCards = function (direction, handCardList) {
            ArrayUtils.sortByAsc(handCardList); //升序排列
            this._handCardList = handCardList; //记录当前模块的手牌
            this.HandCards.removeChildren(); //先移除手牌上的节点，再添加
            for (var i = 0; i < handCardList.length; i++) {
                var cardContainer = this._createHandCard(direction, handCardList[i], LC.CardState.Fall);
                this.FallHandCards.addChild(cardContainer);
            }
            if (this._drawCardContainer) {
                var drawCardValue = this._drawCardContainer.getChildAt(0).value;
                this.addDrawCard(direction, drawCardValue, LC.CardState.Fall);
            }
        };
        /**
         * 剔除花牌
         */
        CardModLayout.prototype._deleteHuaCard = function (cardList) {
            var result = [];
            for (var key in cardList) {
                if (cardList[key] < 97 || cardList[key] > 104) {
                    result.push(cardList[key]);
                }
            }
            return result;
        };
        /**
         * 打出一张牌
         */
        CardModLayout.prototype.outACard = function (direction, cardValue, cardPointer) {
            this._deleteAllHandCardsByValue(direction, cardValue);
            //添加牌的出牌列表
            var outCardContainer = this._addOutCard(direction, cardValue, cardPointer);
            return outCardContainer;
        };
        /**
         * 根据值来删除所有的手牌 包括摸的牌
         */
        CardModLayout.prototype._deleteAllHandCardsByValue = function (direction, cardValue) {
            if (direction == LC.Directions.Down) {
                this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down); //两个相同的牌值打出一个时会弹起一张
                if (this._drawCardContainer) {
                    var drawCardValue = this._drawCardContainer.getChildAt(0).value;
                    //如果是打出的牌就是摸的牌，则移除摸的牌即可
                    if (drawCardValue == cardValue) {
                        this.removeDrawCard();
                    }
                    else {
                        this._deleteHandCardByValue(direction, cardValue);
                        this._moveDrawCardToHandList(drawCardValue);
                    }
                }
                else {
                    this._deleteHandCardByValue(direction, cardValue);
                }
            }
            else {
                if (this._drawCardContainer) {
                    this.removeDrawCard();
                }
                else {
                    this._deleteHandCardByValue(direction, cardValue);
                }
            }
        };
        /**
        * 根据牌值删除手牌
        */
        CardModLayout.prototype._deleteHandCardByValue = function (direction, cardValue) {
            if (direction != LC.Directions.Down) {
                var cardContainer = this.HandCards.getChildAt(0); //每次删除第一个，后面可以改成随机删除某张牌
                cardContainer.parent.removeChild(cardContainer);
            }
            else {
                //找到其索引值
                var index = this._handCardList.indexOf(cardValue);
                if (index == -1)
                    return;
                //视图移除
                var cardContainer = this.HandCards.getChildAt(index);
                cardContainer.parent.removeChild(cardContainer);
                //数组移除
                this._handCardList.splice(index, 1);
            }
        };
        /**
         * 获取将要插入手牌排堆的索引值
         */
        CardModLayout.prototype._getInsertIndex = function (cardValue) {
            //手牌放入数组
            this._handCardList.push(cardValue);
            //重新排序
            ArrayUtils.sortByAsc(this._handCardList);
            var index = this._handCardList.indexOf(cardValue);
            return index;
        };
        /**
        * 将摸的牌插入手牌列表
        * @param drawCardValue 牌值
        */
        CardModLayout.prototype._moveDrawCardToHandList = function (drawCardValue) {
            var index = this._getInsertIndex(drawCardValue);
            var cardContainer = this._drawCardContainer.parent.removeChild(this._drawCardContainer);
            this.HandCards.addChildAt(cardContainer, index);
            this._drawCardContainer = null;
        };
        /**
        * 将手牌移除到drawCard,如吃碰杠操作后，弹一个将要出的牌，换牌（服务器返回了所有的card）成功的时候，如果是换的摸的牌，则将手牌移动过来
        * @param drawCardValue 牌值
        */
        CardModLayout.prototype.moveCardToDrawCard = function (direction, drawCardValue) {
            if (this._drawCardContainer)
                return; //如果有摸的牌  则不移动
            this._deleteHandCardByValue(direction, drawCardValue);
            this.addDrawCard(direction, drawCardValue, LC.CardState.Stand);
        };
        /**
        * 摸牌(摸的牌只有一张)
        * @param direction   方向
        * @param value       牌值
        *
        */
        CardModLayout.prototype.addDrawCard = function (direction, value, state) {
            this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down); //将点击的牌落下
            this._drawCardContainer && this._drawCardContainer.parent.removeChild(this._drawCardContainer); //如果有摸到的牌则移除掉，如游戏的补花
            this._drawCardContainer = this._createHandCard(direction, value, state);
            this.AllCards.addChild(this._drawCardContainer);
        };
        /**
         * 移除摸牌
         */
        CardModLayout.prototype.removeDrawCard = function () {
            this._drawCardContainer.parent.removeChild(this._drawCardContainer);
            this._drawCardContainer = null;
        };
        /**
        * 添加牌到出牌列表 (断线重连需要用到)
        * @param direction   方向
        * @param value       牌值
        */
        CardModLayout.prototype._addOutCard = function (direction, value, cardPointer) {
            var cardContainer = new eui.Group(); //注意不要设置其大小，group才会根据子节点的大小来自适应 为了加入指针进来，所以添加了一个group
            this.OutCards.addChild(cardContainer);
            var card = new LC.Card;
            card.setCardTexture(direction, LC.CardState.Fall, value);
            card.anchorOffsetX = card.width / 2;
            card.anchorOffsetY = card.height / 2;
            card.horizontalCenter = 0;
            card.verticalCenter = 0;
            cardContainer.addChild(card);
            this._adjustOutDir(direction, card);
            cardPointer && this._moveCardPointer(cardContainer, cardPointer);
            return cardContainer;
        };
        /**
         * 移动指针
         */
        CardModLayout.prototype._moveCardPointer = function (cardContainer, cardPointer) {
            cardPointer.parent && cardPointer.parent.removeChild(cardPointer);
            cardPointer.y = cardContainer.getChildAt(0).y;
            cardPointer.visible = true;
            cardContainer.addChild(cardPointer);
        };
        /**
        * 调整出牌的布局(为了使用tilemap的自动布局，且节点的添加顺序和麻将的习惯一致，做此调整)
        * @param direction   方向
        * @param card        牌对象
        */
        CardModLayout.prototype._adjustOutDir = function (direction, card) {
            switch (direction) {
                case LC.Directions.Left:
                    card.scaleX = -1;
                    card.anchorOffsetX = card.width / 2;
                    card.anchorOffsetY = card.height / 2;
                    card.horizontalCenter = 0;
                    card.verticalCenter = 0;
                    break;
                case LC.Directions.Right:
                    // card.scaleY = -1;
                    break;
                case LC.Directions.Up:
                    card.scaleX = card.scaleY = -0.9;
                    break;
                case LC.Directions.Down:
                    card.scaleX = card.scaleY = 0.9;
                    break;
            }
        };
        /**
        * 添加组合牌到列表
        * @param direction   方向
        * @param deleteList  手牌中需要删除的牌的索引值的数组
        * @param combList    组合牌值
        * @type  type        组合类型
        */
        CardModLayout.prototype.addCombToAllCardList = function (direction, deleteList, combList, type) {
            for (var _i = 0, deleteList_1 = deleteList; _i < deleteList_1.length; _i++) {
                var v = deleteList_1[_i];
                this._deleteAllHandCardsByValue(direction, v);
            }
            this._addComboCards(direction, combList, type);
        };
        /**
        * 创建手牌
        * @param direction   方向
        * @param value       牌值
        */
        CardModLayout.prototype._createHandCard = function (direction, value, state) {
            //白鹭的group加了布局后不允许改动其位置，没法实现弹起的效果，这里加个group
            var cardContainer = new eui.Group(); //注意不要设置其大小，group才会根据子节点的大小来自适应
            cardContainer.y = 0;
            (direction == LC.Directions.Down && state == LC.CardState.Stand) && cardContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this._handCardHandler, this);
            var card = new LC.Card;
            card.setCardTexture(direction, state, value);
            cardContainer.addChild(card);
            if (direction == LC.Directions.Down && state == LC.CardState.Fall) {
                card.scaleX = card.scaleY = 1.28;
            }
            else if (direction == LC.Directions.Down && state == LC.CardState.Stand) {
                card.scaleX = card.scaleY = 0.85;
            }
            return cardContainer;
        };
        /**
        * 触摸手牌的处理函数（此处只处理UI上的逻辑，其他的逻辑请在外部添加监听调用）
        * @param event   事件
        */
        CardModLayout.prototype._handCardHandler = function (event) {
            var cardContainer = event.currentTarget;
            //打印其深度
            var index = this.HandCards.getChildIndex(cardContainer);
            console.log("inner Cards index = " + index + " click");
            if (this._upCardContainer != cardContainer) {
                this._upCardContainer && this._upOrDown(this._upCardContainer, UpDownState.Down); //如果有弹起的牌将弹起的牌落下
                this._upOrDown(cardContainer, UpDownState.Up); //将点击的牌弹起
            }
            else if (this._upCardContainer == cardContainer && this.canOutACard) {
                var card = this._upCardContainer.getChildAt(0);
                this.canOutACard = false;
                LC.EventManager.getInstance().dispatchCustomEvent(LC.SelectCardComplete, { cardValue: card.value });
            }
        };
        /**
         * 弹起或落下
         */
        CardModLayout.prototype._upOrDown = function (cardContainer, state) {
            if (state == UpDownState.Up) {
                cardContainer.getChildAt(0).y = -this._upDist;
                this._upCardContainer = cardContainer; //修改当前弹起的牌
            }
            else if (state == UpDownState.Down) {
                cardContainer.getChildAt(0).y = 0;
                this._upCardContainer = null;
            }
        };
        /**
        * 添加组合牌
        * @param direction   方向
        * @param combList    牌值数组
        * @param type        组合类型
        */
        CardModLayout.prototype._addComboCards = function (direction, combList, type) {
            var combCards = new LC.ComboCards;
            combCards.bottom = 0;
            combCards.setCombCardsTexture(direction, combList, type);
            this.AllCards.addChildAt(combCards, 0);
        };
        /**
        * 重置模块
        */
        CardModLayout.prototype.reSetMod = function () {
            this._handCardList = [];
            this._upCardContainer = null;
            this._drawCardContainer = null;
            this.canOutACard = false;
            //    this.removeDrawCard();
            // this.FallHandCards.includeInLayout = false;
            // this.HandCards.includeInLayout = true;
            var deleteChilds = [];
            for (var i = 0; i < this.AllCards.numChildren; i++) {
                var element = this.AllCards.getChildAt(i);
                if (element != this.HandCards && element != this.FallHandCards) {
                    deleteChilds.push(element);
                    //    this.AllCards.removeChild(element);//根据深度取的child，这里直接删除后，下一次取不到
                }
            }
            for (var _i = 0, deleteChilds_1 = deleteChilds; _i < deleteChilds_1.length; _i++) {
                var element = deleteChilds_1[_i];
                element.parent.removeChild(element);
            }
            this.FallHandCards.removeChildren();
            this.HandCards.removeChildren();
            this.OutCards.removeChildren();
        };
        return CardModLayout;
    }(eui.Component));
    LC.CardModLayout = CardModLayout;
    __reflect(CardModLayout.prototype, "LC.CardModLayout");
})(LC || (LC = {}));
//# sourceMappingURL=CardModLayout.js.map