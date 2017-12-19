/**
 * 登录层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    export class LoginLayer extends Layer {
        protected _ctrl: LoginLayerController;
        private edit_name: eui.EditableText;
        private edit_psw: eui.EditableText;
        private btn_login: eui.Button;

        public constructor() {
            super();
            this.skinName = "Skin.LoginLayer";
            this.percentWidth = 100;
            this.percentHeight = 100;
        }

        protected init(): void {
            super.init();

        }

        protected setOnTouchListener() {
            this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginClick, this);
        }

        protected removeOnTouchListener() {
            this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoginClick, this);
        }

        protected registerCustomEvents() {
            this.UIEventList = [

            ];
        }

        private onLoginClick() {
            //   LC.Tips.show("\u7528\u6237\u5728\u5176\u4ed6\u684c\u5b50\u4e2d");
            this._ctrl.sendDebugLoginReq(this.edit_name.text, this.edit_psw.text);
            // LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(1001));
        }


    }
}