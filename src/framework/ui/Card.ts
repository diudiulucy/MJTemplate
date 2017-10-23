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
    * 麻将类
    */
    export class Card extends eui.Component {
        private fallRight: eui.Image;
        private fallLeft: eui.Image;
        private fallUp: eui.Image;
        private fallDown: eui.Image;
        private standDown: eui.Image;

        public constructor() {
            super();
            this.skinName = "Skin.Card";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**
         * @param state  牌的状态
         * @param value  牌的值
         */
        public setCardTexture(state: CardState, value: number) {
            this.currentState = LC.CardState[state];//取出key this.currentState 当前的状态，根据当前的状态显示不同的皮肤，在EXML里进行布局和位置的修改，方便后期维护
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
         * @returns 牌值对应的纹理路径
         */
        private _getValueImageURL(value: number): string {
            return "tpm_card_big_" + value + "_png";
        }

    }
}