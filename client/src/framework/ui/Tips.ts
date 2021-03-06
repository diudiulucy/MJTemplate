/**
 * 提示(待优化)
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Tips extends Single{
		private _pool:Array<TipItem> = [];
	
		//为方便提示，加入此接口
        public static get Instance(): Tips {
            return this.getInstance();
        }

		public static show(msg:string):void{
			Tips.Instance._initView(msg);
		}

		private _initView(msg:string):void{
			let stage = egret.MainContext.instance.stage
			let item:TipItem = this._pool.length > 0 ? this._pool.pop() : new TipItem;
			item.text = msg;
			item.alpha = 0;
			var ty:number = stage.stageHeight/2 -200;
			
			egret.MainContext.instance.stage.addChild(item);

			let time:number = this._pool.length > 0 ? 1000:0;
		
			egret.Tween.get(item).wait(time).to({y:ty-100,alpha:1,scaleX:1,scaleY:1},500,egret.Ease.quadOut)
								 .wait(1000).to({y:ty-180,alpha:0},500,egret.Ease.quadIn).call((target)=>{
									 stage.removeChild(target);
									 this._pool.push(target);
								
								 },this,[item])
		}
	}
	
	class TipItem extends eui.Component{
		private _txt:eui.Label;
		private _group:eui.Group;
		private _bg: egret.Sprite = new egret.Sprite();
		public constructor(){
			super();
			this._init();
		}

		private _init(){
			this.width = egret.MainContext.instance.stage.stageWidth;
			this._group = new eui.Group();
			this.addChild(this._group);

			this._txt = new eui.Label();
			this._txt.size = 26;
			this._txt.bold = true;
			this._txt.textColor = 0xffffff;
			this._txt.multiline = true;
			this._txt.wordWrap = true;
			this._txt.textAlign = egret.HorizontalAlign.CENTER;
			this._group.addChild(this._txt);

		}

		public set text(v:string){
			this._txt.text = v;

			this._bg.graphics.clear();
			this._bg.graphics.beginFill(0x000000,0.8);
			this._bg.graphics.drawRoundRect(0,0,this._txt.width + 40,this._txt.height + 20,30,30);
			this._group.addChild(this._bg);

			this._group.width = this._bg.width;
			this._group.height = this._bg.height; 
			this._txt.horizontalCenter = 0;
			this._txt.y = (this._group.height - this._txt.height);

			this._group.anchorOffsetX = this._group.width /2;
			this._group.horizontalCenter = 0;
			this.validateNow();
				
		}
	}
}