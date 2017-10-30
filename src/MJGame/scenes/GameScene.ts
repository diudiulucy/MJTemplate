/**
 * 游戏场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameScene extends Scene {
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			console.log("GameScene.init");

            let gameLayer = new LC.gameLayer();
            this.addChild(gameLayer);
		}

	}
}