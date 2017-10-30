/**
 *  消息派发器(不同模块之间进行通讯,解耦合)   通过创建实例使全局公用这一个消息派发器，当然也可以创建多个派发器，此项目采用一个 根据不同的事件类型来判定消息的不同
 * 	派发消息模块EventManager.dispatchEvent("update_gold", { gold: 100 });
 *  注册消息EventManager.register("update_gold",(e)=>{
              console.log("djskaljflk")
            },this);
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class EventManager extends egret.EventDispatcher {
		private static instance: EventManager;

		public constructor() {
			super();
		}

		public static getInstance() {
			if (!this.instance) {
				EventManager.instance = new EventManager();
			}
			return EventManager.instance;
		}

		public static dispatchEvent(type: string, data?: any): void {
			EventManager.getInstance().dispatchEventWith(type, false, data);
		}

		public static register(type: string, callback: Function, thisObj: any): void {
			EventManager.getInstance().addEventListener(type, callback, thisObj);
		}

		public static unRegister(type: string, callback: Function, thisObj: any):void{
			EventManager.getInstance().removeEventListener(type, callback, thisObj);
		}
	}
}