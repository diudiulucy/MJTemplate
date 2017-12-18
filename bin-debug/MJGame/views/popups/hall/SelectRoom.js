var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 选择进入房间类型层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var SelectRoom = (function (_super) {
        __extends(SelectRoom, _super);
        function SelectRoom() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.SelectRoom";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
        }
        SelectRoom.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        SelectRoom.prototype.setOnTouchListener = function () {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            this.btn_joinRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onJoinRoomClick, this);
            this.btn_createRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCreateRoomClick, this);
        };
        SelectRoom.prototype.removeOnTouchListener = function () {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            this.btn_joinRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onJoinRoomClick, this);
            this.btn_createRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCreateRoomClick, this);
        };
        SelectRoom.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        /**
         * 点击加入房间
         */
        SelectRoom.prototype._onJoinRoomClick = function () {
            console.log("_onJoinRoomClick");
            var joinRoomLayer = new LC.JoinRoom();
            joinRoomLayer.Ctrl = new LC.JoinRoomController();
            LC.SceneManager.Instance.runningScene.addChild(joinRoomLayer);
        };
        /**
         * 点击创建房间
         */
        SelectRoom.prototype._onCreateRoomClick = function () {
            console.log("_onCreateRoomClick");
            this._ctrl.createRoom();
        };
        SelectRoom.prototype._onCloseClick = function () {
            this.parent.removeChild(this);
        };
        return SelectRoom;
    }(LC.Layer));
    LC.SelectRoom = SelectRoom;
    __reflect(SelectRoom.prototype, "LC.SelectRoom");
})(LC || (LC = {}));
//# sourceMappingURL=SelectRoom.js.map