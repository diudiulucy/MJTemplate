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
 * 加入房间层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var GameResult = (function (_super) {
        __extends(GameResult, _super);
        function GameResult(data) {
            var _this = _super.call(this) || this;
            /**按钮列表 */
            _this._numberBtns = [];
            _this.skinName = "Skin.GameResult";
            _this._data = data;
            return _this;
        }
        GameResult.prototype.init = function () {
            _super.prototype.init.call(this);
            this._setTotalResult();
        };
        GameResult.prototype._setTotalResult = function () {
            var totalPoints = this._data.total_points;
            for (var key in this._data.total_points) {
                var user = LC.UsersInfo.Instance.getUserBySeatID(Number(key)); //找到座位号对应的用户，需要其客户端对应的座位号
                var totalLabel = new eui.Label();
                this.total_Group.addChild(totalLabel);
                totalLabel.text = "\u73A9\u5BB6" + user.user_id + "\u7684\u603B\u5206\uFF1A" + totalPoints[key];
            }
        };
        GameResult.prototype.setOnTouchListener = function () {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
        };
        GameResult.prototype.removeOnTouchListener = function () {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
        };
        GameResult.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        GameResult.prototype._onCloseClick = function () {
            this.parent.removeChild(this);
        };
        GameResult.prototype.watchData = function () {
        };
        return GameResult;
    }(LC.Layer));
    LC.GameResult = GameResult;
    __reflect(GameResult.prototype, "LC.GameResult");
})(LC || (LC = {}));
//# sourceMappingURL=GameResult.js.map