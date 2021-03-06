/**
 * 单例类
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Single {
		//实例必须私有
		private static instance: any;

		//构造函数必须保护型才算真正的单例,这里子类要访问所以是保护类型，严格的得用私有
		protected constructor() {

		}

		/** 为方便提示，子类最好加入此接口
			 public static get Instance(): T {
			     return this.getInstance();
			 }
		*/
		protected static getInstance() {
			let clsName = egret.getQualifiedClassName(this);
			let cls = egret.getDefinitionByName(clsName);
			if (!this.instance) {

				this.instance = new cls();
			}
			return this.instance;
		}

	}
}