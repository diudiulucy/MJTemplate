/**
 * 加载层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class LoadingLayerController extends Controller{
		protected init(){
			super.init();
			this.SocketEventList = [
				LC.SocketEvents.Rev100000,
				// LC.SocketEvents.Rev100002,
			];
		}

		private on_100000_event(event: egret.Event) {
			console.log(this.TAG + " on_100000_event: " + event.data);
		}
	}
}