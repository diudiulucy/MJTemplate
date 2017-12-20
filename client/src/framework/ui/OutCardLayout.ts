/**
 * 出牌模板
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class OutCardLayout extends eui.LayoutBase {
		public constructor() {
			super();
		}

		public measure(): void {
			super.measure();
		}
		
		/**
		 * 重写显示列表更新
		 */
		public updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
			super.updateDisplayList(unscaledWidth, unscaledHeight);
			if (this.target == null)
				return;

			let count: number = this.target.numElements;

			/// 第一轮循环收集可布局元素，或者说过滤不可布局元素
			let vcElemInLayout: Array<egret.DisplayObject> = new Array<egret.DisplayObject>();
			for (let i: number = 0; i < count; i++) {
				let layoutElement: egret.DisplayObject = this.target.getElementAt(i);
				vcElemInLayout.push(layoutElement);
			}

			count = vcElemInLayout.length;
			for (let i: number = 1; i <= count; i++) {
				let elementWidth: number = vcElemInLayout[i - 1].width;
				let elementHeight: number = vcElemInLayout[i - 1].height - 10;

				let t = count - i;

				console.log(t)

				let childX = unscaledWidth - (t % 6) * elementWidth;
				let childY = unscaledHeight - Math.floor(t / 6) * elementHeight;

				vcElemInLayout[i - 1].x = childX;
				vcElemInLayout[i - 1].y = childY;
			}
		}
	}
}