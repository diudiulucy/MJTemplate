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
 * 加入房间层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var JoinRoom = (function (_super) {
        __extends(JoinRoom, _super);
        function JoinRoom() {
            var _this = _super.call(this) || this;
            /**按钮列表 */
            _this._numberBtns = [];
            _this.skinName = "Skin.JoinRoom";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
        }
        JoinRoom.prototype.init = function () {
            _super.prototype.init.call(this);
            this.label_roomNo.text = "";
            //初始化button
            for (var i = 0; i < 12; i++) {
                this._numberBtns.push(this.group_number_btn.getChildAt(i));
            }
        };
        JoinRoom.prototype.setOnTouchListener = function () {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            this.group_number_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
        };
        JoinRoom.prototype.removeOnTouchListener = function () {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            this.group_number_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
        };
        JoinRoom.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        JoinRoom.prototype._onCloseClick = function () {
            this.parent.removeChild(this);
        };
        /**软键盘点击响应 */
        JoinRoom.prototype._onNumberBtnClick = function (e) {
            for (var i = 0; i < this._numberBtns.length; i++) {
                if (e.target == this._numberBtns[i]) {
                    this._changeRoomNumber(i);
                }
            }
        };
        JoinRoom.prototype._changeRoomNumber = function (id) {
            if (id < 10) {
                if (this.label_roomNo.text.length >= 6) {
                    console.log("房间号只能为6位数");
                    return;
                }
                this.label_roomNo.text = this.label_roomNo.text + id.toString();
                // console.log(this.label_roomNo.text.length);	
            }
            else if (id == 10) {
                var txt = this.label_roomNo.text;
                txt = txt.substr(0, txt.length - 1);
                this.label_roomNo.text = txt;
            }
            else if (id == 11) {
                if (this.label_roomNo.text.length != 6) {
                    console.log("房间号不存在");
                }
                else {
                    this._ctrl.joinFriendRoom(Number(this.label_roomNo.text));
                }
            }
        };
        return JoinRoom;
    }(LC.Layer));
    LC.JoinRoom = JoinRoom;
    __reflect(JoinRoom.prototype, "LC.JoinRoom");
})(LC || (LC = {}));
//# sourceMappingURL=JoinRoom.js.map