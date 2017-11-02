var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  消息派发器(不同模块之间进行通讯,解耦合)   通过创建实例使全局公用这一个消息派发器，当然也可以创建多个派发器，此项目采用一个 根据不同的事件类型来判定消息的不同
 * 	派发消息模块EventManager.dispatchEvent("update_gold", { gold: 100 });
 *  注册消息EventManager.register("update_gold",(e)=>{
              console.log("djskaljflk")
            },this);
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        EventManager.getInstance = function () {
            if (!this.instance) {
                EventManager.instance = new EventManager();
            }
            return EventManager.instance;
        };
        EventManager.dispatchEvent = function (type, data) {
            EventManager.getInstance().dispatchEventWith(type, false, data);
        };
        EventManager.register = function (type, callback, thisObj) {
            EventManager.getInstance().addEventListener(type, callback, thisObj);
        };
        EventManager.unRegister = function (type, callback, thisObj) {
            EventManager.getInstance().removeEventListener(type, callback, thisObj);
        };
        return EventManager;
    }(egret.EventDispatcher));
    LC.EventManager = EventManager;
    __reflect(EventManager.prototype, "LC.EventManager");
})(LC || (LC = {}));
//# sourceMappingURL=EventManager.js.map