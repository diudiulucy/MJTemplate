/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayerController extends Controller {

		protected registerSocket() {
			// EventManager.getInstance().register(LC.SocketEvents.Rev100000.toString(),this.on100000_event,this);
		}

		protected unRegisterSocket() {
			// EventManager.getInstance().unRegister(LC.SocketEvents.Rev100000.toString(),this.on100000_event,this);
		}

		public text() {
			console.log("test");

			let js = { id: 1 };
			Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100000);
		}


		private on100000_event(event:egret.Event){
			console.log("on100000_event: " + event.data);
		}



	}
}