var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏层
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var GameLayer = (function (_super) {
        __extends(GameLayer, _super);
        function GameLayer() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.GameLayer";
            return _this;
        }
        GameLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            this._initMode(LC.Directions.Down, this.mod1);
            this._initMode(LC.Directions.Up, this.mod2);
            this._initMode(LC.Directions.Left, this.mod3);
            this._initMode(LC.Directions.Right, this.mod4);
            //需要强转一下类型才看的到代码提示
            this._ctrl.text();
        };
        GameLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [
                CustomEvents.UPDATE_VIEW
            ];
        };
        GameLayer.prototype.ui_updateView = function () {
            console.log(this.TAG + " updateView ");
            // this.btn1.label = "updateView";
        };
        GameLayer.prototype.setOnTouchListener = function () {
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
        };
        GameLayer.prototype.removeOnTouchListener = function () {
            this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
        };
        GameLayer.prototype.callback = function (event) {
            LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.UPDATE_VIEW, { lucy: "a" });
            var mod = this.mod2;
            var btn = event.currentTarget;
            var direction = LC.Directions.Up;
            if (btn == this.btn1) {
                mod.addCombToAllCardList(direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
            }
            else if (btn == this.btn2) {
                mod.addCombToAllCardList(direction, [0, 1], [22, 22, 22], LC.CardCombType.Peng);
            }
            else if (btn == this.btn3) {
                mod.addCombToAllCardList(direction, [0, 1, 2], [22, 22, 22, 22], LC.CardCombType.MGang);
            }
            else if (btn == this.btn4) {
                mod.addCombToAllCardList(direction, [0, 1, 2, 3], [22, 22, 22, 22], LC.CardCombType.AnGang);
            }
        };
        GameLayer.prototype._initMode = function (direction, cardMod) {
            var handCardList = [
                17,
                18,
                19,
                20,
                39,
                40,
                49,
                49,
                50,
                50,
                51,
                51,
                53,
            ];
            var outCardList = [
                39,
                40,
                49,
                50,
                49,
                50,
                51
            ];
            // cardMod.initView(direction, handCardList, {
            //     handCardList: handCardList,
            //     outCardList: outCardList,
            // });
            // if (direction == LC.Directions.Down) {
            cardMod.initAllCards(direction, handCardList, 25);
            for (var i = 0; i < cardMod.HandCards.numElements; i++) {
                var card = cardMod.HandCards.getChildAt(i);
                card.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //对数据重排序之后，更新视图
                    cardMod.moveDrawCardToHandList(cardMod.drawCard, 8);
                }, this);
            }
            // } else {
            // cardMod.initHandCards(direction, handCardList);
            // }
            this.addChild(cardMod);
        };
        return GameLayer;
    }(LC.Layer));
    LC.GameLayer = GameLayer;
    __reflect(GameLayer.prototype, "LC.GameLayer");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayer.js.map