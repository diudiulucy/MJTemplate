/**
 * 游戏层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayer extends Layer {
		protected _ctrl: GameLayerController;
		public mod1: LC.CardModLayout;
		public mod2: LC.CardModLayout;
		public mod3: LC.CardModLayout;
		public mod4: LC.CardModLayout;

		public btn1: eui.Button;
		public btn2: eui.Button;
		public btn3: eui.Button;
		public btn4: eui.Button;

		private btn_ready: eui.Button;
		private roomNo: eui.Label;

		//users
		private user_down: UserHead;
		private user_right: UserHead;
		private user_up: UserHead;
		private user_left: UserHead;

		private disc:LC.Disc;

		/**
		 * 四人座位的配置位置
		 */
		private FourPlayers: Array<UserHead>;

		/**
		 * 三人座位的位置
		 */
		private ThreePlayers: Array<UserHead>;

		/**
		 * 二人座位的位置
		 */
		private TwoPlayers: Array<UserHead>;

		private seatsUI: Array<UserHead>;

		public constructor() {
			super();
			this.skinName = "Skin.GameLayer";
		}

		protected init() {
			super.init();
			console.log("进入游戏层");
			// console.log(UsersInfo.Instance.MySelf.user_id);
			// this.user_down.UserModel = UsersInfo.Instance.MySelf;
			// this._initMode(LC.Directions.Down, this.mod1);
			// this._initMode(LC.Directions.Up, this.mod2);
			// this._initMode(LC.Directions.Left, this.mod3);
			// this._initMode(LC.Directions.Right, this.mod4);
		
			this._initLayoutSeats();//布置座位
			this._initUsersSeats();//玩家就座
		}

	
		/**
		 * 配置玩家的座位，人数决定布局
		 */
		private _initLayoutSeats() {
			this._initConfigSeats();//初始化座位配置
			this._hideOrShowAllSeats(false, this.FourPlayers);//隐藏所有座位
			this._chooseConfigSeates(LC.Config.MaxPlayerCount);// 根据人数选好座位配置
			this._hideOrShowAllSeats(true, this.seatsUI);//显示需要的座位
		}

		/**
		 * 配好的人数及位置
		 */
		private _initConfigSeats() {
			this.FourPlayers = [
				this.user_down,
				this.user_right,
				this.user_up,
				this.user_left
			]

			this.ThreePlayers = [
				this.user_down,
				this.user_right,
				this.user_left
			]

			this.TwoPlayers = [
				this.user_down,
				this.user_up,
			]

		}

		/**
		 * 根据人数选好座位配置
		 */
		private _chooseConfigSeates(maxPlayerCount:number) {
			switch (maxPlayerCount) {
				case 2:
					this.seatsUI = this.TwoPlayers;
					break;
				case 3:
					this.seatsUI = this.ThreePlayers;
					break;
				case 4:
					this.seatsUI = this.FourPlayers;
					break;
			}
		}


		/**
		 * @param isShow  是否显示
		 * @param seats   座位UI数组
		 */
		private _hideOrShowAllSeats(isShow: boolean, seats: Array<UserHead>) {
			for (let userObj of seats) {
				userObj.visible = isShow;
			}
		}


		/**
		 * 根据用户的客户端座位号就座
		 */
		private _initUsersSeats() {
			for (let key in UsersInfo.Instance.UsersList) {
				let user = <User>UsersInfo.Instance.UsersList[key];
				// user.UserUI = this.seatsUI[user.client_seatID];
				this.seatsUI[user.client_seatID].UserModel = user;
			}
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				// CustomEvents.UPDATE_VIEW
				CustomEvents.OtherPlayer_EnterROOM
			];
		}

		// private ui_updateView() {
		//     console.log(this.TAG + " updateView ");
		// 	// this.btn1.label = "updateView";
		// }

		protected setOnTouchListener() {
			// this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
		}

		protected removeOnTouchListener() {
			// this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			// this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn_ready.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
		}


		protected watchData() {
			eui.Binding.bindHandler(DeskInfo, ["deskID"], this._roomNoChange, this);
	
		}

		/**
		 * 房间号有变化时调用
		 */
		private _roomNoChange(value: any): void {
			this.roomNo.text = `房间号：${value.toString()}`;
		}

		/**
		 * 绑定用户模型在userHead上
		 */
		private ui_otherPlayerEnterRoom(event: egret.Event){
			console.log(this.TAG + " ui_otherPlayerEnterRoom: " + JSON.stringify(event.data));
			let user = event.data.user;
			// user.UserUI = this.seatsUI[user.client_seatID];
			this.seatsUI[user.client_seatID].UserModel = user;
		}

		/**
		 * 准备按钮点击
		 */
		private _onReadyBtnClick() {
			this.btn_ready.visible = false;
			this._ctrl.onMySelfReady();
		}

		public callback(event: egret.Event) {

			EventManager.getInstance().dispatchCustomEvent(CustomEvents.UPDATE_VIEW, { lucy: "a" });
			let mod = this.mod2;
			let btn = event.currentTarget;
			let direction = LC.Directions.Up
			if (btn == this.btn1) {
				mod.addCombToAllCardList(direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
			} else if (btn == this.btn2) {
				mod.addCombToAllCardList(direction, [0, 1], [22, 22, 22], LC.CardCombType.Peng);
			} else if (btn == this.btn3) {
				mod.addCombToAllCardList(direction, [0, 1, 2], [22, 22, 22, 22], LC.CardCombType.MGang);
			} else if (btn == this.btn4) {
				mod.addCombToAllCardList(direction, [0, 1, 2, 3], [22, 22, 22, 22], LC.CardCombType.AnGang);
			}
		}


		private _initMode(direction, cardMod: LC.CardModLayout) {
			let handCardList = [
				17,
				18,
				19,
				20,

				39,
				40,

				49,
				49,
				50,
				50,
				51,
				51,

				53,
			];

			let outCardList = [
				39,
				40,
				49,
				50,
				49,
				50,
				51
			]

			// cardMod.initView(direction, handCardList, {
			//     handCardList: handCardList,
			//     outCardList: outCardList,
			// });

			// if (direction == LC.Directions.Down) {
			cardMod.initAllCards(direction, handCardList, 25);
			for (let i = 0; i < cardMod.HandCards.numElements; i++) {
				let card = cardMod.HandCards.getChildAt(i);
				card.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

					//对数据重排序之后，更新视图
					cardMod.moveDrawCardToHandList(cardMod.drawCard, 8);
				}, this);
			}
			// } else {
			// cardMod.initHandCards(direction, handCardList);
			// }
			// this.addChild(cardMod);
		}
	}
}