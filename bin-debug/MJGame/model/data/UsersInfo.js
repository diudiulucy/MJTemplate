var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 对用户信息列表进行管理
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var UsersInfo = (function (_super) {
        __extends(UsersInfo, _super);
        function UsersInfo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._users = {}; //所有的用户列表 userid做key
            return _this;
        }
        Object.defineProperty(UsersInfo, "Instance", {
            //为方便提示，加入此接口
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UsersInfo.prototype, "UsersList", {
            /**
             * 获取用户列表信息
             */
            get: function () {
                return this._users;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置对应的客户端座位号
         */
        UsersInfo.prototype._setClientSeatID = function (user) {
            if (user.user_id == UsersInfo.MySelf.user_id) {
                user.client_seatID = 0;
                UsersInfo.MySelf = user;
            }
            var offset = LC.Config.MaxPlayerCount - UsersInfo.MySelf.seat_id;
            user.client_seatID = (offset + user.seat_id) % LC.Config.MaxPlayerCount;
            console.log(user.user_id + "\u7684\u5BA2\u6237\u7AEF\u5EA7\u4F4D\u53F7\u4E3A" + user.client_seatID);
        };
        /**
         * 添加用户
         * @param user 用户对象
        */
        UsersInfo.prototype.addUser = function (user) {
            this._users[user.user_id] = user;
            this._setClientSeatID(user);
        };
        /**
         * 根据userID获取用户信息
         * @param userID
         * @returns 返回用户信息
         */
        UsersInfo.prototype.getUserById = function (userID) {
            return this._users[userID];
        };
        /**
         * 根据seatID获取用户信息
         * @param seatID
         * @returns 返回用户信息
         */
        UsersInfo.prototype.getUserBySeatID = function (seatID) {
            for (var key in this._users) {
                if (this._users[key].seat_id == seatID) {
                    return this._users[key];
                }
            }
        };
        /**
         * 是否所有的玩家进入准备状态
         */
        UsersInfo.prototype.isAllUsersReady = function () {
            var result = false;
            if (ArrayUtils.getObjectLength(this._users) != LC.Config.MaxPlayerCount)
                return false;
            for (var key in this._users) {
                if (this._users[key].status != LC.ReadyState.READY) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 删除用户信息
         * @param userID 用户ID
         */
        UsersInfo.prototype.deleteUser = function (userID) {
            delete this._users[userID];
        };
        return UsersInfo;
    }(LC.Single));
    LC.UsersInfo = UsersInfo;
    __reflect(UsersInfo.prototype, "LC.UsersInfo");
})(LC || (LC = {}));
//# sourceMappingURL=UsersInfo.js.map