/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class LoginScene extends Scene {

        public loginLayer: LC.LoginLayer;

		public constructor() {
			super();
		}

		protected init() {
			super.init();
		
			this.loginLayer = new LC.LoginLayer();
			this.loginLayer.Ctrl = new LC.LoginLayerController();
            this.addChild(this.loginLayer);
		}
	}
}