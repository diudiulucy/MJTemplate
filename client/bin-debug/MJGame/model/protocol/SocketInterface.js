/**
 * 定义socket协议发送和收到的数据的格式,好处是提前定义接口的字段，减少与服务器的反复确认
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var ReadyState;
    (function (ReadyState) {
        ReadyState[ReadyState["Cancel"] = 0] = "Cancel";
        ReadyState[ReadyState["GetReady"] = 1] = "GetReady";
    })(ReadyState = LC.ReadyState || (LC.ReadyState = {}));
    /**
    * 动作类型
    */
    var ACT;
    (function (ACT) {
        ACT[ACT["GUO"] = 0] = "GUO";
        ACT[ACT["CHU"] = 10] = "CHU";
        ACT[ACT["CHI"] = 20] = "CHI";
        ACT[ACT["PENG"] = 30] = "PENG";
        ACT[ACT["DIAN_GANG"] = 40] = "DIAN_GANG";
        ACT[ACT["BU_GANG"] = 50] = "BU_GANG";
        ACT[ACT["AN_GANG"] = 60] = "AN_GANG";
        ACT[ACT["TING"] = 70] = "TING";
        ACT[ACT["DIAN_HU"] = 80] = "DIAN_HU";
        ACT[ACT["ZI_MO"] = 90] = "ZI_MO";
    })(ACT = LC.ACT || (LC.ACT = {}));
    var TestType;
    (function (TestType) {
        TestType[TestType["ChangeCard"] = 1] = "ChangeCard";
        TestType[TestType["ConfirmNextCard"] = 2] = "ConfirmNextCard";
        TestType[TestType["checkLastCard"] = 3] = "checkLastCard";
        TestType[TestType["DealCard"] = 4] = "DealCard";
    })(TestType = LC.TestType || (LC.TestType = {}));
    var CheckOutType;
    (function (CheckOutType) {
        CheckOutType[CheckOutType["Hu"] = 1] = "Hu";
        CheckOutType[CheckOutType["Gang"] = 2] = "Gang";
        CheckOutType[CheckOutType["FollowBanker"] = 3] = "FollowBanker";
    })(CheckOutType = LC.CheckOutType || (LC.CheckOutType = {}));
    var HuType;
    (function (HuType) {
        //  4×3+2 类
        HuType[HuType["PI_HU"] = 1000] = "PI_HU";
        HuType[HuType["PENG_PENG_HU"] = 1001] = "PENG_PENG_HU";
        //  7×2 类
        HuType[HuType["QI_XIAO_DUI"] = 2000] = "QI_XIAO_DUI";
        //  13×1 类
        HuType[HuType["SHI_SAN_YAO"] = 3000] = "SHI_SAN_YAO";
        //  公用类, 可能出现在以上各类胡法中
        HuType[HuType["QING_YI_SE"] = 9001] = "QING_YI_SE";
    })(HuType || (HuType = {}));
    // 房间的状态
    var DeskStatus;
    (function (DeskStatus) {
        DeskStatus[DeskStatus["WAIT_SET"] = 1] = "WAIT_SET";
        DeskStatus[DeskStatus["WAIT_AGREE"] = 2] = "WAIT_AGREE";
        DeskStatus[DeskStatus["PLAYING"] = 3] = "PLAYING";
        DeskStatus[DeskStatus["OVER"] = 4] = "OVER";
    })(DeskStatus = LC.DeskStatus || (LC.DeskStatus = {}));
})(LC || (LC = {}));
//# sourceMappingURL=SocketInterface.js.map