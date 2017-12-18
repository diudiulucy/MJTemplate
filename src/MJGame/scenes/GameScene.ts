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
			this.gameLayer.Ctrl = new GameLayerController();
			this.addChild(this.gameLayer);

			 
			// Tips.show(ErrorCodeManager.Instance.getErrorCode(902));
		}
	}
}