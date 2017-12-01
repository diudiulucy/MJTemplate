/**
 * 加入房间层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameResult extends Layer {
		protected _ctrl: JoinRoomController;
		private closeButton: eui.Button;
		// private group_label_number: eui.Group;
		// private group_number_btn: eui.Group;
		// private label_roomNo:eui.BitmapLabel;

		/**按钮列表 */
		private _numberBtns: Array<eui.Button> = [];

		public constructor() {
			super();
			this.skinName = "Skin.GameResult";
		}

		protected init(): void {
			super.init();
		

		}

		protected setOnTouchListener() {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			// this.group_number_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);

		}

		protected removeOnTouchListener() {
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
			// this.group_number_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				// CustomEvents.UPDATE_VIEW
			];
		}

		private _onCloseClick() {
			this.parent.removeChild(this);
		}
	
		protected watchData(){

		}

	}
}