/**
 * 单例类
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Single {
		//实例必须私有
		private static instance:any;

		//构造函数必须保护型才算真正的单例
		protected  constructor() {

		}

		public static getInstance(){
            if (!this.instance) {
				let clsName = egret.getQualifiedClassName(this);
				console.log(clsName);

				let cls = egret.getDefinitionByName(clsName);
                this.instance = new cls();
            }
			return this.instance;
        }

	}
}