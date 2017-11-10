var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var LoginLayerController = (function (_super) {
        __extends(LoginLayerController, _super);
        function LoginLayerController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginLayerController.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SocketEventList = [
                LC.SocketEvents.Rev100000,
            ];
        };
        LoginLayerController.prototype.sendDebugLoginReq = function (data) {
            var url = LC.WEB_URL + "login";
            var param = JSON.stringify(data);
            LC.Http.post(url, param, this._loginResult, this);
        };
        /**
            *
        {
        "action": "LoginHandler",
        "data": {"diamond": 0, "uid": 9123, "avater_url": "https://impublic-res.oss-cn-shenzhen.aliyuncs.com/f5c7153f80aa66f7a4f2fd9e0d9b996b", "ip": "119.23.147.80", "sex": 1, "user": "test1", "password": "8222b2020c704671b9c51d6fdcfe776c", "port": 10101, "accid": 1, "skey": "30d148f652bfdf660b873313f0acda73", "name": "test1", "point": 0, "payment": 2, "is_visitor": 0}, // 服务器数据对User进行封装？
        "ret": 0,
        "desc": "success"}
     */
        LoginLayerController.prototype._loginResult = function (e) {
            var data = e.currentTarget.response;
            var Obj = JSON.parse(data);
            console.log("login success! data : ", Obj);
            if (Obj.ret == "0") {
                var ud = Obj.data;
                var user = new LC.User();
                user.userID = ud.uid;
                user.nickName = ud.name;
                user.headUrl = ud.avater_url == "1" ? "" : ud.avater_url;
                user.hadinvited = ud.hadinvited;
                user.skey = ud.skey;
                user.isOvertime = ud.is_overtime;
                user.excluroomName = ud.excluroom_name;
                user.excluroomCode = ud.excluroom_code;
                user.sex = ud.sex;
                LC.Config.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
                LC.Config.MD5PASS = ud.password;
                this.gotoHall();
            }
            else {
                console.log("login error action:%s,ret:%s,desc:%s", Obj.action, Obj.ret, Obj.desc);
            }
        };
        LoginLayerController.prototype.gotoHall = function () {
            var hallScene = new LC.HallScene();
            LC.SceneManager.Instance.replaceScene(hallScene);
        };
        LoginLayerController.prototype.on_100000_event = function (event) {
            console.log(this.TAG + " on_100000_event: " + event.data);
        };
        return LoginLayerController;
    }(LC.Controller));
    LC.LoginLayerController = LoginLayerController;
    __reflect(LoginLayerController.prototype, "LC.LoginLayerController");
})(LC || (LC = {}));
//# sourceMappingURL=LoginLayerController.js.map