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
 * 麻将组合（只可被CardModLayout类调用）
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    /**
     * 组合牌的内部布局皮肤状态(外部不关心此状态，只有此类用到)
     */
    var CardComboSkinState;
    (function (CardComboSkinState) {
        CardComboSkinState[CardComboSkinState["Horizental"] = 0] = "Horizental";
        CardComboSkinState[CardComboSkinState["Vertical"] = 1] = "Vertical";
    })(CardComboSkinState || (CardComboSkinState = {}));
    /**
     * 组合牌类型(这里还是保留此类型，将UI和协议分开，方便后期其他的麻将项目的开发)
     */
    var CardCombType;
    (function (CardCombType) {
        CardCombType[CardCombType["Chi"] = 0] = "Chi";
        CardCombType[CardCombType["Peng"] = 1] = "Peng";
        CardCombType[CardCombType["MGang"] = 2] = "MGang";
        CardCombType[CardCombType["AnGang"] = 3] = "AnGang";
    })(CardCombType = LC.CardCombType || (LC.CardCombType = {}));
    /**
    * 麻将组合类
    */
    var ComboCards = (function (_super) {
        __extends(ComboCards, _super);
        function ComboCards() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.ComboCards";
            return _this;
        }
        ComboCards.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * 设置组合牌的纹理
         * @param direction   方向
         * @param cardList    牌值数组
         * @param type        组合类型
         */
        ComboCards.prototype.setCombCardsTexture = function (direction, cardList, type) {
            this._setComboSkinState(direction);
            if (direction == LC.Directions.Down) {
                this.scaleX = this.scaleY = 1.28;
            }
            switch (type) {
                case CardCombType.Chi:
                case CardCombType.Peng:
                    this._setChiOrPeng(direction, cardList);
                    break;
                case CardCombType.MGang:
                    this._setMGang(direction, cardList);
                    break;
                case CardCombType.AnGang:
                    this._setAnGang(direction, cardList);
                    break;
            }
        };
        /**
         * 判断是否是值为cardValue的碰组合
         * @param cardValue 牌值
         */
        ComboCards.prototype._isPengComb = function (cardValue) {
            var result = false;
            for (var i = 0; i < 3; i++) {
                if (this["cardH_" + i].value != cardValue || this["cardV_" + i].value != cardValue)
                    return false;
            }
            return true;
        };
        ComboCards.prototype.changBuGang = function (direction, cardValue) {
            if (this._isPengComb(cardValue)) {
                this.cardH_3.visible = true;
                this.cardV_3.visible = true;
                this.cardH_3.setCardTexture(direction, LC.CardState.Fall, cardValue);
                this.cardV_3.setCardTexture(direction, LC.CardState.Fall, cardValue);
            }
        };
        /**
         *  设置吃碰牌型组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        ComboCards.prototype._setChiOrPeng = function (direction, cardList) {
            console.assert(cardList.length == 3, "ChiOrPeng card number error !");
            this.cardH_3.visible = false;
            this.cardV_3.visible = false;
            this._setList(direction, LC.CardState.Fall, cardList);
        };
        /**
         *  设置明杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        ComboCards.prototype._setMGang = function (direction, cardList) {
            console.assert(cardList.length == 4, "MGang card number error !");
            this._setList(direction, LC.CardState.Fall, cardList);
        };
        /**
         *  设置暗杠组合
         * @param direction   方向
         * @param cardList    牌值数组
         */
        ComboCards.prototype._setAnGang = function (direction, cardList) {
            console.assert(cardList.length == 4, "AnGang card number error !");
            this._setList(direction, LC.CardState.Hide, cardList);
            if (direction == LC.Directions.Down) {
                this.cardH_3.setCardTexture(direction, LC.CardState.Fall, cardList[3]);
            }
        };
        /**
         *  设置牌的纹理
         * @param direction   方向
         * @param cardState   牌的状态 Stand,Fall,Hide
         * @param cardList    牌值数组
         */
        ComboCards.prototype._setList = function (direction, state, cardList) {
            for (var i = 0; i < cardList.length; i++) {
                //白鹭不同状态没办法切换纹理，所以用了两套
                this["cardH_" + i].setCardTexture(direction, state, cardList[i]);
                this["cardV_" + i].setCardTexture(direction, state, cardList[i]);
            }
        };
        /**
         *  设置组合牌的皮肤状态
         * @param  direction  方向
         */
        ComboCards.prototype._setComboSkinState = function (direction) {
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                this.currentState = CardComboSkinState[CardComboSkinState.Horizental];
            }
            else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                this.currentState = CardComboSkinState[CardComboSkinState.Vertical];
            }
        };
        return ComboCards;
    }(eui.Component));
    LC.ComboCards = ComboCards;
    __reflect(ComboCards.prototype, "LC.ComboCards");
})(LC || (LC = {}));
//# sourceMappingURL=ComboCards.js.map