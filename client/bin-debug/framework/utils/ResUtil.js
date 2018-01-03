var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 资源组加载管理类
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var ResUtil = (function (_super) {
        __extends(ResUtil, _super);
        function ResUtil() {
            var _this = _super.call(this) || this;
            _this._groups = {};
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this._onResourceLoadComplete, _this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this._onResourceLoadProgress, _this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this._onResourceLoadError, _this);
            return _this;
        }
        Object.defineProperty(ResUtil, "Instance", {
            //为方便代码提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载资源组，带加载完成回调
         * @group 资源组(支持字符串和数组)
         * @onComplete 加载完成回调
         * @thisObject 回调执行对象
         * @priority 优先级
         */
        ResUtil.prototype.loadGroup = function (group, thisObject, onComplete, onProgress, priority) {
            var groupName = this._combGroupName(group);
            this._groups[groupName] = [onComplete, onProgress, thisObject];
            RES.loadGroup(groupName);
        };
        /**
         * 组合资源组名。单个资源组直接返回。多个资源组则重新命名。
         * @group 新资源组名
         */
        ResUtil.prototype._combGroupName = function (group) {
            if (typeof (group) == "string") {
                return group;
            }
            else {
                var len = group.length;
                var groupName = "";
                for (var i = 0; i < len; i++) {
                    groupName += group[i];
                }
                RES.createGroup(groupName, group, false); //是否覆盖已经存在的同名资源组,默认 false
                return groupName;
            }
        };
        /**
         * 资源组加载完成
        */
        ResUtil.prototype._onResourceLoadComplete = function (event) {
            var groupName = event.groupName;
            console.log("资源组加载完成:" + groupName);
            if (this._groups[groupName]) {
                var loadComplete = this._groups[groupName][0];
                var loadCompleteTarget = this._groups[groupName][2];
                if (loadComplete != null) {
                    loadComplete.call(loadCompleteTarget, event);
                }
                this._groups[groupName] = null;
                delete this._groups[groupName];
            }
        };
        /**
         * 资源组加载进度
         */
        ResUtil.prototype._onResourceLoadProgress = function (event) {
            var groupName = event.groupName;
            if (this._groups[groupName]) {
                var loadProgress = this._groups[groupName][1];
                var loadProgressTarget = this._groups[groupName][2];
                if (loadProgress != null) {
                    loadProgress.call(loadProgressTarget, event);
                }
            }
        };
        /**
         * 资源组加载失败
         */
        ResUtil.prototype._onResourceLoadError = function (event) {
            console.error(event.groupName + "资源组有资源加载失败");
            this._onResourceLoadComplete(event);
        };
        return ResUtil;
    }(LC.Single));
    LC.ResUtil = ResUtil;
    __reflect(ResUtil.prototype, "LC.ResUtil");
})(LC || (LC = {}));
//# sourceMappingURL=ResUtil.js.map