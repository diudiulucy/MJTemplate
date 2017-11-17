var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 公共的Button(封装自己适用的button，点音乐等)
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LCButton = (function (_super) {
        __extends(LCButton, _super);
        function LCButton() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skins.LCButton";
            return _this;
        }
        LCButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.labelImage.text = this.label;
        };
        return LCButton;
    }(eui.Button));
    LC.LCButton = LCButton;
    __reflect(LCButton.prototype, "LC.LCButton");
})(LC || (LC = {}));
//# sourceMappingURL=LCButton.js.map