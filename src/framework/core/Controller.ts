/**
 * 控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Controller {
		private TAG: string = "";

		public constructor() {
			this.TAG = egret.getQualifiedClassName(this);
			// console.log(this.TAG + " created");
			this.init();
		}

		// 进行一些初始化的操作
		protected init() {
			//监听协议
			this.registerSocket();
		}


		//监听协议的接口
		protected registerSocket() {

		}
		
		protected unRegisterSocket(){

		}

		protected destroy() {
			this.unRegisterSocket();
		}
	}
}