/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayerController extends Controller {
		protected init(){
			super.init();
			this.SocketEventList = [
				// LC.SocketEvents.Rev100000,
				LC.SocketEvents.Rev100002,
			];
		}

		public text() {
			egret.setTimeout(() => {
				let js = { id: 1 };
				Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100000);
				Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100002);
			}, this, 1000);

		}


		private on_100000_event(event: egret.Event) {
			console.log(this.TAG + " on_100000_event: " + event.data);
		}

		private on_100002_event(event: egret.Event) {
			console.log(this.TAG + " on_100002_event: " + event.data);
		}

	}
}