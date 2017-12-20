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
                LC.UsersInfo.Instance.addManyUsers(obj.info.seat_info);
                var gameScene = new LC.GameScene();
                LC.SceneManager.Instance.replaceScene(gameScene);
            }
            else {
                var errorInfo = JSON.parse(data);
                LC.Tips.show(LC.ErrorCodeManager.Instance.getErrorCode(errorInfo.code));
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