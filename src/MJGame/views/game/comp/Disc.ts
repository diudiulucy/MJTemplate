/**
 * 风向盘
 * 组件只提供接口不处理协议，由数据来驱动组件的视图变化
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Disc extends eui.Component {
		private anim_shaizi: LC.MCPlayer;
		private dice: eui.Group;

		public constructor() {
			super();
			this.skinName = "Skin.Disc";
		}

		protected createChildren() {
			super.createChildren();
			this._watchData();
			//初始化
			this.anim_shaizi.visible = false;
			this.dice.visible = false;

			this.anim_shaizi.MC.addEventListener(egret.Event.COMPLETE, this._shaiziAnimComplete, this);
		}

		/**
		 * 摇骰子动画并设置骰子值
		 */
		public setDice(dice: [number, number]) {
			if(dice == null) return;
			this.anim_shaizi.visible = true;
			this.anim_shaizi.MC.play(6);
			(<eui.Image>this.dice.getChildAt(0)).source = RES.getRes(`s${dice[0]}_png`);
			(<eui.Image>this.dice.getChildAt(1)).source = RES.getRes(`s${dice[1]}_png`);
		}

		private _shaiziAnimComplete() {
			this.anim_shaizi.visible = false;
			this.dice.visible = true;
			// this.setDice([5, 6]);
		}

		private _watchData(){
			eui.Binding.bindHandler(DeskInfo, ["diceValue"], this.setDice, this);
		}


	}
}