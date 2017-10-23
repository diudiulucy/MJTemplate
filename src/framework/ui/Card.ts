/**
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    /**
     * 牌的状态
     */
    export enum CardState {
        stand_up,
        "stand_down",
        "stand_left",
        "stand_right",
        "fall_down",
        "fall_up",
        "fall_left",
        "fall_right",
        "hide_v",
        "hide_h"
    }


    /**
    * 麻将类
    */
    export class Card extends eui.Component {
        public fallRight: eui.Image;
        public fallLeft: eui.Image;
        public fallUp: eui.Image;
        public fallDown: eui.Image;
        public standDown: eui.Image;

        public constructor() {
            super();
            this.skinName = "Skin.Card";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        public setCardTexture(state: CardState, value: string) {

            //this.currentState 当前的状态，根据当前的状态显示不同的皮肤
            this.currentState = LC.CardState[state];//取出key

            //牌值纹理
            let source = RES.getRes(this.getImageURL(value));

            this.fallRight.source = source;
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        }

        public getImageURL(value: string): string {
            return "tpm_card_big_" + value + "_png";
        }

    }
}