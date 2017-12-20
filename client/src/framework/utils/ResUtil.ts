/**
 * 资源组加载管理类
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class ResUtil extends Single {
		private _groups: any;

		//为方便代码提示，加入此接口
		public static get Instance(): ResUtil {
			return this.getInstance();
		}

		protected constructor() {
			super();
			this._groups = {};
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceLoadProgress, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
		}

		/**
 		 * 加载资源组，带加载完成回调
 		 * @group 资源组(支持字符串和数组)
 		 * @onComplete 加载完成回调
 		 * @thisObject 回调执行对象
 		 * @priority 优先级
 		 */
		public loadGroup(group,thisObject: any, onComplete?: Function, onProgress?:Function,priority?: number) {
			var groupName: string = this._combGroupName(group);
			this._groups[groupName] = [onComplete, onProgress, thisObject];
			RES.loadGroup(groupName);
		}


		/**
		 * 组合资源组名。单个资源组直接返回。多个资源组则重新命名。
	     * @group 新资源组名
	     */
		private _combGroupName(group) {
			if (typeof (group) == "string") {
				return group;
			} else {
				var len = group.length;
				var groupName: string = "";
				for (var i = 0; i < len; i++) {
					groupName += group[i];
				}
				RES.createGroup(groupName, group, false); //是否覆盖已经存在的同名资源组,默认 false
				return groupName;
			}
		}


		/**
  		 * 资源组加载完成
  		*/
		private _onResourceLoadComplete(event: RES.ResourceEvent): void {
			var groupName: string = event.groupName;
			console.log("资源组加载完成:" + groupName);
			if (this._groups[groupName]) {
				var loadComplete: Function = this._groups[groupName][0];
				var loadCompleteTarget: any = this._groups[groupName][2];
				if (loadComplete != null) {
					loadComplete.call(loadCompleteTarget,event);
				}

				this._groups[groupName] = null;
				delete this._groups[groupName];
			}
		}

		/**
		 * 资源组加载进度
		 */
		private _onResourceLoadProgress(event: RES.ResourceEvent): void {
			var groupName: string = event.groupName;
			if (this._groups[groupName]) {
				var loadProgress: Function = this._groups[groupName][1];
				var loadProgressTarget: any = this._groups[groupName][2];
				if (loadProgress != null) {
					loadProgress.call(loadProgressTarget, event);
				}
			}
		}

		/**
		 * 资源组加载失败
		 */
		private _onResourceLoadError(event: RES.ResourceEvent): void {
			console.error(event.groupName + "资源组有资源加载失败");
			this._onResourceLoadComplete(event);
		}
	}
}