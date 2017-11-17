var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var HallLayer = (function (_super) {
        __extends(HallLayer, _super);
        function HallLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.HallLayer";
            return _this;
        }
        HallLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            this._ctrl.connectSocket();
        };
        HallLayer.prototype.setOnTouchListener = function () {
            this.btn_playGround.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
        };
        HallLayer.prototype.removeOnTouchListener = function () {
            this.btn_playGround.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
        };
        HallLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        /**
         * 点击游戏场按钮
         */
        HallLayer.prototype._onPlayGroundBtnClick = function () {
            console.log("_onPlayGroundBtnClick");
        };
        /**
         * 点击好友房按钮
         */
        HallLayer.prototype._onFriendRoomBtnClick = function () {
            console.log("_onFriendRoomBtnClick");
            var selecRoomLayer = new LC.SelectRoom();
            selecRoomLayer.Ctrl = new LC.SelectRoomController();
            LC.SceneManager.Instance.runningScene.addChild(selecRoomLayer);
        };
        return HallLayer;
    }(LC.Layer));
    LC.HallLayer = HallLayer;
    __reflect(HallLayer.prototype, "LC.HallLayer");
})(LC || (LC = {}));
//# sourceMappingURL=HallLayer.js.map