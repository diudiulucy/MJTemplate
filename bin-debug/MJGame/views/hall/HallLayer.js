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
            // this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        };
        HallLayer.prototype.removeOnTouchListener = function () {
            // this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
        };
        HallLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [];
        };
        return HallLayer;
    }(LC.Layer));
    LC.HallLayer = HallLayer;
    __reflect(HallLayer.prototype, "LC.HallLayer");
})(LC || (LC = {}));
//# sourceMappingURL=HallLayer.js.map