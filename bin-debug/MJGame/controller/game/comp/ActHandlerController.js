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
 * 操作吃碰杠牌的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var ActHandlerController = (function (_super) {
        __extends(ActHandlerController, _super);
        function ActHandlerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActHandlerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [];
        };
        /**
         * 发送过叫牌
         */
        ActHandlerController.prototype.actGuo = function () {
            //动作参数
            var actParams = {};
            this._sendData(LC.ACT.GUO, actParams);
        };
        /**
         * 发送吃叫牌
         */
        ActHandlerController.prototype.actChi = function (used_card) {
            //动作参数
            var actParams = {};
            actParams.used_card = used_card;
            this._sendData(LC.ACT.CHI, actParams);
        };
        /**
         * 发送碰叫牌
         */
        ActHandlerController.prototype.actPeng = function () {
            //动作参数
            var actParams = {};
            this._sendData(LC.ACT.PENG, actParams);
        };
        /**
         * 发送点杠叫牌
         */
        ActHandlerController.prototype.actGang = function (act, used_card) {
            //动作参数
            var actParams = {};
            used_card && (actParams.used_card = used_card);
            this._sendData(act, actParams);
        };
        /**
         * 发送胡叫牌
         */
        ActHandlerController.prototype.actHu = function (act) {
            //动作参数
            var actParams = {};
            this._sendData(act, actParams);
        };
        /**
         * 叫牌的格式差不多，抽象出来
         */
        ActHandlerController.prototype._sendData = function (act, actParams) {
            var obj = {};
            obj.user_id = LC.UsersInfo.MySelf.user_id;
            obj.act = act;
            var actParamStr = JSON.stringify(actParams);
            obj.act_params = actParamStr;
            LC.Socket.Instance.sendData(LC.SocketEvents.Send100140, JSON.stringify(obj));
        };
        return ActHandlerController;
    }(LC.Controller));
    LC.ActHandlerController = ActHandlerController;
    __reflect(ActHandlerController.prototype, "LC.ActHandlerController");
})(LC || (LC = {}));
//# sourceMappingURL=ActHandlerController.js.map