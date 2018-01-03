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
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
        }
        HallLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            this._ctrl.connectSocket();
        };
        HallLayer.prototype.setOnTouchListener = function () {
            this.btn_playGround.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
            this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBackBtnClick, this);
        };
        HallLayer.prototype.removeOnTouchListener = function () {
            this.btn_playGround.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onPlayGroundBtnClick, this);
            this.btn_friendRoom.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onFriendRoomBtnClick, this);
            this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onBackBtnClick, this);
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
        HallLayer.prototype._onBackBtnClick = function () {
            var loginScene = new LC.LoginScene();
            LC.SceneManager.Instance.replaceScene(loginScene);
        };
        return HallLayer;
    }(LC.Layer));
    LC.HallLayer = HallLayer;
    __reflect(HallLayer.prototype, "LC.HallLayer");
})(LC || (LC = {}));
//# sourceMappingURL=HallLayer.js.map