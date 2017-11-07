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
			console.log(this.TAG + " created");
		}

	}
}