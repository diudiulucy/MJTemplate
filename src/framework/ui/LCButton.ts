/**
 * 公共的Button(封装自己适用的button，点音乐等)
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class LCButton extends eui.Button{
		public labelImage:eui.BitmapLabel;

		public constructor() {
			super();
			this.skinName = "Skins.LCButton";		
		}

		protected createChildren(): void {
			super.createChildren();
			this.labelImage.text = this.label;


		}

	}
}