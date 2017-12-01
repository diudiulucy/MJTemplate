var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
        function GameResult() {
            var _this = _super.call(this) || this;
            // private group_label_number: eui.Group;
            // private group_number_btn: eui.Group;
            // private label_roomNo:eui.BitmapLabel;
            /**按钮列表 */
            _this._numberBtns = [];
            _this.skinName = "Skin.GameResult";
            return _this;
        }
        GameResult.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        GameResult.prototype.setOnTouchListener = function () {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            // this.group_number_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
        };
        GameResult.prototype.removeOnTouchListener = function () {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCloseClick, this);
            // this.group_number_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onNumberBtnClick, this);
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