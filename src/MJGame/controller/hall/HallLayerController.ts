/**
 * 大厅的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class HallLayerController extends Controller {
		protected init() {
			super.init();
			this.SocketEventList = [
				SocketEvents.Send100002,
				// // LC.SocketEvents.Rev100002,
			];
		}

		private on_100002_event(event: egret.Event) {
			let data = event.data;
			console.log(this.TAG + " on_100002_event: " + event.data);
			let obj = JSON.parse(data);
			if(data.code = 200){
				 console.log("登录成功,是否断线重连:" + obj.info.reconnect);
			}
		}

		public connectSocket() {
			Socket.Instance.startConnect(Config.SERVER_URL, this.onSocketConnect, this);
		}

		/**socket连接成功*/
		private onSocketConnect() {
			console.log(this.TAG + " connenct socket success");
			//游戏服务器连接成功，发送登录请求
			this._wServerLogin();
		}

		/**发送登录游戏服务器*/
		private _wServerLogin(){
			let js = {userid:"9123",pass:Config.MD5PASS};
			Socket.Instance.sendData(JSON.stringify(js),SocketEvents.Send100002);
		}

	}
}