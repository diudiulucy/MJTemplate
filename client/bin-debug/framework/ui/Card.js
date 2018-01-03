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
 * 麻将牌（只可在CardModLayout和ComboCards类中进行操作）
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    /**
     * 方向（布局的方向，牌的方向）
     *
     */
    var Directions;
    (function (Directions) {
        Directions[Directions["Down"] = 0] = "Down";
        Directions[Directions["Right"] = 1] = "Right";
        Directions[Directions["Up"] = 2] = "Up";
        Directions[Directions["Left"] = 3] = "Left";
    })(Directions = LC.Directions || (LC.Directions = {}));
    /**
     * 牌的内部皮肤状态(外部不关心此状态，只有此类用到)
     */
    var CardSkinState;
    (function (CardSkinState) {
        CardSkinState[CardSkinState["stand_down"] = 0] = "stand_down";
        CardSkinState[CardSkinState["stand_right"] = 1] = "stand_right";
        CardSkinState[CardSkinState["stand_up"] = 2] = "stand_up";
        CardSkinState[CardSkinState["stand_left"] = 3] = "stand_left";
        CardSkinState[CardSkinState["fall_down"] = 4] = "fall_down";
        CardSkinState[CardSkinState["fall_right"] = 5] = "fall_right";
        CardSkinState[CardSkinState["fall_up"] = 6] = "fall_up";
        CardSkinState[CardSkinState["fall_left"] = 7] = "fall_left";
        CardSkinState[CardSkinState["hide_v"] = 8] = "hide_v";
        CardSkinState[CardSkinState["hide_h"] = 9] = "hide_h";
    })(CardSkinState || (CardSkinState = {}));
    /**
     * 牌的状态
     */
    var CardState;
    (function (CardState) {
        CardState[CardState["Stand"] = 0] = "Stand";
        CardState[CardState["Fall"] = 1] = "Fall";
        CardState[CardState["Hide"] = 2] = "Hide";
    })(CardState = LC.CardState || (LC.CardState = {}));
    /**
    * 麻将类
    */
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.Card";
            return _this;
        }
        Card.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**
         * @param direction     方向 Up,Down,Left,Right
         * @param cardState     牌的状态 Stand,Fall,Hide
         * @param value         牌的值
         */
        Card.prototype.setCardTexture = function (direction, cardState, value) {
            this.direction = direction;
            this.value = value;
            this._setCardSkinState(direction, cardState);
            //牌值纹理
            var source = RES.getRes(this._getValueImageURL(direction, cardState, value));
            //未找到白鹭动态切换某个状态下的纹理的方法，暂且用多个Image对象的方法来切换其不同状态下的纹理
            this.fallRight.source = source;
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        };
        /**
         * @param value  牌值
         * @returns   string   牌值对应的纹理路径
         */
        Card.prototype._getValueImageURL = function (direction, cardState, value) {
            if (cardState == LC.CardState.Fall) {
                return "cards_json.card_small_" + value;
            }
            else {
                return "cards_json.card_big_" + value;
            }
        };
        Object.defineProperty(Card.prototype, "Source", {
            /**
             * 仅做展示牌的时候使用 UI编辑器上赋值不会立马在编辑器显现出来，只有运行时候才会显现
             */
            set: function (value) {
                this.value = value;
                var source = RES.getRes(this._getValueImageURL(this.direction, CardSkinState[this.currentState], value));
                this.fallRight.source = source;
                this.fallLeft.source = source;
                this.fallUp.source = source;
                this.fallDown.source = source;
                this.standDown.source = source;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置牌的内部皮肤状态
         * @param  direction  方向
         * @param  cardState  牌状态
         */
        Card.prototype._setCardSkinState = function (direction, cardState) {
            var cardSkinState;
            switch (cardState) {
                case LC.CardState.Stand:
                    cardSkinState = (CardSkinState.stand_down + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case LC.CardState.Fall:
                    cardSkinState = (CardSkinState.fall_down + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case LC.CardState.Hide:
                    if (direction == LC.Directions.Up || direction == LC.Directions.Down) {
                        this.currentState = CardSkinState[CardSkinState.hide_v];
                    }
                    else if (direction == LC.Directions.Left || direction == LC.Directions.Right) {
                        this.currentState = CardSkinState[CardSkinState.hide_h];
                    }
                    break;
            }
        };
        return Card;
    }(eui.Component));
    LC.Card = Card;
    __reflect(Card.prototype, "LC.Card");
})(LC || (LC = {}));
//# sourceMappingURL=Card.js.map