var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 游戏层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var GameLayerController = (function (_super) {
        __extends(GameLayerController, _super);
        function GameLayerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameLayerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Send100100,
                LC.SocketEvents.Rev101107,
                LC.SocketEvents.Rev101106,
                LC.SocketEvents.Rev101004,
                LC.SocketEvents.Rev101005,
                LC.SocketEvents.Rev101008,
                LC.SocketEvents.Rev101007,
                LC.SocketEvents.Rev101002,
                LC.SocketEvents.Rev101001,
                LC.SocketEvents.Rev101112,
                LC.SocketEvents.Send100140,
                LC.SocketEvents.Send100999,
                LC.SocketEvents.Rev101006,
                LC.SocketEvents.Rev101003,
                LC.SocketEvents.Rev101110,
                LC.SocketEvents.Rev101109,
                LC.SocketEvents.Send100103 //发送玩家退出桌子  
            ];
        };
        /**
         *  玩家自己准备
         */
        GameLayerController.prototype.onMySelfReady = function (readystate) {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.ready = readystate;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100100, JSON.stringify(obj));
        };
        /**
         *  玩家自己出牌
         */
        GameLayerController.prototype.actChuCard = function (cardValue) {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.act = LC.ACT.CHU;
            //动作参数
            var actParams = {};
            actParams.card = cardValue;
            var actParamsStr = JSON.stringify(actParams);
            obj.act_params = actParamsStr;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100140, JSON.stringify(obj));
        };
        GameLayerController.prototype.exitRoom = function () {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100103, JSON.stringify(obj));
        };
        /**
         * 测试接口
         */
        GameLayerController.prototype.test_Send = function (test_type, target_card, source_card) {
            if (source_card === void 0) { source_card = []; }
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.test_type = test_type;
            var test_param = {};
            test_param.source_card = source_card;
            test_param.target_card = target_card;
            var testParamsStr = JSON.stringify(test_param);
            obj.test_params = testParamsStr;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100999, JSON.stringify(obj));
        };
        /**
         *  玩家自己准备回调
         */
        GameLayerController.prototype.on_100100_event = function (event) {
            console.log(this.TAG + " on_100100_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                if (obj.info.ready == LC.ReadyState.GetReady) {
                    console.log("准备成功");
                    LC.UsersInfo.MySelf.status = LC.UserState.READY;
                    this._isAllUsersReady();
                }
                else if (obj.info.ready == LC.ReadyState.Cancel) {
                    LC.UsersInfo.MySelf.status = LC.UserState.UNREADY;
                }
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家进入房间
         */
        GameLayerController.prototype.on_101107_event = function (event) {
            console.log(this.TAG + " on_101107_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u8FDB\u5165\u623F\u95F4");
                var user = new LC.User();
                for (var key in obj.info) {
                    user[key] = obj.info[key];
                }
                LC.UsersInfo.Instance.addUser(user);
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.OtherPlayer_EnterROOM, { user: user });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家退出房间
         */
        GameLayerController.prototype.on_100103_event = function (event) {
            console.log(this.TAG + " on_101107_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u8FDB\u5165\u623F\u95F4");
                // let user = new User();
                // for (let key in obj.info) {
                // 	user[key] = obj.info[key];
                // }
                // UsersInfo.Instance.addUser(user);
                // EventManager.getInstance().dispatchCustomEvent(CustomEvents.OtherPlayer_EnterROOM, { user: user });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家连接状态
         */
        GameLayerController.prototype.on_101110_event = function (event) {
            console.log(this.TAG + " on_101110_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u5F53\u524D\u72B6\u6001\u4E3A" + LC.NetState[obj.info.is_online]);
                var user = LC.UsersInfo.Instance.getUserById(obj.info.user_id);
                user.is_online = obj.info.is_online;
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家断线重连
         */
        GameLayerController.prototype.on_101109_event = function (event) {
            console.log(this.TAG + " on_101109_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u65AD\u7EBF\u91CD\u8FDE\u6210\u529F");
                var user = LC.UsersInfo.Instance.getUserById(obj.info.user_id);
                user.is_online = LC.NetState.ONLINE;
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家进入准备
         */
        GameLayerController.prototype.on_101106_event = function (event) {
            console.log(this.TAG + " on_101106_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                var user = LC.UsersInfo.Instance.getUserById(obj.info.user_id);
                if (obj.info.ready == LC.ReadyState.GetReady) {
                    console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u8FDB\u5165\u51C6\u5907\u72B6\u6001");
                    user.status = LC.UserState.READY;
                    this._isAllUsersReady();
                }
                else if (obj.info.ready == LC.ReadyState.Cancel) {
                    console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u53D6\u6D88\u51C6\u5907");
                    user.status = LC.UserState.UNREADY;
                }
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 检查是否所有的玩家准备好
         */
        GameLayerController.prototype._isAllUsersReady = function () {
            if (LC.UsersInfo.Instance.isAllUsersReady()) {
                LC.DeskInfo.diceValue = [-1, -1]; //骰子未定，播放动画
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.AllUsersReady);
            }
        };
        /**
         * 推送定庄信息（摇骰子）
         */
        GameLayerController.prototype.on_101004_event = function (event) {
            console.log(this.TAG + " on_101004_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                var seat_id = obj.info.bank_seat_id;
                var user = LC.UsersInfo.Instance.getUserBySeatID(seat_id);
                console.log("\u5BA2\u6237\u7AEF\u5EA7\u4F4D\u4E3A" + user.client_seatID + "\u662F\u5E84\u5BB6");
                user.isBanker = true;
                LC.DeskInfo.diceValue = obj.info.dice;
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送发牌消息 游戏开始发牌每人13张
         */
        GameLayerController.prototype.on_101005_event = function (event) {
            console.log(this.TAG + " on_101005_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.DealCard, { all_cards: obj.info.all_cards });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送发牌补花
         */
        GameLayerController.prototype.on_101008_event = function (event) {
            console.log(this.TAG + " on_101008_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.BuHua_DealCard, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家摸牌
         */
        GameLayerController.prototype.on_101002_event = function (event) {
            console.log(this.TAG + " on_101002_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.DeskInfo.remain_count = obj.info.remain_count;
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.DrawCard, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家游戏补花
         */
        GameLayerController.prototype.on_101007_event = function (event) {
            console.log(this.TAG + " on_101007_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.BuHua_GameCard, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家叫牌(只推送给自己)
         */
        GameLayerController.prototype.on_101001_event = function (event) {
            console.log(this.TAG + " on_101001_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.CanAct, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 接收玩家叫牌
         */
        GameLayerController.prototype.on_100140_event = function (event) {
            console.log(this.TAG + " on_101001_event: " + event.data);
            var data = event.data;
            //暂时不做处理
            // // let obj = <Rev101001>JSON.parse(data);
            // if (obj.code == 200) {//success
            // } else {//fail
            // }
        };
        /**
         * 推送玩家动作响应,以及进行了什么操作
         */
        GameLayerController.prototype.on_101112_event = function (event) {
            console.log(this.TAG + " on_101112_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.ACT_Aleady, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送玩家结算
         */
        GameLayerController.prototype.on_101006_event = function (event) {
            console.log(this.TAG + " on_101006_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.CheckOut, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 推送游戏结束
         */
        GameLayerController.prototype.on_101003_event = function (event) {
            console.log(this.TAG + " on_101003_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.GameOver, { info: obj.info });
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        /**
         * 测试接口
         */
        GameLayerController.prototype.on_100999_event = function (event) {
            console.log(this.TAG + " on_100999_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                switch (obj.info.test_type) {
                    case LC.TestType.DealCard://发牌不做处理
                        break;
                    case LC.TestType.ChangeCard:
                        LC.EventManager.getInstance().dispatchCustomEvent(CustomEvents.ChangeCard, { info: obj.info });
                        break;
                }
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
            }
        };
        return GameLayerController;
    }(LC.Controller));
    LC.GameLayerController = GameLayerController;
    __reflect(GameLayerController.prototype, "LC.GameLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayerController.js.map