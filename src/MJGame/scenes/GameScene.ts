/**
 * 游戏场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameScene extends Scene {
		private gameLayer: LC.GameLayer;
		public constructor() {
			super();
			
		}

		protected init() {
			super.init();
			this.gameLayer = new LC.GameLayer();
			this.addChild(this.gameLayer);

			// ErrorCodeManager.Instance.init("error_txt");
			// console.log(ErrorCodeManager.Instance.getErrorCode(1001));
		}
	}
}