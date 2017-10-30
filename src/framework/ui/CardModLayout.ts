/**
 * @author lucywang
 * @date 2017/10/23
 */
module LC {

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
    export class CardModLayout extends eui.Component {
        public AllCards: eui.Group;
        public HandCards: eui.Group;
        public OutCards: eui.Group;

        public constructor() {
            super();
            this.skinName = "Skin.CardModLayout";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

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
        public initHandCards(direction: LC.Directions, handCardList: Array<number>, drawCardValue?: number) {
            this.currentState = LC.Directions[direction];

            let drawCard = drawCardValue && this.addDrawCard(direction, drawCardValue);

            for (let i = 0; i < handCardList.length; i++) {
                let card = new LC.Card;
                card.setCardTexture(direction, LC.CardState.Stand, handCardList[i]);
                this.HandCards.addChild(card);

                direction == LC.Directions.Down && card.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    console.log(i);
                    if (this.HandCards.numChildren > 1) {
                        this.HandCards.removeChild(card);
                        this.addOutCards(direction, handCardList[i]);
                        
                        drawCard && this.addDrawCardAt(direction, drawCard, 4);
                    }

                }, this);
            }


        }


        /**
        * 将摸的牌插入手牌list
        * @param direction   方向
        * @param value       牌值
        * @param index       索引
        */
        public addDrawCardAt(direction: LC.Directions, cardObj: LC.Card, index: number) {
            if(!cardObj){
                console.log("没有摸牌对象");
                return;
            }

            let card = this.AllCards.removeChild(cardObj);
            this.HandCards.addChildAt(card,index);
        }


        /**
        * 摸牌
        * @param direction   方向
        * @param value       牌值
        *
        */
        public addDrawCard(direction: LC.Directions, value: number) {
            let drawCard = new LC.Card();
            drawCard.setCardTexture(direction, LC.CardState.Stand, value);
            drawCard.bottom = 0;
            this.AllCards.addChild(drawCard);
            return drawCard;
        }


        /**
        * 出牌
        * 
        */
        public addOutCards(direction, value) {
            let card = new LC.Card;
            card.scaleX = 0.75;
            card.scaleY = 0.75

            card.setCardTexture(direction, LC.CardState.Fall, value);
            this.OutCards.addChild(card);
        }



        /**
        * 添加组合牌
        * @param direction   方向
        * @param combList    牌值数组
        * @param type        组合类型
        */
        public addComboCards(direction: LC.Directions, combList: Array<number>, type: CardCombType) {
            let combCards = new LC.ComboCards;
            combCards.bottom = 0;
            combCards.setCombCardsTexture(direction, combList, type);
            this.AllCards.addChild(combCards);
        }


    }
}