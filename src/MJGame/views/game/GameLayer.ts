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
		}

		protected setOnTouchListener(){
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
			this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
		}

		public callback(event: egret.Event) {
			EventManager.dispatchEvent("lucy", { lucy: "a" });
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