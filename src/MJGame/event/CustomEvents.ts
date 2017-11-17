/**
 * 客户端的消息事件(避免和socket的事件混淆，在此用字符串的形式)
 * @author lucywang
 * @date 2017/10/19
 */
module CustomEvents {
	export const UPDATE_VIEW: string = "updateView";

	export const OtherPlayer_EnterROOM:string = "otherPlayerEnterRoom";
}