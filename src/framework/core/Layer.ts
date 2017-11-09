/**
 * 层级类,只处理UI上的逻辑(一个layer对应一个controller,处理和后端的交互)
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Layer extends eui.Component {
		private TAG: string = "";
		protected _ctrl: Controller;
		public constructor() {
			super();
			this.TAG = egret.getQualifiedClassName(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDestroy, this);

		}

		// 此方法仅在组件第一次添加到舞台时回调一次。
		protected createChildren(): void {
			super.createChildren();
		}

		public get Ctrl() {
			return this._ctrl;
		}

		public set Ctrl(ctrl: Controller) {
			this._ctrl = ctrl;
		}

		// 进行一些初始化的操作
		protected init(): void {
			// console.log(this.TAG + " init");	
			this.setOnTouchListener();
			this.registerCustomEvents();
		}

		// 触摸消息的注册全在这里操作
		protected setOnTouchListener() {
			console.log(this.TAG + " setOnTouchListener");
		}

		protected removeOnTouchListener() {
			console.log(this.TAG + " removeOnTouchListener");
		}

		protected registerCustomEvents() {
			// console.log(this.TAG + " registerCustomEvents");
		}

		protected unRegisterCustomEvents() {
			// console.log(this.TAG + " unRegisterCustomEvents");
		}

		// 进入层而且过渡动画结束时调用           
		public onEnterTransitionDidFinish() {

		}

		// 退出层而且开始过渡动画时调用       
		public onExitTransitionDidStart() {

		}

		//层对象被清除时调用
		protected onDestroy() {
			console.log(this.TAG + " onDestroy");
			this.removeOnTouchListener();
			this.unRegisterCustomEvents();
			this.Ctrl.onDestroy();
		}
	}
}