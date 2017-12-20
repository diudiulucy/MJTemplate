/**
 * 加载场景
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class HallScene extends Scene {
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			
            let hallLayer = new LC.HallLayer();
			hallLayer.Ctrl = new LC.HallLayerController();
            this.addChild(hallLayer);
		}


	}
}