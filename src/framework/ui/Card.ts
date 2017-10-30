/**
 * 麻将牌
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    /**
     * 方向（布局的方向，牌的方向）
     * 
     */
    export enum Directions {
        Up,
        Down,
        Left,
        Right
    }

    /**
     * 牌的内部皮肤状态(外部不关心此状态，只有此类用到)
     */
    enum CardSkinState {
        stand_up,
        stand_down,
        stand_left,
        stand_right,
        fall_up,
        fall_down,
        fall_left,
        fall_right,
        hide_v,
        hide_h
    }

    /**
     * 牌的状态
     */
    export enum CardState {
        Stand,   //站立
        Fall,    //倒牌
        Hide,    //扣牌
    }

    /**
    * 麻将类
    */
    export class Card extends eui.Component {
        //UI相关变量
        private fallRight: eui.Image;
        private fallLeft: eui.Image;
        private fallUp: eui.Image;
        private fallDown: eui.Image;
        private standDown: eui.Image;

        //card的可供访问的类属性
        public value:number;
        public direction:number;

        public constructor() {
            super();
            this.skinName = "Skin.Card";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**
         * @param direction     方向 Up,Down,Left,Right
         * @param cardState     牌的状态 Stand,Fall,Hide
         * @param value         牌的值
         */
        public setCardTexture(direction: LC.Directions, cardState: LC.CardState, value: number) {
            this.direction = direction;
            this.value = value;


            this._setCardSkinState(direction, cardState)
            //牌值纹理
            let source = RES.getRes(this._getValueImageURL(value));

            //未找到白鹭动态切换某个状态下的纹理的方法，暂且用多个Image对象的方法来切换其不同状态下的纹理
            this.fallRight.source = source;
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        }

        /**
         * @param value  牌值
         * @returns   string   牌值对应的纹理路径
         */
        private _getValueImageURL(value: number): string {
            return "tpm_card_big_" + value + "_png";
        }


        /**
         * 设置牌的内部皮肤状态
         * @param  direction  方向
         * @param  cardState  牌状态
         */
        private _setCardSkinState(direction: LC.Directions, cardState: LC.CardState) {
            let cardSkinState: CardSkinState;
            switch (cardState) {
                case LC.CardState.Stand:
                    cardSkinState = <CardSkinState>(CardSkinState.stand_up + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case LC.CardState.Fall:
                    cardSkinState = <CardSkinState>(CardSkinState.fall_up + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case LC.CardState.Hide:
                    if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                        this.currentState = CardSkinState[CardSkinState.hide_v];
                    } else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                        this.currentState = CardSkinState[CardSkinState.hide_h];
                    }
                    break;
            }

        }
    }
}