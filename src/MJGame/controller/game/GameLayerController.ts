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
				LC.SocketEvents.Send100100,
				LC.SocketEvents.Rev101107,
				LC.SocketEvents.Rev101106,
				LC.SocketEvents.Rev101004,
				LC.SocketEvents.Rev101005,
				LC.SocketEvents.Rev101008,
				LC.SocketEvents.Rev101002
			];
		}

		/**
		 *  玩家自己准备
		 */
		public onMySelfReady() {
			let obj = <Send100100>{};
			obj.user_id = UsersInfo.MySelf.user_id;
			obj.ready = 1;
			Socket.Instance.sendData(SocketEvents.Send100100, JSON.stringify(obj));
		}

		/**
		 *  玩家自己准备回调
		 */
		private on_100100_event(event: egret.Event) {
			console.log(this.TAG + " on_100100_event: " + event.data);
			let data = event.data;
			let obj = <Rev100100>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log("准备成功");
				UsersInfo.MySelf.status = LC.ReadyState.READY;
			} else {//fail

			}
		}

		/**
		 * 推送玩家进入房间
		 */
		private on_101107_event(event: egret.Event) {
			console.log(this.TAG + " on_101107_event: " + event.data);
			let data = event.data;
			let obj = <Rev101107>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log(`玩家id为${obj.info.user_id}进入房间`);
				let user = new User();

				for(let key in obj.info){
					user[key] = obj.info[key];	
				}

				UsersInfo.Instance.addUser(user);
				EventManager.getInstance().dispatchCustomEvent(CustomEvents.OtherPlayer_EnterROOM,{user:user});
			} else {//fail

			}
		}

		/**
		 * 推送玩家进入准备
		 */
		private on_101106_event(event: egret.Event){
			console.log(this.TAG + " on_101106_event: " + event.data);
			let data = event.data;
			let obj = <Rev101106>JSON.parse(data);
			if (obj.code == 200) {//success
				console.log(`玩家id为${obj.info.user_id}进入准备状态`);
				let user = UsersInfo.Instance.getUserById(obj.info.user_id);
				user.status = LC.ReadyState.READY;
			} else {//fail

			}
		}

		/**
		 * 推送定庄信息（摇骰子）
		 */
		private on_101004_event(event: egret.Event){
			console.log(this.TAG + " on_101004_event: " + event.data);
			let data = event.data;
			let obj = <Rev101004>JSON.parse(data);
			if (obj.code == 200) {//success
				let seat_id = obj.info.bank_seat_id;
				let user = UsersInfo.Instance.getUserBySeatID(seat_id);
				console.log(`客户端座位为${user.client_seatID}是庄家`);
				user.isBanker = true;
				DeskInfo.diceValue = obj.info.dice;
			} else {//fail

			}
		}


		/**
		 * 推送发牌消息
		 */
		private on_101005_event(event: egret.Event){
			console.log(this.TAG + " on_101005_event: " + event.data);
			let data = event.data;
			let obj = <Rev101005>JSON.parse(data);
			if (obj.code == 200) {//success
			
			} else {//fail

			}
		}

		/**
		 * 推送发牌补花
		 */
		private on_101008_event(event: egret.Event){
			console.log(this.TAG + " on_101008_event: " + event.data);
			let data = event.data;
			let obj = <Rev101008>JSON.parse(data);
			if (obj.code == 200) {//success
			
			} else {//fail

			}
		}

		/**
		 * 推送玩家摸牌
		 */
		private on_101002_event(event: egret.Event){
			console.log(this.TAG + " on_101002_event: " + event.data);
			let data = event.data;
			let obj = <Rev101002>JSON.parse(data);
			if (obj.code == 200) {//success
			
			} else {//fail

			}
		}

	}
}