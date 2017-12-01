/**
 * Socket协议事件
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var SocketEvents;
    (function (SocketEvents) {
        /**
         * Game
         */
        SocketEvents[SocketEvents["Send100000"] = 100000] = "Send100000";
        SocketEvents[SocketEvents["Send100002"] = 100002] = "Send100002";
        SocketEvents[SocketEvents["Send100010"] = 100010] = "Send100010";
        SocketEvents[SocketEvents["Send100100"] = 100100] = "Send100100";
        SocketEvents[SocketEvents["Send100101"] = 100101] = "Send100101";
        SocketEvents[SocketEvents["Send100102"] = 100102] = "Send100102";
        SocketEvents[SocketEvents["Send100103"] = 100103] = "Send100103";
        SocketEvents[SocketEvents["Send100104"] = 100104] = "Send100104";
        SocketEvents[SocketEvents["Send100110"] = 100110] = "Send100110";
        SocketEvents[SocketEvents["Send100111"] = 100111] = "Send100111";
        SocketEvents[SocketEvents["Send100120"] = 100120] = "Send100120";
        SocketEvents[SocketEvents["Send100130"] = 100130] = "Send100130";
        SocketEvents[SocketEvents["Send100140"] = 100140] = "Send100140";
        SocketEvents[SocketEvents["Send100999"] = 100999] = "Send100999";
        SocketEvents[SocketEvents["Rev100000"] = 100000] = "Rev100000";
        //  Rev100002 = 100002,             //接收登录    
        SocketEvents[SocketEvents["Rev100010"] = 100010] = "Rev100010";
        //  Rev100100 = 100100,             //接收玩家准备，取消准备   
        //  Rev100101 = 100101,             //接收创建好友桌     
        //  Rev100102 = 100102,             //接收加入好友桌     
        SocketEvents[SocketEvents["Rev100103"] = 100103] = "Rev100103";
        SocketEvents[SocketEvents["Rev100104"] = 100104] = "Rev100104";
        SocketEvents[SocketEvents["Rev100110"] = 100110] = "Rev100110";
        SocketEvents[SocketEvents["Rev100111"] = 100111] = "Rev100111";
        SocketEvents[SocketEvents["Rev100120"] = 100120] = "Rev100120";
        SocketEvents[SocketEvents["Rev100130"] = 100130] = "Rev100130";
        //  Rev100140 = 100140,             //接收玩家叫牌    
        //  Rev100999 = 100999,             //接收测试接口消息 
        SocketEvents[SocketEvents["Rev101001"] = 101001] = "Rev101001";
        SocketEvents[SocketEvents["Rev101002"] = 101002] = "Rev101002";
        SocketEvents[SocketEvents["Rev101003"] = 101003] = "Rev101003";
        SocketEvents[SocketEvents["Rev101004"] = 101004] = "Rev101004";
        SocketEvents[SocketEvents["Rev101005"] = 101005] = "Rev101005";
        SocketEvents[SocketEvents["Rev101006"] = 101006] = "Rev101006";
        SocketEvents[SocketEvents["Rev101007"] = 101007] = "Rev101007";
        SocketEvents[SocketEvents["Rev101008"] = 101008] = "Rev101008";
        //  Rev101009 = 101009,             //推送某玩家叫牌的结果
        SocketEvents[SocketEvents["Rev101100"] = 101100] = "Rev101100";
        SocketEvents[SocketEvents["Rev101101"] = 101101] = "Rev101101";
        SocketEvents[SocketEvents["Rev101102"] = 101102] = "Rev101102";
        SocketEvents[SocketEvents["Rev101103"] = 101103] = "Rev101103";
        SocketEvents[SocketEvents["Rev101104"] = 101104] = "Rev101104";
        SocketEvents[SocketEvents["Rev101105"] = 101105] = "Rev101105";
        SocketEvents[SocketEvents["Rev101106"] = 101106] = "Rev101106";
        SocketEvents[SocketEvents["Rev101107"] = 101107] = "Rev101107";
        SocketEvents[SocketEvents["Rev101108"] = 101108] = "Rev101108";
        SocketEvents[SocketEvents["Rev101109"] = 101109] = "Rev101109";
        SocketEvents[SocketEvents["Rev101110"] = 101110] = "Rev101110";
        SocketEvents[SocketEvents["Rev101112"] = 101112] = "Rev101112";
        SocketEvents[SocketEvents["Send100112"] = 100112] = "Send100112";
    })(SocketEvents = LC.SocketEvents || (LC.SocketEvents = {}));
})(LC || (LC = {}));
//# sourceMappingURL=SocketEvents.js.map