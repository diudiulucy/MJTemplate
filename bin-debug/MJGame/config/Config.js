var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏的配置
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    // 版本控制在这里
    var Config = (function () {
        function Config() {
        }
        Config.default_res_json = "resource/default.res.json";
        Config.default_thm_json = "resource/default.thm.json";
        Config.default_resource = "resource/";
        Config.SERVER_URL = "ws://192.168.1.101:20000";
        Config.MD5PASS = "8222b2020c704671b9c51d6fdcfe776c";
        // public static MaxPlayerCount:number = 3;//房间最大玩家数
        Config.MaxPlayerCount = 4; //房间最大玩家数
        return Config;
    }());
    LC.Config = Config;
    __reflect(Config.prototype, "LC.Config");
    LC.WEB_URL = "http://119.23.66.138:50002/majapi/";
})(LC || (LC = {}));
//# sourceMappingURL=Config.js.map