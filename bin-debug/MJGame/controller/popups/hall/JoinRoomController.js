var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 加入房间的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var JoinRoomController = (function (_super) {
        __extends(JoinRoomController, _super);
        //加入构造器，代码才可以跳转到此类，否则直接跳到父类
        function JoinRoomController() {
            return _super.call(this) || this;
        }
        JoinRoomController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Send100102,
            ];
        };
        /**加入好友房间返回 */
        JoinRoomController.prototype.on_100102_event = function (event) {
            console.log(this.TAG + " on_100102_event: ");
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("加入好友房间成功");
                //记录桌子信息
                LC.DeskInfo.deskID = obj.info.desk_id;
                this._findAndSetMyself(obj.info.seat_info);
                //加入User
                for (var _i = 0, _a = obj.info.seat_info; _i < _a.length; _i++) {
                    var value = _a[_i];
                    var user = new LC.User();
                    for (var key in value) {
                        user[key] = value[key];
                    }
                    LC.UsersInfo.Instance.addUser(user);
                }
                var gameScene = new LC.GameScene();
                LC.SceneManager.Instance.replaceScene(gameScene);
            }
            else {
            }
        };
        /**
         * 找出自己并赋值
         */
        JoinRoomController.prototype._findAndSetMyself = function (seat_info) {
            for (var _i = 0, seat_info_1 = seat_info; _i < seat_info_1.length; _i++) {
                var value = seat_info_1[_i];
                var user = new LC.User();
                for (var key in value) {
                    user[key] = value[key];
                }
                (user.user_id == LC.UsersInfo.MySelf.user_id) && (LC.UsersInfo.MySelf = user);
            }
        };
        /**
         * 加入好友房间
         */
        JoinRoomController.prototype.joinFriendRoom = function (roomNo) {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.desk_id = roomNo;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100102, JSON.stringify(obj));
        };
        return JoinRoomController;
    }(LC.Controller));
    LC.JoinRoomController = JoinRoomController;
    __reflect(JoinRoomController.prototype, "LC.JoinRoomController");
})(LC || (LC = {}));
//# sourceMappingURL=JoinRoomController.js.map