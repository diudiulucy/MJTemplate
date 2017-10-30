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
            this.addChild(this.loadingView);
		}

		

	}
}