/**
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

        public constructor() {
            super();
            this.skinName = "Skin.CardModLayout";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        // public setAllCardsConfig(direction: LC.Directions) {

        // }


        // public initView(direction: LC.Directions, handCardList: Array<number>) {


        //     this.currentState = LC.Directions[direction];

        //     //手牌
        //     for (let i = 0; i < handCardList.length; i++) {
        //         let card = new LC.Card;
        //         // card.setCardTexture(this._handCardState[direction], handCardList[i]);
        //         card.setCardTexture(LC.CardState.stand_up, handCardList[i]);
        //         this.HandCards.addChild(card);
        //         //  this._childAddToHandCards();
        //     }

        //     //组合牌
        //     for (let i = 0; i < 2; i++) {
        //         let combCards = new LC.ComboCards;
        //         combCards.bottom = 0;
        //         this.AllCards.addChild(combCards);
        //     }

        //     // this._childAddToHandCards();

        //     this.AllCards.setChildIndex(this.HandCards, 10);

        //     //摸的牌
        //     let drawCard = new LC.Card
        //     drawCard.setCardTexture(LC.CardState.stand_down, 38);
        //     drawCard.bottom = 0;
        //     this.AllCards.addChild(drawCard);

        //     //打出的牌
        //     for (let i = 0; i < handCardList.length; i++) {
        //         let card = new LC.Card;
        //         card.scaleX = 0.75;
        //         card.scaleY = 0.75
        //         card.setCardTexture(LC.CardState.fall_down, handCardList[i]);
        //         this.OutCards.addChild(card);
        //     }
        // }
    }
}