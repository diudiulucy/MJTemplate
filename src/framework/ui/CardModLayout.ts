/**
 * 麻将布局
 * @author lucywang
 * @date 2017/10/23
 */
module LC {

    /**
    * 麻将布局类
    * 麻将吃碰打出的牌手牌的变换位置等的操作全在此类进行
    *
    */
    export class CardModLayout extends eui.Component {
        public AllCards: eui.Group;
        public HandCards: eui.Group;
        public OutCards: eui.Group;

        public drawCard: LC.Card;

        public constructor() {
            super();
            this.skinName = "Skin.CardModLayout";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**
         * 初始化手牌（注：初始状态只有手牌,庄家多一张摸牌）
         * 
         */
        public initAllCards(direction: LC.Directions, handCardList: Array<number>, drawCardValue?: number) {
            this.currentState = LC.Directions[direction];

            drawCardValue && this.addDrawCard(direction, drawCardValue);

            for (let i = 0; i < handCardList.length; i++) {
                 let card = this._createHandCard(direction,handCardList[i]);
                 this.HandCards.addChild(card);
            }
        }

        /**
        * 打出一张牌
        * @param card 牌类
        */
        public OutACard(card: LC.Card) {
            if (this.HandCards.numChildren > 1) {
                this._addOutCard(card.direction, card.value);
                card.parent.removeChild(card);
            }
        }

        /**
        * 将摸的牌插入手牌列表
        * @param value       牌值
        * @param index       索引
        */
        public moveDrawCardToHandList(cardObj: LC.Card, index: number) {
            if(!cardObj){
                console.log("摸牌对象为空");
                return;
            }

            let card = this._createHandCard(cardObj.direction,cardObj.value);
            this.HandCards.addChildAt(card, index);

            cardObj.parent.removeChild(cardObj);
            this.drawCard = null;
        }


        /**
        * 摸牌(摸的牌只有一张)
        * @param direction   方向
        * @param value       牌值
        *
        */
        public addDrawCard(direction: LC.Directions, value: number) {
            this.drawCard =this._createHandCard(direction,value);
            this.AllCards.addChild(this.drawCard);
        }


        /**
        * 添加牌到出牌列表
        * @param direction   方向
        * @param value       牌值
        */
        private _addOutCard(direction, value) {
            let card = new LC.Card;
            card.scaleX = 0.75;
            card.scaleY = 0.75

            card.setCardTexture(direction, LC.CardState.Fall, value);
            this.OutCards.addChild(card);
        }


        /**
        * 添加组合牌到列表
        * @param direction   方向
        * @param deleteList  手牌中需要删除的牌的索引值的数组
        * @param combList    组合牌值
        * @type  type        组合类型
        */
        public addCombToAllCardList(direction: LC.Directions,deleteList:Array<number>,combList:Array<number>,type: CardCombType){
            for(let v of deleteList){
                this.HandCards.removeChildAt(v);
            }
            this._addComboCards(direction,combList,type);
        }


        /**
        * 创建手牌
        * @param direction   方向
        * @param value       牌值
        */
        private _createHandCard(direction, value) {
            let card = new LC.Card;
            card.setCardTexture(direction, LC.CardState.Stand, value);
            card.addEventListener(egret.TouchEvent.TOUCH_TAP, this._handCardHandler, this);
            return card;
        }

        
        /**
        * 触摸手牌的处理函数（此处只处理UI上的逻辑，其他的逻辑请在外部添加监听调用）
        * @param event   事件
        */
        private _handCardHandler(event: egret.Event) {
            let card = <LC.Card>event.currentTarget;

            //打印其深度
            let index = this.HandCards.getChildIndex(card);
            console.log("inner initHandCards" + index);

            this.OutACard(card);
        }


        /**
        * 添加组合牌
        * @param direction   方向
        * @param combList    牌值数组
        * @param type        组合类型
        */
        private _addComboCards(direction: LC.Directions, combList: Array<number>, type: CardCombType) {
            let combCards = new LC.ComboCards;
            combCards.bottom = 0;
            combCards.setCombCardsTexture(direction, combList, type);
            this.AllCards.addChildAt(combCards, 0);
        }


    }
}