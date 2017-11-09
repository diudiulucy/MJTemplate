/**
 * 控制器（处理和后端的交互和纯游戏逻辑，不做UI处理，用派发器通知相应的界面来更新）
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Controller {
		protected TAG: string = "";

		public constructor() {
			this.TAG = egret.getQualifiedClassName(this);
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

		public onDestroy() {
			this.unRegisterSocket();
		}
	}
}