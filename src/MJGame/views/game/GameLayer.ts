/**
 * 游戏层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class GameLayer extends Layer {
		public mod1: LC.CardModLayout;
		public mod2: LC.CardModLayout;
		public mod3: LC.CardModLayout;
		public mod4: LC.CardModLayout;

		public btn1: eui.Button;
		public btn2: eui.Button;
		public btn3: eui.Button;
		public btn4: eui.Button;

		public constructor() {
			super();
			this.skinName = "Skin.GameLayer";
		}

		protected init() {
			super.init();

			this._initMode(LC.Directions.Down, this.mod1);
			this._initMode(LC.Directions.Up, this.mod2);
			this._initMode(LC.Directions.Left, this.mod3);
			this._initMode(LC.Directions.Right, this.mod4);

			LC.Http.post("http://httpbin.org/post", { id: 1, level: 1 }, (e) => {
				var request = e.currentTarget;
				console.log("post data : ", request.response);
			}, this);

			LC.Http.get("http://httpbin.org/get", { id: 1, level: 1 }, (e) => {
				var request = e.currentTarget;
				console.log("get data : ", request.response);
			}, this);

			this.createGameScene();//test
		}


		private webSocket: egret.WebSocket;
		private createGameScene(): void {
			this.webSocket = new egret.WebSocket();
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this.webSocket.connect("echo.websocket.org", 80);
		}
		private onSocketOpen(): void {
			var cmd = "Hello Egret WebSocket，的风格和地方";
			console.log("连接成功，发送数据：" + cmd);
			this.webSocket.writeUTF(cmd);
		}
		private onReceiveMessage(e: egret.Event): void {
			var msg = this.webSocket.readUTF();
			console.log("收到数据：" + msg);
		}


		protected setOnTouchListener() {
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
		}


		protected removeOnTouchListener() {
			this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
		}

		public callback(event: egret.Event) {

			//需要强转一下类型才看的到代码提示
			(<GameLayerController>this.Ctrl).text();

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
			this.addChild(cardMod);
		}
	}
}