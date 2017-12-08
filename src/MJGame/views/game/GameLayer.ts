/**
 * 游戏层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayer extends Layer {
		//控制器
		protected _ctrl: GameLayerController;

		//四个方向的模块
		private Down: eui.Group;
		private Left: eui.Group;
		private Up: eui.Group;
		private Right: eui.Group;

		//麻将模块
		private mod_down: LC.CardModLayout;
		private mod_right: LC.CardModLayout;
		private mod_up: LC.CardModLayout;
		private mod_left: LC.CardModLayout;

		//房间号
		private roomNo: eui.Label;
		//中间的风向盘
		private disc: LC.Disc;
		//准备按钮
		private btn_ready: eui.Button;
		private btn_cancel: eui.Button;
		//操作吃碰胡杠的操作器
		private actHandler: LC.ActHandler;
		//出牌指针
		private _cardPointer: LC.CardPointer;
		//记录当前出的牌的对象
		private _currentOutCardContainer: eui.Group;

		/**
		 * 测试相关按钮
		 */
		private cardSelect_Panel: eui.Panel;
		private card_Group: eui.Group;
		private dealCard: eui.Button;
		private changeCard: eui.Button;
		private confirmNextCard: eui.Button;
		private selectTargetCard: eui.Button;
		private selectSourceCard: eui.Button;
		private sure: eui.Button;

		private _sourceCardList: Array<number> = [];
		private _targetCardList: Array<number> = [];
		private _isSourceCard: boolean = true;

		/**
		 * 四人座位的配置位置
		 */
		private FourPlayers: Array<eui.Group>;

		/**
		 * 三人座位的位置
		 */
		private ThreePlayers: Array<eui.Group>;

		/**
		 * 二人座位的位置
		 */
		private TwoPlayers: Array<eui.Group>;

		private seatsUI: Array<eui.Group>;


		public constructor() {
			super();
			this.skinName = "Skin.GameLayer";
		}

		protected init() {
			this._initCardModDirection();//初始化牌布局的方向
			this._initLayoutSeats();//布置座位
			super.init(); // watchdata得在上面初始化之后才能执行 所以后执行父类


			this._initTestPanel();//初始化测试面板
			this._initCardPointer();//初始化出牌指针
			this._initUsersSeats();//玩家就座

			// this.mod_up.initHandCards(this.mod_up.direction, [25, 25, 34, 38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_down.initHandCards(this.mod_down.direction, [25, 25, 34, 38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_right.initHandCards(this.mod_right.direction, [25, 25, 34, 38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_left.initHandCards(this.mod_left.direction, [25, 25, 34, 38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);


			// this.mod_up.addCombToAllCardList(this.mod_up.direction, [25, 25, 34], [25, 25, 25, 25], CardCombType.MGang);
			// this.mod_down.addCombToAllCardList(this.mod_down.direction, [25, 25, 34], [25, 25, 25, 25], CardCombType.MGang);
			// this.mod_right.addCombToAllCardList(this.mod_right.direction, [25, 25, 34], [25, 25, 25, 25], CardCombType.MGang);
			// this.mod_left.addCombToAllCardList(this.mod_left.direction, [25, 25, 34], [25, 25, 25, 25], CardCombType.MGang);


			// this.mod_up.addDrawCard(this.mod_up.direction, 33,LC.CardState.Stand);
			// this.mod_down.addDrawCard(this.mod_down.direction, 33,LC.CardState.Stand);
			// this.mod_right.addDrawCard(this.mod_right.direction, 33,LC.CardState.Stand);
			// this.mod_left.addDrawCard(this.mod_left.direction, 33,LC.CardState.Stand);


			// this.mod_up.fallDownAllHandCards(this.mod_up.direction, [38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_down.fallDownAllHandCards(this.mod_down.direction, [38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_right.fallDownAllHandCards(this.mod_right.direction, [38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);
			// this.mod_left.fallDownAllHandCards(this.mod_left.direction, [38, 38, 51, 52, 35, 36, 37, 41, 41, 57]);

			console.log("进入游戏层");
		}

		/**
		 * 初始化出牌指针
		 */
		private _initCardPointer() {
			this._cardPointer = new LC.CardPointer();
			this._cardPointer.visible = false;
			this.actHandler.Ctrl = new LC.ActHandlerController();
		}

		/**
		 * 初始化测试面板
		 */
		private _initTestPanel() {
			this.cardSelect_Panel.visible = false;
			this._addShowCard(17, 25);
			this._addShowCard(33, 41);
			this._addShowCard(49, 57);
			this._addShowCard(65, 68);
			this._addShowCard(81, 83);
		}


		private _addShowCard(start: number, end: number, ) {
			let group = this.card_Group;

			for (let i = start; i <= end; i++) {
				let container = new eui.Group();
				group.addChild(container);

				let card = new LC.Card();
				card.touchEnabled = false;
				card.scaleX = card.scaleY = 0.5;
				card.setCardTexture(LC.Directions.Down, LC.CardState.Stand, i);
				container.addChild(card);

				let toggle = new eui.ToggleButton();
				toggle.width = 43;
				toggle.height = 62;
				toggle.alpha = 0;
				container.addChild(toggle);

				toggle.addEventListener(egret.Event.CHANGE, (e: egret.Event) => {
					var radioButton = <eui.ToggleButton>e.target;
					if (radioButton.selected) {
						card.alpha = 0.3;
						this._isSourceCard ? this._sourceCardList.push(card.value) : this._targetCardList.push(card.value);
					} else {
						card.alpha = 1;
						this._isSourceCard ? ArrayUtils.deleteByValue(this._sourceCardList, card.value) : ArrayUtils.deleteByValue(this._targetCardList, card.value);
					}
				}, this);
			}
		}


		private _resetTestCard() {
			let group = this.card_Group;
			for (let i = 0; i < group.numChildren; i++) {
				let container = <eui.Group>group.getChildAt(i);
				let card = <LC.Card>container.getChildAt(0);
				let toggle = <eui.ToggleButton>container.getChildAt(1);
				card.alpha = 1;
			}
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
				this.Down,
				this.Right,
				this.Up,
				this.Left
			]

			this.ThreePlayers = [
				this.Down,
				this.Right,
				this.Left
			]

			this.TwoPlayers = [
				this.Down,
				this.Up,
			]

		}

		/**
		 * 根据人数选好座位配置
		 */
		private _chooseConfigSeates(maxPlayerCount: number) {
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
		private _hideOrShowAllSeats(isShow: boolean, seats: Array<eui.Group>) {
			for (let userObj of seats) {
				userObj.getChildAt(0).visible = isShow;
			}
		}


		/**
		 * 根据用户的客户端座位号就座
		 */
		private _initUsersSeats() {
			for (let key in UsersInfo.Instance.UsersList) {
				let user = <User>UsersInfo.Instance.UsersList[key];
				(<UserHead>this.seatsUI[user.client_seatID].getChildAt(0)).UserModel = user;
			}
		}

		protected registerCustomEvents() {
			this.UIEventList = [
				CustomEvents.OtherPlayer_EnterROOM,
				CustomEvents.DealCard,
				CustomEvents.DrawCard,
				CustomEvents.BuHua_DealCard,
				CustomEvents.BuHua_GameCard,
				CustomEvents.CanAct,
				CustomEvents.AllUsersReady,
				CustomEvents.ACT_Aleady,
				LC.SelectCardComplete,
				CustomEvents.ChangeCard,
				CustomEvents.CheckOut,
				CustomEvents.GameOver
			];
		}

		protected setOnTouchListener() {
			this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
			this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);

			//测试相关
			this.dealCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.changeCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.confirmNextCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectTargetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectSourceCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this)
		}

		protected removeOnTouchListener() {
			this.btn_ready.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
			this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);

			//测试相关
			this.dealCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.changeCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.confirmNextCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectTargetCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.selectSourceCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
			this.cardSelect_Panel.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this)
		}


		protected watchData() {
			eui.Binding.bindHandler(DeskInfo, ["deskID"], this._roomNoChange, this);
			eui.Binding.bindHandler(DeskInfo, ["gameData"], this._gameDataChange, this);
			eui.Binding.bindHandler(UsersInfo.MySelf, ["status"], this._MySelfStatusChange, this);
		}

		/**
		 * 房间号有变化时调用
		 */
		private _roomNoChange(value: any): void {
			value && (this.roomNo.text = `房间号：${value.toString()}`);
		}

		private _MySelfStatusChange(value: any) {
			value && (value == UserState.UNREADY) ? this.btn_ready.visible = true : this.btn_ready.visible = false;
			value && (value == UserState.READY) ? this.btn_cancel.visible = true : this.btn_cancel.visible = false;
		}


		//断线重连的数据恢复
		private _gameDataChange(value: GameDataInfo) {
			if (!value) return;
			if (ArrayUtils.isEmptyObject(value)) return;
			DeskInfo.status = value.desk_info.status;
			this._recoverHandCards(value);
			this._recoverCombAndOutCards(value);
			//风向
			this._setDiscFeng();
			//剩余牌数
			DeskInfo.remain_count = value.desk_info.remain_cards;
			this._recoverBanker(value.desk_info.bank_seat_id);
			let timeoutId = egret.setTimeout(() => {
				this._recoverLightBright(value);//延点时间 不知道为啥被哪里隐藏了
				clearTimeout(timeoutId);
			}, this, 300);
			this._recoverDrawCard(value);
		}

		private _recoverLightBright(value: GameDataInfo) {
			let seatID = value.desk_info.cur_speaker_seat_id;
			let user = UsersInfo.Instance.getUserBySeatID(seatID);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			this.disc.lightBright(cardMod.direction);//倒计时在此接口加入

		}

		private _recoverDrawCard(value: GameDataInfo) {
			let seatID = value.desk_info.cur_speaker_seat_id;
			let user = UsersInfo.Instance.getUserBySeatID(seatID);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			value.player_info[seatID].last_card != 0 && cardMod.moveCardToDrawCard(cardMod.direction, value.player_info[seatID].last_card);
		}

		private _recoverCombAndOutCards(value: GameDataInfo) {
			//打出去的牌和吃碰杠的牌
			for (let out_card of value.out_cards_info) {
				//找到座位号
				let user = UsersInfo.Instance.getUserBySeatID(out_card.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
				let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象

				//出牌
				for (let key in out_card.chu) {
					let chuCard = out_card.chu[key];
					if (!chuCard.is_robbed) {
						if (value.desk_info.cur_speaker_seat_id == out_card.seat_id && Number(key) == out_card.chu.length - 1) {
							this._currentOutCardContainer = cardMod._addOutCard(cardMod.direction, chuCard.card, this._cardPointer);
						} else {
							cardMod._addOutCard(cardMod.direction, chuCard.card);
						}
					}
				}
				this._recoverCombCards(cardMod, out_card.against);
			}

		}


		/**
	 	 * 断线恢复手牌
		 */
		private _recoverHandCards(value: GameDataInfo) {
			for (let cardInfo of value.player_info) {
				let user = UsersInfo.Instance.getUserBySeatID(cardInfo.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
				let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
				cardMod.initHandCards(cardMod.direction, cardInfo.hand_card);
			}
		}

		/**
	 	 * 断线恢复庄家
		 */
		private _recoverBanker(seatID: number) {
			let user = UsersInfo.Instance.getUserBySeatID(seatID);
			console.log(`客户端座位为${user.client_seatID}是庄家`);
			user.isBanker = true;
		}

		/**
		 * 断线恢复组合牌
		 */
		private _recoverCombCards(cardMod: LC.CardModLayout, against: Array<AgainstInfo>) {
			//组合牌
			for (let combo of against) {
				let deleteList = [];
				let combList = [];
				switch (combo.type) {
					case LC.ACT.PENG:
						this._addCombArray(3, combList, combo.cards[0]);
						cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Peng);
						break;
					case LC.ACT.CHI:
						combList = combo.cards;
						cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Chi);
						break;
					case LC.ACT.DIAN_GANG:
					case LC.ACT.BU_GANG:
						this._addCombArray(4, combList, combo.cards[0]);//添加组合牌
						cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.MGang);
						break;
					case LC.ACT.AN_GANG:
						this._addCombArray(4, combList, combo.cards[0]);//添加组合牌
						cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.AnGang);
						break;
				}
			}
		}

		private _initCardModDirection() {
			this.mod_down.direction = Directions.Down;
			this.mod_right.direction = Directions.Right;
			this.mod_up.direction = Directions.Up;
			this.mod_left.direction = Directions.Left;
		}


		/**
		 * 所有玩家准备好
		 */
		private ui_allUsersReady(event: egret.Event) {
			this._setDiscFeng();
		}

		private _setDiscFeng() {
			let user = UsersInfo.Instance.getUserBySeatID(0);//找到服务器座位号为0的用户,0为东风
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//为0的用户座位的牌布局对象
			this.disc.setDongFengDirection(cardMod.direction);
		}

		/**
		 * 发牌
		 */
		private ui_dealCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.all_cards));
			let all_cards = event.data.all_cards;
			for (let key in all_cards) {
				let data = all_cards[key];
				let user = UsersInfo.Instance.getUserBySeatID(data.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
				user.status = UserState.PLAYING;
				let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
				cardMod.initHandCards(cardMod.direction, data.card_list);
			}

		}

		/**
		 * Test换牌
		 */
		private ui_changeCard(event: egret.Event) {
			console.log(this.TAG + " ui_changeCard: " + JSON.stringify(event.data.info));
			let data = event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(data.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.initHandCards(cardMod.direction, data.hand_card);
			if (data.hand_card.length == 14) {
				cardMod.removeDrawCard();
				cardMod.moveCardToDrawCard(cardMod.direction, data.hand_card[0]);//如果换来了14张牌，一张牌放到旁边
			}
		}

		/**
		 * 发牌补花
		 */
		private ui_buHuaDealCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
			let info = <AppliqueInfo>event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			console.log(`客户端座位号为${user.client_seatID}发牌补花`);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.appliqueCards(cardMod.direction, info.hua_card, info.bu_cards);
		}

		/**
		 * 游戏补花
		 */
		private ui_buHuaGameCard(event: egret.Event) {
			console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
			let info = <GameAppliqueInfo>event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);//找到座位号对应的用户，需要其客户端对应的座位号
			console.log(`客户端座位号为${user.client_seatID}游戏补花`);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			cardMod.addDrawCard(cardMod.direction, info.hua_card_list[0], LC.CardState.Stand);
		}

		/**
		 * 绑定用户模型在userHead上
		 */
		private ui_otherPlayerEnterRoom(event: egret.Event) {
			console.log(this.TAG + " ui_otherPlayerEnterRoom: " + JSON.stringify(event.data));
			let user = event.data.user;
			let userHead = <UserHead>this.seatsUI[user.client_seatID].getChildAt(0);//头像UI对象
			userHead.UserModel = user;
		}

		/**
		 * 结算
		 */
		private ui_checkOut(event: egret.Event) {
			console.log(this.TAG + " ui_checkOut: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this.actHandler.hide();
			let gameResultLayer = new LC.GameResult(info);
			SceneManager.Instance.runningScene.addChild(gameResultLayer);
		}


		/**
		 * 游戏结束
		 */
		private ui_gameOver(event: egret.Event) {
			console.log(this.TAG + " ui_gameOver: " + JSON.stringify(event.data.info));
			let info = <GameOverInfo>event.data.info;
			DeskInfo.status = DeskStatus.OVER;

			for (let key in info.player_info) {
				let user = UsersInfo.Instance.getUserBySeatID(Number(key));//找到座位号对应的用户，需要其客户端对应的座位号
				let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
				cardMod.fallDownAllHandCards(cardMod.direction, info.player_info[key]);
			}

			//重置用户的状态和庄家的信息
			UsersInfo.Instance.reSetAllUsersStatus();
		}

		/**
		 * 摸牌，轮到谁，谁的灯亮，并且开启倒计时
		 */
		private ui_drawCard(event: egret.Event) {
			console.log(this.TAG + " ui_drawCard: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);//座位的牌布局对象
			this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
			cardMod.addDrawCard(cardMod.direction, info.card_list[0], LC.CardState.Stand);//添加摸牌对象
		}

		/**
		 * 服务器告诉玩家可以进行什么操作
		 */
		private ui_canAct(event: egret.Event) {
			console.log(this.TAG + " ui_canAct: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this._parseActInfo(info);
		}

		/**
		 * 解析推送玩家叫牌的信息，分别对UI进行操作
		 */
		private _parseActInfo(info: CallCardInfo) {
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);

			for (let key in info.act_info) {
				console.log(`_parseActInfo ${LC.ACT[key]}`);
				switch (Number(key)) {
					case LC.ACT.CHU:
						cardMod.canOutACard = true;
						this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
						cardMod.moveCardToDrawCard(cardMod.direction, info.act_info[key].card)
						break;
					case LC.ACT.GUO:
					case LC.ACT.CHI:
					case LC.ACT.PENG:
					case LC.ACT.AN_GANG:
					case LC.ACT.BU_GANG:
					case LC.ACT.DIAN_GANG:
					case LC.ACT.DIAN_HU:
					case LC.ACT.ZI_MO:
						//可以进行某种ACT操作，显示操作actHandler
						this.actHandler.visible = true;
						this.actHandler.addLayout(Number(key), info.act_info[key]);
						break;

					case LC.ACT.TING:
						break;
				}
			}
		}


		/**
		 * cardModeLayout发过来的通知选牌完成
		 */
		private ui_selectCardComplete(event: egret.Event) {
			console.log(this.TAG + " ui_selectCardComplete: " + JSON.stringify(event.data.cardValue));
			let cardValue = event.data.cardValue;
			this._ctrl.actChuCard(cardValue);
		}


		/**
		 * 服务器通知客户端打有人作出了相应的操作
		 */
		private ui_actAleady(event: egret.Event) {
			console.log(this.TAG + " ui_actAleady: " + JSON.stringify(event.data.info));
			let info = event.data.info;
			this._parseActResponse(info);
		}

		/**
		 * 解析推送玩家动作响应协议 (推送给所有人)
		 */
		private _parseActResponse(info: ActResponseInfo) {
			let user = UsersInfo.Instance.getUserBySeatID(info.seat_id);
			let cardMod = <CardModLayout>this.seatsUI[user.client_seatID].getChildAt(1);
			this.actHandler.hide();//做了操作后 此可以隐藏
			let deleteList = [];
			let combList = [];
			console.log("_parseActResponse " + LC.ACT[info.act_type]);
			switch (info.act_type) {//过的视图上无太大变化
				case LC.ACT.CHU:
					this._currentOutCardContainer = cardMod.outACard(cardMod.direction, info.card_list[0], this._cardPointer);
					break;
				case LC.ACT.PENG:
					this.disc.lightBright(cardMod.direction);//倒计时在此接口加入，其他人接收不到101001的消息，通过此来转移指针
					//组合牌的显示，以及手牌的删除
					this._addCombArray(2, deleteList, info.card_list[0]);
					this._addCombArray(3, combList, info.card_list[0]);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Peng);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case LC.ACT.CHI:
					this.disc.lightBright(cardMod.direction);//倒计时在此接口加入
					//组合牌的显示，以及手牌的删除
					deleteList = ArrayUtils.DeepCopy(info.card_list);
					combList = ArrayUtils.DeepCopy(info.card_list);
					let currentOutCardValue = (<LC.Card>this._currentOutCardContainer.getChildAt(0)).value;
					ArrayUtils.deleteByValue(deleteList, currentOutCardValue);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Chi);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case LC.ACT.DIAN_GANG:
					this._addCombArray(3, deleteList, info.card_list[0]);//手牌删除3张
					this._addCombArray(4, combList, info.card_list[0]);//添加组合牌
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.MGang);
					//移除outlist的牌
					this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
					break;
				case LC.ACT.BU_GANG:
					//找到显示中的碰组合，并将其换成杠牌
					cardMod.buGang(cardMod.direction, info.card_list[0]);
					break;
				case LC.ACT.AN_GANG:
					this._addCombArray(4, deleteList, info.card_list[0]);//
					this._addCombArray(4, combList, info.card_list[0]);
					cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.AnGang);
					break;
				case LC.ACT.DIAN_HU:// 不用等了，消息从101006 回来了（结算消息时从服务器主动推过来的，如没牌的情况）
					break;
				case LC.ACT.ZI_MO:  // 不用等了，消息从101006 回来了
					break;
			}
		}

		/**
		 * 添加comb数据到数组，为了和UI一致
		 */
		private _addCombArray(repeatCount: number, arr: Array<number>, value: number) {
			for (let i = 0; i < repeatCount; i++) {
				arr.push(value);
			}
		}


		/**
		 * 准备按钮点击
		 */
		private _onReadyBtnClick(event: egret.Event) {
			let btn = <eui.Button>event.currentTarget;
			if (btn == this.btn_ready) {
				DeskInfo.status == DeskStatus.OVER && this._reSetRoom();
				this._ctrl.onMySelfReady(ReadyState.GetReady);
			} else if (btn == this.btn_cancel) {
				this._ctrl.onMySelfReady(ReadyState.Cancel);
			}
		}

		private _reSetRoom() {
			//重置风向盘
			this.disc.reSetDisc();
			UsersInfo.Instance.reSetAllUsersBanker();
			//重置每个模块
			for (let element of this.seatsUI) {
				let cardMod = element.getChildAt(1);
				(<CardModLayout>cardMod).reSetMod();
			}

		}

		/**
		 * 测试按钮点击
		 */
		private _onTestBtnClick(event: egret.Event) {
			let btn = <eui.Button>event.currentTarget;
			switch (btn) {
				case this.dealCard:
					this._ctrl.test_Send(TestType.DealCard, this._targetCardList);
					break;
				case this.changeCard:
					this._ctrl.test_Send(TestType.ChangeCard, this._targetCardList, this._sourceCardList);
					break;
				case this.confirmNextCard:
					this._ctrl.test_Send(TestType.ConfirmNextCard, this._targetCardList);
					break;
				case this.selectSourceCard:
					this.cardSelect_Panel.visible = true;
					this._isSourceCard = true;
					this._sourceCardList = [];
					this._resetTestCard();
					break;
				case this.selectTargetCard:
					this.cardSelect_Panel.visible = true;
					this._isSourceCard = false;
					this._targetCardList = [];
					this._resetTestCard();
					break;
				case this.sure:
					this.cardSelect_Panel.visible = false;
					console.log("sourceCard:", this._sourceCardList, "\ntargetCard:", this._targetCardList);
					break;
			}
		}
	}
}