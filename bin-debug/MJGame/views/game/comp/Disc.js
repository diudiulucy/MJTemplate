var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 风向盘
 * 组件只提供接口不处理协议，由数据来驱动组件的视图变化
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Disc = (function (_super) {
        __extends(Disc, _super);
        function Disc() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.Disc";
            return _this;
        }
        Disc.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._watchData();
            //初始化
            this.anim_shaizi.visible = false;
            this.dice.visible = false;
            this.anim_shaizi.MC.addEventListener(egret.Event.COMPLETE, this._shaiziAnimComplete, this);
        };
        /**
         * 摇骰子动画并设置骰子值
         */
        Disc.prototype.setDice = function (dice) {
            if (dice == null)
                return;
            this.anim_shaizi.visible = true;
            this.anim_shaizi.MC.play(6);
            this.dice.getChildAt(0).source = RES.getRes("s" + dice[0] + "_png");
            this.dice.getChildAt(1).source = RES.getRes("s" + dice[1] + "_png");
        };
        Disc.prototype._shaiziAnimComplete = function () {
            this.anim_shaizi.visible = false;
            this.dice.visible = true;
            // this.setDice([5, 6]);
        };
        Disc.prototype._watchData = function () {
            eui.Binding.bindHandler(LC.DeskInfo, ["diceValue"], this.setDice, this);
        };
        return Disc;
    }(eui.Component));
    LC.Disc = Disc;
    __reflect(Disc.prototype, "LC.Disc");
})(LC || (LC = {}));
//# sourceMappingURL=Disc.js.map