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
     * 麻将方向
     *
     */
    var Directions;
    (function (Directions) {
        Directions[Directions["Up"] = 0] = "Up";
        Directions[Directions["Down"] = 1] = "Down";
        Directions[Directions["Left"] = 2] = "Left";
        Directions[Directions["Right"] = 3] = "Right";
    })(Directions = LC.Directions || (LC.Directions = {}));
    /**
     * 牌的内部皮肤状态
     */
    var CardSkinState;
    (function (CardSkinState) {
        CardSkinState[CardSkinState["stand_up"] = 0] = "stand_up";
        CardSkinState[CardSkinState["stand_down"] = 1] = "stand_down";
        CardSkinState[CardSkinState["stand_left"] = 2] = "stand_left";
        CardSkinState[CardSkinState["stand_right"] = 3] = "stand_right";
        CardSkinState[CardSkinState["fall_up"] = 4] = "fall_up";
        CardSkinState[CardSkinState["fall_down"] = 5] = "fall_down";
        CardSkinState[CardSkinState["fall_left"] = 6] = "fall_left";
        CardSkinState[CardSkinState["fall_right"] = 7] = "fall_right";
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
            this._setCardSkinState(direction, cardState);
            // this.currentState = LC.CardSkinState[state];//取出key this.currentState 当前的状态，根据当前的状态显示不同的皮肤，在EXML里进行布局和位置的修改，方便后期维护
            //牌值纹理
            var source = RES.getRes(this._getValueImageURL(value));
            //未找到白鹭动态切换某个状态下的纹理的方法，暂且用多个Image对象的方法来切换其不同状态下的纹理
            this.fallRight.source = source;
            this.fallLeft.source = source;
            this.fallUp.source = source;
            this.fallDown.source = source;
            this.standDown.source = source;
        };
        /**
         * @param value  牌值
         * @returns      牌值对应的纹理路径
         */
        Card.prototype._getValueImageURL = function (value) {
            return "tpm_card_big_" + value + "_png";
        };
        /**
         * 设置牌的内部皮肤状态
         *
         */
        Card.prototype._setCardSkinState = function (direction, cardState) {
            var cardSkinState;
            switch (cardState) {
                case LC.CardState.Stand:
                    cardSkinState = (CardSkinState.stand_up + direction);
                    this.currentState = CardSkinState[cardSkinState];
                    break;
                case LC.CardState.Fall:
                    cardSkinState = (CardSkinState.fall_up + direction);
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