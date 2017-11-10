/**
 * 大厅层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    export class HallLayer extends Layer {
        protected _ctrl:HallLayerController;
        public constructor() {
            super();
            this.skinName = "Skin.HallLayer";
        }

        protected init(): void {
            super.init();
            this._ctrl.connectSocket();
        }

        protected setOnTouchListener() {
            // this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        }

        protected removeOnTouchListener() {
            // this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [
               
            ];
        }

  
    }
}