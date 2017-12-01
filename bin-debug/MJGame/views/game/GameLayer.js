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
            _this._sourceCardList = [];
            _this._targetCardList = [];
            _this._isSourceCard = true;
            _this.skinName = "Skin.GameLayer";
            return _this;
        }
        GameLayer.prototype.init = function () {
            _super.prototype.init.call(this);
            console.log("进入游戏层");
            this._initTestPanel();
            this._initCardPointer();
            this._initCardModDirection(); //初始化牌布局的方向
            // test
            // this.mod_down.initHandCards(this.mod_down.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
            // // this.mod_down.addDrawCard(this.mod_down.direction, 18);
            // this.mod_up.initHandCards(this.mod_up.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
            // this.mod_left.initHandCards(this.mod_left.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
            // this.mod_right.initHandCards(this.mod_right.direction, [18, 17, 19, 97, 23, 24, 22, 21, 102, 20, 33, 35, 101]);
            // this.mod_down.addCombToAllCardList(this.mod_down.direction, [], [22, 22, 22], LC.CardCombType.Peng);
            // this.mod_up.addCombToAllCardList(this.mod_up.direction, [], [22, 22, 22], LC.CardCombType.Peng);
            // this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 22, 22], LC.CardCombType.Peng);
            // this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 22, 22], LC.CardCombType.Peng);
            // this.mod_down.appliqueCards(this.mod_down.direction,[97,102,101],[49,50,51]);
            this._initLayoutSeats(); //布置座位
            this._initUsersSeats(); //玩家就座
        };
        /**
         * 初始化出牌指针
         */
        GameLayer.prototype._initCardPointer = function () {
            this._cardPointer = new LC.CardPointer();
            this._cardPointer.visible = false;
            this.actHandler.Ctrl = new LC.ActHandlerController();
        };
        /**
         * 初始化测试面板
         */
        GameLayer.prototype._initTestPanel = function () {
            this.cardSelect_Panel.visible = false;
            this._addShowCard(17, 25);
            this._addShowCard(33, 41);
            this._addShowCard(49, 57);
            this._addShowCard(65, 68);
            this._addShowCard(81, 83);
        };
        GameLayer.prototype._addShowCard = function (start, end) {
            var _this = this;
            var group = this.card_Group;
            var _loop_1 = function (i) {
                var container = new eui.Group();
                group.addChild(container);
                var card = new LC.Card();
                card.touchEnabled = false;
                card.scaleX = card.scaleY = 0.5;
                card.setCardTexture(LC.Directions.Down, LC.CardState.Stand, i);
                container.addChild(card);
                var toggle = new eui.ToggleButton();
                toggle.width = 43;
                toggle.height = 62;
                toggle.alpha = 0;
                container.addChild(toggle);
                toggle.addEventListener(egret.Event.CHANGE, function (e) {
                    var radioButton = e.target;
                    if (radioButton.selected) {
                        card.alpha = 0.3;
                        _this._isSourceCard ? _this._sourceCardList.push(card.value) : _this._targetCardList.push(card.value);
                    }
                    else {
                        card.alpha = 1;
                        _this._isSourceCard ? ArrayUtils.deleteByValue(_this._sourceCardList, card.value) : ArrayUtils.deleteByValue(_this._targetCardList, card.value);
                    }
                }, this_1);
            };
            var this_1 = this;
            for (var i = start; i <= end; i++) {
                _loop_1(i);
            }
        };
        GameLayer.prototype._resetTestCard = function () {
            var group = this.card_Group;
            for (var i = 0; i < group.numChildren; i++) {
                var container = group.getChildAt(i);
                var card = container.getChildAt(0);
                var toggle = container.getChildAt(1);
                card.alpha = 1;
            }
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
                this.Down,
                this.Right,
                this.Up,
                this.Left
            ];
            this.ThreePlayers = [
                this.Down,
                this.Right,
                this.Left
            ];
            this.TwoPlayers = [
                this.Down,
                this.Up,
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
                userObj.getChildAt(0).visible = isShow;
            }
        };
        /**
         * 根据用户的客户端座位号就座
         */
        GameLayer.prototype._initUsersSeats = function () {
            for (var key in LC.UsersInfo.Instance.UsersList) {
                var user = LC.UsersInfo.Instance.UsersList[key];
                this.seatsUI[user.client_seatID].getChildAt(0).UserModel = user;
            }
        };
        GameLayer.prototype.registerCustomEvents = function () {
            this.UIEventList = [
                CustomEvents.OtherPlayer_EnterROOM,
                CustomEvents.DealCard,
                CustomEvents.DrawCard,
                CustomEvents.BuHua_DealCard,
                CustomEvents.BuHua_GameCard,
                CustomEvents.CanAct,
                CustomEvents.AllUsersReady,
                CustomEvents.ACT_Aleady,
                LC.SelectCardComplete,
                CustomEvents.ChangeCard
            ];
        };
        GameLayer.prototype.setOnTouchListener = function () {
            var _this = this;
            this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
            //测试相关
            this.dealCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.changeCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.confirmNextCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.selectTargetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.selectSourceCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.move.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.mod_down.buGang(_this.mod_down.direction, 22);
                _this.mod_up.buGang(_this.mod_up.direction, 22);
                _this.mod_left.buGang(_this.mod_left.direction, 22);
                _this.mod_right.buGang(_this.mod_right.direction, 22);
                // this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
                // this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
                // this.mod_down.addCombToAllCardList(this.mod_down.direction, [], [22, 23, 24], LC.CardCombType.Chi);
                // this.mod_up.addCombToAllCardList(this.mod_up.direction, [], [22, 23, 24], LC.CardCombType.Chi);
                // // this.mod_left.addCombToAllCardList(this.mod_left.direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
                // // this.mod_right.addCombToAllCardList(this.mod_right.direction, [0, 1], [22, 23, 24], LC.CardCombType.Chi);
                // this.mod_up.addCombToAllCardList(this.mod_up.direction, [0, 1, 2], [22, 22, 22, 22], LC.CardCombType.MGang);
                // this.mod_down.addCombToAllCardList(this.mod_down.direction, [0, 1, 2], [22, 22, 22, 22], LC.CardCombType.AnGang);
                // this.mod_down.moveDrawCardToHandList(8);		// this.mod_down.addDrawCard(this.mod_down.direction, 17);
                // if (GameLayer.count < 33) {
                // 	// this.mod_down._addOutCard(this.mod_down.direction, GameLayer.count,this._cardPointer);
                // 	this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
                // 	// this.mod_left._addOutCard(this.mod_left.direction, GameLayer.count,this._cardPointer);
                // } else if (GameLayer.count >= 33) {
                // 	this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
                // 	// this.mod_right._addOutCard(this.mod_right.direction, GameLayer.count,this._cardPointer);
                // }
                // this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count, this._cardPointer);
                // // this.mod_up._addOutCard(this.mod_up.direction, GameLayer.count,this._cardPointer);
                // GameLayer.count++;
                // if (GameLayer.count == 26) GameLayer.count = 33;
                // if (GameLayer.count == 42) GameLayer.count = 49;
            }, this);
        };
        GameLayer.prototype.removeOnTouchListener = function () {
            this.btn_ready.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReadyBtnClick, this);
            //测试相关
            this.dealCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.changeCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.confirmNextCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.selectTargetCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.selectSourceCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
            this.cardSelect_Panel.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestBtnClick, this);
        };
        GameLayer.prototype.watchData = function () {
            eui.Binding.bindHandler(LC.DeskInfo, ["deskID"], this._roomNoChange, this);
        };
        /**
         * 房间号有变化时调用
         */
        GameLayer.prototype._roomNoChange = function (value) {
            value && (this.roomNo.text = "\u623F\u95F4\u53F7\uFF1A" + value.toString());
        };
        GameLayer.prototype._initCardModDirection = function () {
            this.mod_down.direction = LC.Directions.Down;
            this.mod_right.direction = LC.Directions.Right;
            this.mod_up.direction = LC.Directions.Up;
            this.mod_left.direction = LC.Directions.Left;
        };
        /**
         * 所有玩家准备好
         */
        GameLayer.prototype.ui_allUsersReady = function (event) {
            var user = LC.UsersInfo.Instance.getUserBySeatID(0); //找到服务器座位号为0的用户,0为东风
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //为0的用户座位的牌布局对象
            this.disc.setDongFengDirection(cardMod.direction);
        };
        /**
         * 发牌
         */
        GameLayer.prototype.ui_dealCard = function (event) {
            console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.all_cards));
            var all_cards = event.data.all_cards;
            for (var key in all_cards) {
                var data = all_cards[key];
                var user = LC.UsersInfo.Instance.getUserBySeatID(data.seat_id); //找到座位号对应的用户，需要其客户端对应的座位号
                var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //座位的牌布局对象
                cardMod.initHandCards(cardMod.direction, data.card_list);
            }
        };
        /**
         * Test换牌
         */
        GameLayer.prototype.ui_changeCard = function (event) {
            console.log(this.TAG + " ui_changeCard: " + JSON.stringify(event.data.info));
            var data = event.data.info;
            var user = LC.UsersInfo.Instance.getUserBySeatID(data.seat_id); //找到座位号对应的用户，需要其客户端对应的座位号
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //座位的牌布局对象
            cardMod.initHandCards(cardMod.direction, data.hand_card);
            if (data.hand_card.length == 14) {
                cardMod._removeDrawCard();
                cardMod.moveCardToDrawCard(cardMod.direction, data.hand_card[0]); //如果换来了14张牌，一张牌放到旁边
            }
        };
        /**
         * 发牌补花
         */
        GameLayer.prototype.ui_buHuaDealCard = function (event) {
            console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
            var info = event.data.info;
            var user = LC.UsersInfo.Instance.getUserBySeatID(info.seat_id); //找到座位号对应的用户，需要其客户端对应的座位号
            console.log("\u5BA2\u6237\u7AEF\u5EA7\u4F4D\u53F7\u4E3A" + user.client_seatID + "\u53D1\u724C\u8865\u82B1");
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //座位的牌布局对象
            cardMod.appliqueCards(cardMod.direction, info.hua_card, info.bu_cards);
        };
        /**
         * 游戏补花
         */
        GameLayer.prototype.ui_buHuaGameCard = function (event) {
            console.log(this.TAG + " ui_dealCard: " + JSON.stringify(event.data.info));
            var info = event.data.info;
            var user = LC.UsersInfo.Instance.getUserBySeatID(info.seat_id); //找到座位号对应的用户，需要其客户端对应的座位号
            console.log("\u5BA2\u6237\u7AEF\u5EA7\u4F4D\u53F7\u4E3A" + user.client_seatID + "\u6E38\u620F\u8865\u82B1");
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //座位的牌布局对象
            cardMod.addDrawCard(cardMod.direction, info.hua_card_list[0]);
        };
        /**
         * 绑定用户模型在userHead上
         */
        GameLayer.prototype.ui_otherPlayerEnterRoom = function (event) {
            console.log(this.TAG + " ui_otherPlayerEnterRoom: " + JSON.stringify(event.data));
            var user = event.data.user;
            var userHead = this.seatsUI[user.client_seatID].getChildAt(0); //头像UI对象
            userHead.UserModel = user;
        };
        /**
         * 摸牌，轮到谁，谁的灯亮，并且开启倒计时
         */
        GameLayer.prototype.ui_drawCard = function (event) {
            console.log(this.TAG + " ui_drawCard: " + JSON.stringify(event.data.info));
            var info = event.data.info;
            var user = LC.UsersInfo.Instance.getUserBySeatID(info.seat_id);
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1); //座位的牌布局对象
            this.disc.lightBright(cardMod.direction); //倒计时在此接口加入
            cardMod.addDrawCard(cardMod.direction, info.card_list[0]); //添加摸牌对象
        };
        /**
         * 服务器告诉玩家可以进行什么操作
         */
        GameLayer.prototype.ui_canAct = function (event) {
            console.log(this.TAG + " ui_canAct: " + JSON.stringify(event.data.info));
            var info = event.data.info;
            this._parseActInfo(info);
        };
        /**
         * 解析推送玩家叫牌的信息，分别对UI进行操作
         */
        GameLayer.prototype._parseActInfo = function (info) {
            var user = LC.UsersInfo.Instance.getUserBySeatID(info.seat_id);
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1);
            for (var key in info.act_info) {
                console.log("_parseActInfo " + LC.ACT[key]);
                switch (Number(key)) {
                    case LC.ACT.CHU:
                        cardMod.canOutACard = true;
                        this.disc.lightBright(cardMod.direction); //倒计时在此接口加入
                        cardMod.moveCardToDrawCard(cardMod.direction, info.act_info[key].card);
                        break;
                    case LC.ACT.GUO:
                    case LC.ACT.CHI:
                    case LC.ACT.PENG:
                    case LC.ACT.AN_GANG:
                    case LC.ACT.BU_GANG:
                    case LC.ACT.DIAN_GANG:
                    case LC.ACT.DIAN_HU:
                    case LC.ACT.ZI_MO:
                        //可以进行某种ACT操作，显示操作actHandler
                        this.actHandler.visible = true;
                        this.actHandler.addLayout(Number(key), info.act_info[key]);
                        break;
                    case LC.ACT.TING:
                        break;
                }
            }
        };
        /**
         * cardModeLayout发过来的通知选牌完成
         */
        GameLayer.prototype.ui_selectCardComplete = function (event) {
            console.log(this.TAG + " ui_selectCardComplete: " + JSON.stringify(event.data.cardValue));
            var cardValue = event.data.cardValue;
            this._ctrl.actChuCard(cardValue);
        };
        /**
         * 服务器通知客户端打有人作出了相应的操作
         */
        GameLayer.prototype.ui_actAleady = function (event) {
            console.log(this.TAG + " ui_actAleady: " + JSON.stringify(event.data.info));
            var info = event.data.info;
            this._parseActResponse(info);
        };
        /**
         * 解析推送玩家动作响应协议 (推送给所有人)
         */
        GameLayer.prototype._parseActResponse = function (info) {
            var user = LC.UsersInfo.Instance.getUserBySeatID(info.seat_id);
            var cardMod = this.seatsUI[user.client_seatID].getChildAt(1);
            this.actHandler.hide(); //做了操作后 此可以隐藏
            var deleteList = [];
            var combList = [];
            console.log("_parseActResponse" + LC.ACT[info.act_type]);
            switch (info.act_type) {
                case LC.ACT.CHU:
                    this._currentOutCardContainer = cardMod.outACard(cardMod.direction, info.card_list[0], this._cardPointer);
                    break;
                case LC.ACT.PENG:
                    this.disc.lightBright(cardMod.direction); //倒计时在此接口加入，其他人接收不到101001的消息，通过此来转移指针
                    //组合牌的显示，以及手牌的删除
                    this._addCombArray(2, deleteList, info.card_list[0]);
                    this._addCombArray(3, combList, info.card_list[0]);
                    cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Peng);
                    //移除outlist的牌
                    this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
                    break;
                case LC.ACT.CHI:
                    this.disc.lightBright(cardMod.direction); //倒计时在此接口加入
                    //组合牌的显示，以及手牌的删除
                    deleteList = ArrayUtils.DeepCopy(info.card_list);
                    combList = ArrayUtils.DeepCopy(info.card_list);
                    var currentOutCardValue = this._currentOutCardContainer.getChildAt(0).value;
                    ArrayUtils.deleteByValue(deleteList, currentOutCardValue);
                    cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.Chi);
                    //移除outlist的牌
                    this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
                    break;
                case LC.ACT.DIAN_GANG:
                    this._addCombArray(3, deleteList, info.card_list[0]); //手牌删除3张
                    this._addCombArray(4, combList, info.card_list[0]); //添加组合牌
                    cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.MGang);
                    //移除outlist的牌
                    this._currentOutCardContainer && this._currentOutCardContainer.parent.removeChild(this._currentOutCardContainer);
                    break;
                case LC.ACT.BU_GANG:
                    //找到显示中的碰组合，并将其换成杠牌
                    cardMod.buGang(cardMod.direction, info.card_list[0]);
                    break;
                case LC.ACT.AN_GANG:
                    this._addCombArray(4, deleteList, info.card_list[0]); //
                    this._addCombArray(4, combList, info.card_list[0]);
                    cardMod.addCombToAllCardList(cardMod.direction, deleteList, combList, LC.CardCombType.AnGang);
                    break;
                case LC.ACT.DIAN_HU:
                    break;
                case LC.ACT.ZI_MO:
                    break;
            }
        };
        GameLayer.prototype._addCombArray = function (repeatCount, arr, value) {
            for (var i = 0; i < repeatCount; i++) {
                arr.push(value);
            }
        };
        /**
         * 准备按钮点击
         */
        GameLayer.prototype._onReadyBtnClick = function () {
            this.btn_ready.visible = false;
            this._ctrl.onMySelfReady();
        };
        /**
         * 测试按钮点击
         */
        GameLayer.prototype._onTestBtnClick = function (event) {
            var btn = event.currentTarget;
            switch (btn) {
                case this.dealCard:
                    this._ctrl.test_Send(LC.TestType.DealCard, this._targetCardList);
                    break;
                case this.changeCard:
                    this._ctrl.test_Send(LC.TestType.ChangeCard, this._targetCardList, this._sourceCardList);
                    break;
                case this.confirmNextCard:
                    this._ctrl.test_Send(LC.TestType.ConfirmNextCard, this._targetCardList);
                    break;
                case this.selectSourceCard:
                    this.cardSelect_Panel.visible = true;
                    this._isSourceCard = true;
                    this._sourceCardList = [];
                    this._resetTestCard();
                    break;
                case this.selectTargetCard:
                    this.cardSelect_Panel.visible = true;
                    this._isSourceCard = false;
                    this._targetCardList = [];
                    this._resetTestCard();
                    break;
                case this.sure:
                    this.cardSelect_Panel.visible = false;
                    console.log("sourceCard:", this._sourceCardList, "\ntargetCard:", this._targetCardList);
                    break;
            }
        };
        return GameLayer;
    }(LC.Layer));
    GameLayer.count = 17;
    LC.GameLayer = GameLayer;
    __reflect(GameLayer.prototype, "LC.GameLayer");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayer.js.map