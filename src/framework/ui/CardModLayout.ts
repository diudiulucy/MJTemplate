/**
 * @author lucywang
 * @date 2017/10/23
 */
module LC {
   
    export class CombData{
        CombValue:[number,number,number,number];
    }

    export interface CardMod {
        handCardList?: Array<number>;
        outCardList?:  Array<number>;
        combList?:     Array<CombData>;
    }

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

        public initView(direction: LC.Directions, handCardList: Array<number>,data:CardMod) {
            this.currentState = LC.Directions[direction];
            //手牌
            for (let i = 0; i < data.handCardList.length; i++) {
                let card = new LC.Card;
                card.setCardTexture(direction, LC.CardState.Stand, handCardList[i]);
                this.HandCards.addChild(card);

            }

            let combList = [
                22,
                22,
                22,
                22,
                // 23,
                // 24,
            ];

            //组合牌
            for (let i = 0; i < 3; i++) {
                let combCards = new LC.ComboCards;
                combCards.bottom = 0;
                combCards.setCombCardsTexture(direction, combList, LC.CardCombType.AnGang);
                this.AllCards.addChild(combCards);
            }

            // this._childAddToHandCards();

            this.AllCards.setChildIndex(this.HandCards, 10);

            //摸的牌
            let drawCard = new LC.Card();
            drawCard.setCardTexture(direction, LC.CardState.Stand, 38);
            // drawCard.setCardTexture(LC.CardSkinState.stand_up, 38);
            drawCard.bottom = 0;
            this.AllCards.addChild(drawCard);

            //打出的牌
            for (let i = 0; i < data.outCardList.length; i++) {
                let card = new LC.Card;
                card.scaleX = 0.75;
                card.scaleY = 0.75

                card.setCardTexture(direction, LC.CardState.Fall, data.outCardList[i]);
                this.OutCards.addChild(card);
            }
        }
    }
}