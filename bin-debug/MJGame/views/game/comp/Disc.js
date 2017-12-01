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
        Disc.prototype.init = function () {
            _super.prototype.init.call(this);
            //初始化
            this.anim_dice.MC.stop();
            this.anim_dice.visible = false;
            this.dice.visible = false;
            this.remain_count.visible = false;
            //灯全不显示
            this._setLightsVisible(false);
        };
        /**
         * 设置所有灯的可见性
         */
        Disc.prototype._setLightsVisible = function (visible) {
            for (var i = 0; i < this.lights.numChildren; i++) {
                this.lights.getChildAt(i).visible = visible;
            }
        };
        /**
         * 摇骰子动画并设置骰子值
         */
        Disc.prototype._setDice = function (dice) {
            var _this = this;
            if (dice == null)
                return;
            if (dice[0] == -1 && dice[1] == -1) {
                this.anim_dice.visible = true;
                this.anim_dice.MC.play(-1);
            }
            else {
                this.dice.getChildAt(0).source = RES.getRes("s" + dice[0] + "_png");
                this.dice.getChildAt(1).source = RES.getRes("s" + dice[1] + "_png");
                var timeoutId_1 = egret.setTimeout(function () {
                    _this.anim_dice.MC.stop();
                    _this.anim_dice.MC.visible = false;
                    _this.dice.visible = true;
                    clearTimeout(timeoutId_1);
                }, this, 1000);
            }
        };
        /**
         * 剩余牌数
         */
        Disc.prototype._setRemainCount = function (value) {
            value && (this.remain_count.text = "\u5269\u4F59:" + value.toString() + "\u5F20\u724C");
            this.remain_count.visible = true;
        };
        Disc.prototype.watchData = function () {
            eui.Binding.bindHandler(LC.DeskInfo, ["diceValue"], this._setDice, this);
            eui.Binding.bindHandler(LC.DeskInfo, ["remain_count"], this._setRemainCount, this);
        };
        //设置座位东西南北风向  设置东风的方向
        Disc.prototype.setDongFengDirection = function (direction) {
            switch (direction) {
                case LC.Directions.Down:
                    this.img_fengDir.rotation = 0;
                    break;
                case LC.Directions.Right:
                    this.img_fengDir.rotation = 270;
                    break;
                case LC.Directions.Up:
                    this.img_fengDir.rotation = 180;
                    break;
                case LC.Directions.Left:
                    this.img_fengDir.rotation = 90;
                    break;
            }
        };
        /**
         * 轮到出牌的一方的亮灯  后期加入倒计时在这里加
         * @param direction 方向
         */
        Disc.prototype.lightBright = function (direction, coolTime) {
            this._setLightsVisible(false);
            var element = this.lights.getChildAt(direction);
            element.visible = true;
            egret.Tween.get(element, { loop: true }).to({ alpha: 0 }, 200, egret.Ease.quadIn).to({ alpha: 1 }, 200, egret.Ease.quadIn);
        };
        return Disc;
    }(LC.Layer));
    LC.Disc = Disc;
    __reflect(Disc.prototype, "LC.Disc");
})(LC || (LC = {}));
//# sourceMappingURL=Disc.js.map