/**
 * 场景类(一个场景下可以加多个Layer或者其他的组件) 
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Scene extends eui.UILayer {
		private TAG: string = "";
		private _isRunning: boolean;
		public constructor() {
			super();
		}

		/**组件创建完毕*/
		protected createChildren(): void {
			super.createChildren();
			this._isRunning = true;
			this.TAG = egret.getQualifiedClassName(this);
			
			this.init();
		}

		public get isRunning(): boolean {
			return this._isRunning;
		}

		// 初始化场景时调用，需要覆盖
		protected init(): void {

			// console.log(this.TAG + " init");
		}

		// 进入层时调用
		public onEnter() {
			// console.log(this.TAG + " onEnter");
		}

		// 进入层而且过渡动画结束时调用           
		public onEnterTransitionDidFinish() {
			// console.log(this.TAG + " onEnterTransitionDidFinish");
			// egret.Tween.get(this).to({x:this.stage.width*1.5 }, 0, egret.Ease.backInOut).to({x:0 }, 600, egret.Ease.sineInOut);
		}

		// 退出层时调用     
		public onExit() {
			// console.log(this.TAG + " onExit");
		}

		// 退出层而且开始过渡动画时调用       
		public onEixtTransitionDidStart() {
			// console.log(this.TAG + " onEixtTransitionDidStart");
			// egret.Tween.get(this).to({x:-this.stage.width}, 0, egret.Ease.backInOut);
		}

		//层对象被清除时调用
		public cleanup() {
			// console.log(this.TAG + " cleanup");
		}
	}
}