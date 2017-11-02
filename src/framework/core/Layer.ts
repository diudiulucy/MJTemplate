/**
 * 层级类,只处理UI上的逻辑
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Layer extends eui.Component {
		private TAG: string = "";

		public constructor() {
			super();
		}

		// 此方法仅在组件第一次添加到舞台时回调一次。
		protected createChildren(): void {
			super.createChildren();
			this.init();
		}

		protected init(): void {
			this.TAG = egret.getQualifiedClassName(this);
			// console.log(this.TAG + " init");			
		}

		// 进入层时调用
		public onEnter() {

		}

		// 进入层而且过渡动画结束时调用           
		public onEnterTransitionDidFinish() {

		}

		// 退出层时调用     
		public onEixt() {

		}

		// 退出层而且开始过渡动画时调用       
		public onEixtTransitionDidStart() {

		}

		//层对象被清除时调用
		public cleanup() {

		}
	}
}