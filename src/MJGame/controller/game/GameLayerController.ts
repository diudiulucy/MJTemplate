/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayerController extends Controller {

		protected registerSocket() {

		}

		protected unRegisterSocket() {

		}

		public text() {
			console.log("test");

			let js = { id: 1 };
			Socket.Instance.sendData(JSON.stringify(js), LC.SocketEvents.Rev100000);
		}
	}
}