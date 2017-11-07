var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 客户端的消息事件
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var CustomEvent = (function () {
        function CustomEvent() {
        }
        return CustomEvent;
    }());
    CustomEvent.UPDATE_VIEW = "UpdateView";
    LC.CustomEvent = CustomEvent;
    __reflect(CustomEvent.prototype, "LC.CustomEvent");
})(LC || (LC = {}));
//# sourceMappingURL=CustomEvent.js.map