/**
 * 麻将组合（只可被CardModLayout类调用）
 * @author lucywang
 * @date 2017/10/19
 */
module LC {

    /**
     * 组合牌的内部布局皮肤状态(外部不关心此状态，只有此类用到)
     */
    enum CardComboSkinState {
        Horizental,
        Vertical,
    }

    /**
     * 组合牌类型(这里还是保留此类型，将UI和协议分开，方便后期其他的麻将项目的开发)
     */
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
        //上下方向的组合牌
        private cardH_0: LC.Card;
        private cardH_1: LC.Card;
        private cardH_2: LC.Card;
        private cardH_3: LC.Card;
        //左右方向的组合牌
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
         * @param direction   方向
         * @param cardList    牌值数组
         * @param type        组合类型
         */
        public setCombCardsTexture(direction: LC.Directions, cardList: Array<number>, type: CardCombType) {
            this._setComboSkinState(direction);

            if (direction == LC.Directions.Down) {
                this.scaleX = this.scaleY = 1.47;
            }

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
         * 判断是否是值为cardValue的碰组合
         * @param cardValue 牌值
         */
        private _isPengComb(cardValue: number): boolean {
            let result = false;
            for (let i = 0; i < 3; i++) {
                if ((<LC.Card>this["cardH_" + i]).value != cardValue || (<LC.Card>this["cardV_" + i]).value != cardValue) return false;
            }
            return true;
        }

        public changBuGang(direction: LC.Directions, cardValue: number) {
            if (this._isPengComb(cardValue)) {
                this.cardH_3.visible = true;
                this.cardV_3.visible = true;
                this.cardH_3.setCardTexture(direction, LC.CardState.Fall, cardValue);
                this.cardV_3.setCardTexture(direction, LC.CardState.Fall, cardValue);
            }
        }

        /**
         *  设置吃碰牌型组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setChiOrPeng(direction: LC.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 3, "ChiOrPeng card number error !");
            this.cardH_3.visible = false;
            this.cardV_3.visible = false;
            this._setList(direction, LC.CardState.Fall, cardList);
        }



        /**
         *  设置明杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setMGang(direction: LC.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 4, "MGang card number error !");
            this._setList(direction, LC.CardState.Fall, cardList);
        }



        /**
         *  设置暗杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        private _setAnGang(direction: LC.Directions, cardList: Array<number>) {
            console.assert(cardList.length == 4, "AnGang card number error !");
            this._setList(direction, LC.CardState.Hide, cardList);

            if (direction == LC.Directions.Down) {//自己的牌需要显示一张自己可见，其他的人不用显示
                (<LC.Card>this.cardH_3).setCardTexture(direction, LC.CardState.Fall, cardList[3]);
            }
        }



        /**
         *  设置牌的纹理
         * @param direction   方向
         * @param cardState   牌的状态 Stand,Fall,Hide
         * @param cardList    牌值数组
         */
        private _setList(direction: LC.Directions, state: LC.CardState, cardList: Array<number>) {
            for (let i = 0; i < cardList.length; i++) {
                //白鹭不同状态没办法切换纹理，所以用了两套
                (<LC.Card>this["cardH_" + i]).setCardTexture(direction, state, cardList[i]);
                (<LC.Card>this["cardV_" + i]).setCardTexture(direction, state, cardList[i]);
            }
        }



        /**
         *  设置组合牌的皮肤状态
         * @param  direction  方向
         */
        private _setComboSkinState(direction: LC.Directions) {
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                this.currentState = CardComboSkinState[CardComboSkinState.Horizental];
            }
            else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                this.currentState = CardComboSkinState[CardComboSkinState.Vertical];
            }
        }


    }
}