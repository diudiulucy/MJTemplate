/**
 * 登录层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    export class LoginLayer extends Layer {
        protected _ctrl:LoginLayerController;
        private edit_name: eui.EditableText;
        private edit_psw: eui.EditableText;
        private btn_login: eui.Button;

        public constructor() {
            super();
            this.skinName = "Skin.LoginLayer";
        }

        protected init(): void {
            super.init();

        }

        protected setOnTouchListener() {
            this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        }

        protected removeOnTouchListener() {
            this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [
                CustomEvents.UPDATE_VIEW
            ];
        }

        private onLoginClick(){
            let js = {user: this.edit_name.text,password:this.edit_psw.text};
            this._ctrl.sendDebugLoginReq(js);
        }

        private ui_updateView() {
            console.log(this.TAG + "updateView");
        }
    }
}