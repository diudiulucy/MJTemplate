/**
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    /**
     * 麻将牌
     */
    export class Card extends eui.Component {
        public Card: eui.Group;
        public img_bg: eui.Image;
        public img_cardValue: eui.Image;

        //this.currentState 当前的状态，根据当前的状态显示不同的皮肤

        public constructor() {
            super();
            this.skinName = "Skin.Card";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
  
        public setOutLineSkin(direction: string,state: string) { // stand,fall,hide
            this.currentState = state + "_"+  direction;
        }

    }
}