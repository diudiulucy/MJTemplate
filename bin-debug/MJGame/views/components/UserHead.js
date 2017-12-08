var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 用户头像UI(组件都继承自component)
 * 组件只提供接口不处理协议，由数据来驱动组件的视图变化
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var UserHead = (function (_super) {
        __extends(UserHead, _super);
        function UserHead() {
            var _this = _super.call(this) || this;
            _this.skinName = "Skin.UserHead";
            return _this;
        }
        UserHead.prototype._watchData = function () {
            eui.Binding.bindHandler(this._userModel, ["user_id"], this._userNameChange, this);
            eui.Binding.bindHandler(this._userModel, ["isBanker"], this._userIsBankerChange, this);
            eui.Binding.bindHandler(this._userModel, ["status"], this._userIsReadyChange, this);
            eui.Binding.bindHandler(this._userModel, ["is_online"], this._isOnlineChange, this);
        };
        UserHead.prototype._userNameChange = function (value) {
            if (value == null)
                return;
            console.log("_userNameChange");
            this.label_Name.text = value || "";
        };
        UserHead.prototype._userIsBankerChange = function (value) {
            if (value == null)
                return;
            console.log("_userIsBankerChange");
            this.img_banker.visible = value;
        };
        UserHead.prototype._userIsReadyChange = function (value) {
            if (value == null)
                return;
            console.log("_userIsReadyChange");
            this.label_ready.visible = (value == LC.UserState.READY) ? true : false;
        };
        UserHead.prototype._isOnlineChange = function (value) {
            if (value == null)
                return;
            console.log("_isOnlineChange");
            this.off_line.visible = (value == LC.NetState.OFFLINE) ? true : false;
        };
        Object.defineProperty(UserHead.prototype, "UserModel", {
            /**
             * 设置其数据模型
            */
            set: function (user) {
                this._userModel = user; //绑定数据模型后，对其观察，不同值的变化驱动UI变化
                this._watchData();
            },
            enumerable: true,
            configurable: true
        });
        return UserHead;
    }(eui.Component));
    LC.UserHead = UserHead;
    __reflect(UserHead.prototype, "LC.UserHead");
})(LC || (LC = {}));
//# sourceMappingURL=UserHead.js.map