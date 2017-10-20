var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    /**
     * 麻将牌
     */
    var CardTest = (function (_super) {
        __extends(CardTest, _super);
        function CardTest() {
            var _this = _super.call(this) || this;
            _this.skinName = "LCSkin.LCTest";
            return _this;
        }
        CardTest.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return CardTest;
    }(eui.Component));
    LC.CardTest = CardTest;
    __reflect(CardTest.prototype, "LC.CardTest");
})(LC || (LC = {}));
//# sourceMappingURL=CardTest.js.map