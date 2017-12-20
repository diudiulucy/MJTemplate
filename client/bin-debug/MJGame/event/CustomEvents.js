/**
 * 客户端的消息事件(避免和socket的事件混淆，在此用字符串的形式)
 * @author lucywang
 * @date 2017/10/19
 */
var CustomEvents;
(function (CustomEvents) {
    CustomEvents.OtherPlayer_EnterROOM = "otherPlayerEnterRoom"; //其他玩家进入房间
    CustomEvents.DealCard = "dealCard"; //发牌
    CustomEvents.DrawCard = "drawCard"; //摸牌
    CustomEvents.BuHua_DealCard = "buHuaDealCard"; //发牌补花
    CustomEvents.BuHua_GameCard = "buHuaGameCard"; //发牌补花
    CustomEvents.AllUsersReady = "allUsersReady";
    CustomEvents.CanAct = "canAct"; //可以进行什么操作
    CustomEvents.ACT_Aleady = "actAleady"; //服务器通知操作完成，UI进行更新
    CustomEvents.ChangeCard = "changeCard"; //测试的时候换牌操作
    CustomEvents.CheckOut = "checkOut"; //结算
    CustomEvents.GameOver = "gameOver"; //游戏结束
})(CustomEvents || (CustomEvents = {}));
//# sourceMappingURL=CustomEvents.js.map