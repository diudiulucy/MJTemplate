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
            console.log("进入游戏层");
            // console.log(UsersInfo.Instance.MySelf.user_id);
            // this.user_down.UserModel = UsersInfo.Instance.MySelf;
            // this._initMode(LC.Directions.Down, this.mod1);
            // this._initMode(LC.Directions.Up, this.mod2);
            // this._initMode(LC.Directions.Left, this.mod3);
            // this._initMode(LC.Directions.Right, this.mod4);
            this._initLayoutSeats(); //布置座位
            this._initUsersSeats(); //玩家就座
        };
        /**
         * 配置玩家的座位，人数决定布局
         */
        GameLayer.prototype._initLayoutSeats = function () {
            this._initConfigSeats(); //初始化座位配置
            this._hideOrShowAllSeats(false, this.FourPlayers); //隐藏所有座位
            this._chooseConfigSeates(LC.Config.MaxPlayerCount); // 根据人数选好座位配置
            this._hideOrShowAllSeats(true, this.seatsUI); //显示需要的座位
        };
        /**
         * 配好的人数及位置
         */
        GameLayer.prototype._initConfigSeats = function () {
            this.FourPlayers = [
                this.user_down,
                this.user_right,
                this.user_up,
                this.user_left
            ];
            this.ThreePlayers = [
                this.user_down,
                this.user_right,
                this.user_left
            ];
            this.TwoPlayers = [
                this.user_down,
                this.user_up,
            ];
        };
        /**
         * 根据人数选好座位配置
         */
        GameLayer.prototype._chooseConfigSeates = function (maxPlayerCount) {
            switch (maxPlayerCount) {
                case 2:
                    this.seatsUI = this.TwoPlayers;
                    break;
                case 3:
                    this.seatsUI = this.ThreePlayers;
                    break;
                case 4:
                    this.seatsUI = this.FourPlayers;
                    break;
            }
        };
        /**
         * @param isShow  是否显示
         * @param seats   座位UI数组
         */
        GameLayer.prototype._hideOrShowAllSeats = function (isShow, seats) {
            for (var _i = 0, seats_1 = seats; _i < seats_1.length; _i++) {
                var userObj = seats_1[_i];
                userObj.visible = isShow;
            }
        };
        /**
         * 根据用户的客户端座位号就座
         */
        GameLayer.prototype._initUsersSeats = function () {
            for (var key in LC.UsersInfo.Instance.UsersList) {
                var user = LC.UsersInfo.Instance.UsersList[key];
                // user.UserUI = this.seatsUI[user.client_seatID];
                this.seatsUI[user.client_seatID].UserModel = user;
            }
        };
        GameLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [
                // CustomEvents.UPDATE_VIEW
                CustomEvents.OtherPlayer_EnterROOM
            ];
        };
        // private ui_updateView() {
        //     console.log(this.TAG + " updateView ");
        // 	// this.btn1.label = "updateView";
        // }
        GameLayer.prototype.setOnTouchListener = function () {
            // this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
        };
        GameLayer.prototype.removeOnTouchListener = function () {
            // this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            // this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callback, this);
            this.btn_ready.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
        };
        GameLayer.prototype.watchData = function () {
            eui.Binding.bindHandler(LC.DeskInfo, ["deskID"], this._roomNoChange, this);
        };
        /**
         * 房间号有变化时调用
         */
        GameLayer.prototype._roomNoChange = function (value) {
            this.roomNo.text = "\u623F\u95F4\u53F7\uFF1A" + value.toString();
        };
        /**
         * 绑定用户模型在userHead上
         */
        GameLayer.prototype.ui_otherPlayerEnterRoom = function (event) {
            console.log(this.TAG + " ui_otherPlayerEnterRoom: " + JSON.stringify(event.data));
            var user = event.data.user;
            // user.UserUI = this.seatsUI[user.client_seatID];
            this.seatsUI[user.client_seatID].UserModel = user;
        };
        /**
         * 准备按钮点击
         */
        GameLayer.prototype._onReadyBtnClick = function () {
            this.btn_ready.visible = false;
            this._ctrl.onMySelfReady();
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
            // this.addChild(cardMod);
        };
        return GameLayer;
    }(LC.Layer));
    LC.GameLayer = GameLayer;
    __reflect(GameLayer.prototype, "LC.GameLayer");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayer.js.map