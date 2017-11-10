/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class HallScene extends Scene {

        public hallLayer: LC.HallLayer;

		public constructor() {
			super();
		}

		protected init() {
			super.init();
			
            this.hallLayer = new LC.HallLayer();
			this.hallLayer.Ctrl = new LC.HallLayerController();
            this.addChild(this.hallLayer);
		}
	}
}