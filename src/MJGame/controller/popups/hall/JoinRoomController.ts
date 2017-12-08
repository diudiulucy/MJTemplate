/**
 * 加入房间的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class JoinRoomController extends Controller {

		//加入构造器，代码才可以跳转到此类，否则直接跳到父类
		public constructor() {
			super();
		}

		protected init() {
			super.init();
			this.SocketEventList = [
				LC.SocketEvents.Send100102,

			];
		}

		/**加入好友房间返回 */
		private on_100102_event(event: egret.Event) {
			console.log(this.TAG + " on_100102_event: ");
			let data = event.data;
			let obj = <Rev100102>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("加入好友房间成功");
				//记录桌子信息
				DeskInfo.deskID = obj.info.desk_id;
				UsersInfo.Instance.addManyUsers(obj.info.seat_info);
				let gameScene = new LC.GameScene();
				SceneManager.Instance.replaceScene(gameScene);

			} else {//fail
				let errorInfo = JSON.parse(data);
				Tips.show(ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
			}
		}

		/**
		 * 加入好友房间
		 */
		public joinFriendRoom(roomNo: number) {
			let obj = <Send100102>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.desk_id = roomNo;
			Socket.Instance.sendData(SocketEvents.Send100102, JSON.stringify(obj));
		}


	}
}