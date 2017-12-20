/**
 * 加载层
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
    export class LoadingLayer extends Layer {
        private pgBar: eui.Image;
        private proLabel: eui.Label;
        private pgBarWidth: number;
        public constructor() {
            super();
        }

        protected init(): void {//此类手写UI，加速首屏加载速度，exml加载得等主题加载完加载才有效
            super.init();

            this.percentWidth = 100;
            this.percentHeight = 100;

            let bg = new eui.Image();
            bg.source = RES.getRes("PreLoadingBg_png");
            bg.percentWidth = 100;
            bg.percentHeight = 100;
            this.addChild(bg);

            let group = new eui.Group();
            group.horizontalCenter = 0;
            group.bottom = 20;
            this.addChild(group);

            let pgBg = new eui.Image();
            pgBg.source = RES.getRes("PreLoadingBarBg_png");
            group.addChild(pgBg);

            this.pgBar = new eui.Image();
            this.pgBar.source = RES.getRes("PreLoadingBar_png");
            this.pgBar.left = 30;
            this.pgBar.verticalCenter = -5;
            group.addChild(this.pgBar);
            this.pgBarWidth = this.pgBar.width;

            this.proLabel = new eui.Label();
            this.proLabel.horizontalCenter = 0;
            this.proLabel.verticalCenter = -5;
            this.proLabel.textAlign = "center";
            this.proLabel.size = 24;
            this.proLabel.textColor = 0xFFFFFF;
            this.proLabel.bold = true;
            this.proLabel.stroke = 1;
            this.proLabel.strokeColor = 0x000000;
            group.addChild(this.proLabel);

            this.proLabel.text = "0%";
            this.pgBar.width = 0;
        }

        /**
         * 进度条
         */
        public setProgress(current: number, total: number): void {
            var rate: number = Math.round((current / total) * 100);
            this.proLabel.text = rate + "%";
            this.pgBar.width = this.pgBarWidth * (current / total);
        }
    }
}