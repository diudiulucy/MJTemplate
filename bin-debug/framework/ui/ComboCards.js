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
     * 组合牌的布局状态
     */
    var CardComboState;
    (function (CardComboState) {
        CardComboState[CardComboState["Horizontal"] = 0] = "Horizontal";
        CardComboState[CardComboState["Vertical"] = 1] = "Vertical";
    })(CardComboState || (CardComboState = {}));
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
        // private fallState = [
        //     LC.CardState.fall_up,
        //     LC.CardState.fall_down,
        //     LC.CardState.fall_left,
        //     LC.CardState.fall_right
        // ];
        // private hideState = [
        //     6,
        //     6,
        //     7,
        //     7
        // ];
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
         */
        ComboCards.prototype.setCombCardsTexture = function (direction, cardList, type) {
            this._setComboState(direction);
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
        *  设置吃碰牌型组合
        */
        ComboCards.prototype._setChiOrPeng = function (direction, cardList) {
            if (cardList.length != 3) {
                console.log("ChiOrPeng card number error !");
            }
            this.cardH_3.visible = false;
            this.cardV_3.visible = false;
            this._setList(direction, cardList, (LC.CardState.fall_up + direction));
        };
        /**
        *  设置明杠组合
        */
        ComboCards.prototype._setMGang = function (direction, cardList) {
            if (cardList.length != 4) {
                console.log("MGang card number error !");
            }
            this._setList(direction, cardList, (LC.CardState.fall_up + direction));
        };
        /**
       *  设置暗杠组合
       */
        ComboCards.prototype._setAnGang = function (direction, cardList) {
            if (cardList.length != 4) {
                console.log("AnGang card number error !");
            }
            var state;
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                state = LC.CardState.hide_v;
            }
            else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                state = LC.CardState.hide_h;
            }
            this._setList(direction, cardList, state);
            if (direction == LC.Directions.Down) {
                this.cardH_3.setCardTexture((LC.CardState.fall_up + direction), cardList[3]);
            }
        };
        ComboCards.prototype._setList = function (direction, cardList, state) {
            for (var i = 0; i < cardList.length; i++) {
                this["cardH_" + i].setCardTexture(state, cardList[i]);
                this["cardV_" + i].setCardTexture(state, cardList[i]);
            }
        };
        ComboCards.prototype._setComboState = function (direction) {
            if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                this.currentState = CardComboState[CardComboState.Horizontal];
            }
            else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                this.currentState = CardComboState[CardComboState.Vertical];
            }
        };
        return ComboCards;
    }(eui.Component));
    LC.ComboCards = ComboCards;
    __reflect(ComboCards.prototype, "LC.ComboCards");
})(LC || (LC = {}));
//# sourceMappingURL=ComboCards.js.map