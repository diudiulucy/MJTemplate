/**
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    /**
     * 组合牌的布局状态
     */
    enum CardComboState {
        Horizontal,
        Vertical,
    }

    export enum CardCombType {
        Chi,        //吃
        Peng,       //碰
        MGang,      //明杠
        AnGang,     //暗杠
    }

    /**
    * 麻将组合类
    */
    export class ComboCards extends eui.Component {
        private cardH_0: LC.Card;
        private cardH_1: LC.Card;
        private cardH_2: LC.Card;
        private cardH_3: LC.Card;
        private cardV_0: LC.Card;
        private cardV_1: LC.Card;
        private cardV_2: LC.Card;
        private cardV_3: LC.Card;

        public constructor() {
            super();
            this.skinName = "Skin.ComboCards";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**
         * 设置组合牌的纹理
         */
        public setCombCardsTexture(direction: LC.Directions, cardList: Array<number>, type: CardCombType) {
            this._setComboState(direction);

            switch (type) {
                case CardCombType.Chi:
                case CardCombType.Peng:
                    this._setChiOrPeng(direction, cardList);
                    break;
                case CardCombType.MGang:
                    this._setMGang(direction, cardList);
                    break;
                case CardCombType.AnGang:
                    this._setAnGang(direction, cardList);
                    break
            }
        }

        /**
        *  设置吃碰牌型组合
        */
        private _setChiOrPeng(direction: LC.Directions, cardList: Array<number>) {
            if (cardList.length != 3) {
                console.log("ChiOrPeng card number error !");
            }

            this.cardH_3.visible = false;
            this.cardV_3.visible = false;
            this._setList(direction, cardList, <LC.CardState>(LC.CardState.fall_up + direction));
        }

        /**
        *  设置明杠组合
        */
        private _setMGang(direction: LC.Directions, cardList: Array<number>) {
            if (cardList.length != 4) {
                console.log("MGang card number error !");
            }
            this._setList(direction, cardList, <LC.CardState>(LC.CardState.fall_up + direction));
        }

        /**
       *  设置暗杠组合
       */
        private _setAnGang(direction: LC.Directions, cardList: Array<number>) {
            if (cardList.length != 4) {
                console.log("AnGang card number error !");
            }
            let state:LC.CardState;
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                state = LC.CardState.hide_v;
            } else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                state = LC.CardState.hide_h;
            }

            this._setList(direction, cardList, state);
            if (direction == LC.Directions.Down) {
                this.cardH_3.setCardTexture(<LC.CardState>(LC.CardState.fall_up + direction), cardList[3]);
            }
        }

        private _setList(direction: LC.Directions, cardList: Array<number>, state: LC.CardState) {
            for (let i = 0; i < cardList.length; i++) {
                this["cardH_" + i].setCardTexture(state, cardList[i]);
                this["cardV_" + i].setCardTexture(state, cardList[i]);
            }
        }

        private _setComboState(direction: LC.Directions) {
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                this.currentState = CardComboState[CardComboState.Horizontal];
            } else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                this.currentState = CardComboState[CardComboState.Vertical];
            }
        }

    }
}