/**
 * 大厅的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class HallLayerController extends Controller {
		private timer: number;

		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor(){
			super();
		}
		
		protected init() {
			super.init();
			this.SocketEventList = [
				SocketEvents.Send100002,
				
			];
		}

		/**登录消息返回 */
		private on_100002_event(event: egret.Event) {
			console.log(this.TAG + " on_100002_event: ");
			let data = event.data;
			let obj = <Rev100002>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("登录游戏服务器成功");
				
			}else{//fail

			}
		}

		/**连接socket */
		public connectSocket() {
			Socket.Instance.startConnect(Config.SERVER_URL, this._onSocketConnect, this, this._onSocketClose);
		}

		/**socket连接成功*/
		private _onSocketConnect() {
			// console.log(this.TAG + " connenct socket success");
			//游戏服务器连接成功，发送登录请求
			this._wServerLogin();
			this.timer = egret.setInterval(this._sentHeart, this, 1800000);
		}

		/**socket连接关闭*/
		private _onSocketClose() {
			console.log(this.TAG + " onSocketClose");
			egret.clearInterval(this.timer);
		}

		/**发送心跳包*/
		private _sentHeart() {
			console.log("发送心跳");
			Socket.Instance.sendData(SocketEvents.Send100000, "");
		}

		/**发送登录游戏服务器*/
		private _wServerLogin() {
			let obj: Send100002 = <Send100002>{};
			obj.passwd = Config.MD5PASS;
			obj.user_id = UsersInfo.MySelf.user_id;
			Socket.Instance.sendData(SocketEvents.Send100002, JSON.stringify(obj));
		}

	}
}