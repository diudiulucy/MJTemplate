/**
 * 转菊花等待
 * @author lucywang
 * @date 2017/10/19
 */

module LC {
	class Waiting extends Layer {
		private waitImg: eui.Image;
		private bg: egret.Sprite = new egret.Sprite();
		public constructor() {
			super();
		}

		protected init(): void {
			super.init();
			this.width = egret.MainContext.instance.stage.stageWidth;
			this.height = egret.MainContext.instance.stage.stageHeight;

			this.bg.graphics.clear();
			this.bg.graphics.beginFill(0x000000, 0.3);
			this.bg.graphics.drawRect(0, 0, this.width, this.height);
			this.bg.graphics.endFill();
			this.addChild(this.bg);

			this.waitImg = new eui.Image();
			this.waitImg.source = RES.getRes("loadingCircle_png");
			this.addChild(this.waitImg);
			this.waitImg.horizontalCenter = 0;
			this.waitImg.verticalCenter = 0;

			EffectUtils.rotationEffect(this.waitImg, 1000);
		}
	}

	export class WaitingManager extends Single {
		private waiting: Waiting = new Waiting();
		//为方便提示，加入此接口
		public static get Instance(): WaitingManager {
			return this.getInstance();
		}

		public show() {
			if (this.waiting == null) {
				this.waiting = new Waiting();
			}

			LC.SceneManager.Instance.runningScene.addChild(this.waiting);
		}

		public hide() {
			if (LC.SceneManager.Instance.runningScene.contains(this.waiting)) {
				LC.SceneManager.Instance.runningScene.removeChild(this.waiting);
				this.waiting = null;
			}
		}
	}
}