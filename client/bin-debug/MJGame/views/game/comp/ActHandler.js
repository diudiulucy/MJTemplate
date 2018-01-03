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
 * 动作操作类
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var ActHandler = (function (_super) {
        __extends(ActHandler, _super);
        function ActHandler() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.ActHandler"; //注意其帧动画已在编辑器上进行设置
            return _this;
        }
        ActHandler.prototype.init = function () {
            _super.prototype.init.call(this);
            this._actList = (_a = {},
                _a[LC.ACT.GUO] = { obj: this.Guo },
                _a[LC.ACT.CHI] = { obj: this.Chi },
                _a[LC.ACT.PENG] = { obj: this.Peng },
                _a[LC.ACT.AN_GANG] = { obj: this.Gang },
                _a[LC.ACT.BU_GANG] = { obj: this.Gang },
                _a[LC.ACT.DIAN_GANG] = { obj: this.Gang },
                _a[LC.ACT.DIAN_HU] = { obj: this.Hu },
                _a[LC.ACT.ZI_MO] = { obj: this.Hu },
                _a);
            this._clearLayout();
            var _a;
        };
        ActHandler.prototype._clearLayout = function () {
            for (var key in this._actList) {
                var element = this._actList[key].obj;
                this._showAct(element, false);
                delete this._actList[key].info;
            }
        };
        ActHandler.prototype.setOnTouchListener = function () {
            this.Chi.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
        };
        ActHandler.prototype.removeOnTouchListener = function () {
            this.Chi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Peng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Gang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Hu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
            this.Guo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._actButtonClick, this);
        };
        ActHandler.prototype._actButtonClick = function (event) {
            var actplayer = event.currentTarget;
            console.log(actplayer.mcLink);
            switch (actplayer) {
                case this.Guo:
                    this.hide(); //点了之后立马隐藏
                    this._actGuoClick();
                    break;
                case this.Chi:
                    this._actChiClick();
                    break;
                case this.Peng:
                    this._actPengClick();
                    break;
                case this.Gang:
                    this._actGangClick();
                    break;
                case this.Hu:
                    this._actHuClick();
                    break;
            }
        };
        /**
         * 点击了过按钮
         */
        ActHandler.prototype._actGuoClick = function () {
            console.log("_actGuoClick");
            this._ctrl.actGuo();
        };
        /**
         * 点击了吃按钮
         */
        ActHandler.prototype._actChiClick = function () {
            console.log("_actChiClick");
            var info = this._actList[LC.ACT.CHI].info;
            if (info.length == 1) {
                this._ctrl.actChi(info[0]);
            }
            else {
                this.chiComb_Group.visible = true;
                this.chiComb_Group.removeChildren();
                for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
                    var combList = info_1[_i];
                    var combCards = new LC.ComboCards;
                    // combCards.bottom = 0;
                    combCards.scaleX = combCards.scaleY = 0.6;
                    combCards.setCombCardsTexture(LC.Directions.Down, combList, LC.CardCombType.Chi);
                    combCards.addEventListener(egret.TouchEvent.TOUCH_TAP, this._chiCombCardHandler, this);
                    this.chiComb_Group.addChild(combCards);
                }
            }
        };
        /**
         * 吃组合被点击的时候
         */
        ActHandler.prototype._chiCombCardHandler = function (event) {
            var combCards = event.currentTarget;
            var index = this.chiComb_Group.getChildIndex(combCards);
            var info = this._actList[LC.ACT.CHI].info;
            this.hide();
            this.chiComb_Group.visible = false;
            this.chiComb_Group.removeChildren();
            this._ctrl.actChi(info[index]);
        };
        /**
         * 点击了碰按钮
         */
        ActHandler.prototype._actPengClick = function () {
            console.log("_actPengClick");
            this._ctrl.actPeng();
        };
        ActHandler.prototype._actHuClick = function () {
            console.log("_actHuClick");
            if (this._actList[LC.ACT.DIAN_HU].info) {
                this._ctrl.actHu(LC.ACT.DIAN_HU);
            }
            else if (this._actList[LC.ACT.ZI_MO].info) {
                this._ctrl.actHu(LC.ACT.ZI_MO);
            }
        };
        ActHandler.prototype._actGangClick = function () {
            console.log("_actGangClick");
            if (this._actList[LC.ACT.DIAN_GANG].info) {
                this._ctrl.actGang(LC.ACT.DIAN_GANG);
            }
            else if (this._actList[LC.ACT.BU_GANG].info) {
                this._ctrl.actGang(LC.ACT.BU_GANG, this._actList[LC.ACT.BU_GANG].info[0]);
            }
            else if (this._actList[LC.ACT.AN_GANG].info) {
                this._ctrl.actGang(LC.ACT.AN_GANG, this._actList[LC.ACT.AN_GANG].info[0]);
            }
        };
        /**
         * 参与布局的UI
         * @param act 动作
         * @param value 动作携带的信息
         */
        ActHandler.prototype.addLayout = function (act, value) {
            this._showAct(this._actList[act].obj, true);
            this._actList[act].info = value;
        };
        /**
         * 是否参与布局
         */
        ActHandler.prototype._showAct = function (mcPlayer, isShow) {
            mcPlayer.visible = isShow;
            mcPlayer.includeInLayout = isShow;
        };
        ActHandler.prototype.hide = function () {
            this.visible = false;
            this.chiComb_Group.visible = false;
            this.chiComb_Group.removeChildren();
            this._clearLayout();
        };
        return ActHandler;
    }(LC.Layer));
    LC.ActHandler = ActHandler;
    __reflect(ActHandler.prototype, "LC.ActHandler");
})(LC || (LC = {}));
//# sourceMappingURL=ActHandler.js.map