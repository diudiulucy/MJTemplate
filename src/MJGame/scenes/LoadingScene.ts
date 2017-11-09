/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class LoadingScene extends Scene {

        public loadingView: LC.LoadingLayer;

		public constructor() {
			super();
		}

		protected init() {
			super.init();
		
            this.loadingView = new LC.LoadingLayer();
			this.loadingView.Ctrl = new LC.LoadingLayerController();
            this.addChild(this.loadingView);
		}

		protected onDestroy(){
			super.onDestroy();
			this.removeChildren();
		}
	}
}