var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                LC.SocketEvents.Rev101002
            ];
        };
        /**
         *  玩家自己准备
         */
        GameLayerController.prototype.onMySelfReady = function () {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.ready = 1;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100100, JSON.stringify(obj));
        };
        /**
         *  玩家自己准备回调
         */
        GameLayerController.prototype.on_100100_event = function (event) {
            console.log(this.TAG + " on_100100_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("准备成功");
                LC.UsersInfo.MySelf.status = LC.ReadyState.READY;
            }
            else {
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
                console.log("\u73A9\u5BB6id\u4E3A" + obj.info.user_id + "\u8FDB\u5165\u51C6\u5907\u72B6\u6001");
                var user = LC.UsersInfo.Instance.getUserById(obj.info.user_id);
                user.status = LC.ReadyState.READY;
            }
            else {
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
            }
        };
        /**
         * 推送发牌消息
         */
        GameLayerController.prototype.on_101005_event = function (event) {
            console.log(this.TAG + " on_101005_event: " + event.data);
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
            }
            else {
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
            }
            else {
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
            }
            else {
            }
        };
        return GameLayerController;
    }(LC.Controller));
    LC.GameLayerController = GameLayerController;
    __reflect(GameLayerController.prototype, "LC.GameLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=GameLayerController.js.map