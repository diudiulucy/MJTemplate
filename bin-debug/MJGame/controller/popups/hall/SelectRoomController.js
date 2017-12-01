var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 选择加入或者创建房间的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var SelectRoomController = (function (_super) {
        __extends(SelectRoomController, _super);
        //加入构造器，代码才可以跳转到此类，否则直接跳到父类
        function SelectRoomController() {
            return _super.call(this) || this;
        }
        SelectRoomController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                // LC.SocketEvents.Rev100000,
                // LC.SocketEvents.Rev100002,
                LC.SocketEvents.Send100101,
            ];
        };
        /**创建好友房消息返回 */
        SelectRoomController.prototype.on_100101_event = function (event) {
            console.log(this.TAG + " on_100101_event: ");
            var data = event.data;
            var obj = JSON.parse(data);
            if (obj.code == 200) {
                console.log("创建好友房成功");
                LC.DeskInfo.deskID = obj.info.desk_id;
                var user = new LC.User();
                for (var key in obj.info.seat_info[0]) {
                    user[key] = obj.info.seat_info[0][key];
                }
                LC.UsersInfo.MySelf = user;
                LC.UsersInfo.Instance.addUser(LC.UsersInfo.MySelf);
                var gameScene = new LC.GameScene();
                LC.SceneManager.Instance.replaceScene(gameScene);
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(errorInfo.info);
            }
        };
        /**创建房间*/
        SelectRoomController.prototype.createRoom = function () {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100101, JSON.stringify(obj));
        };
        return SelectRoomController;
    }(LC.Controller));
    LC.SelectRoomController = SelectRoomController;
    __reflect(SelectRoomController.prototype, "LC.SelectRoomController");
})(LC || (LC = {}));
//# sourceMappingURL=SelectRoomController.js.map