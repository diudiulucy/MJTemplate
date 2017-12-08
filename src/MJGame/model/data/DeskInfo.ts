/**
 * 桌子相关信息
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class DeskInfo {
		public static deskID:number;//房间号
		public static diceValue:[number,number];//骰子值
		public static remain_count:number;//剩余牌值
		public static status:DeskStatus;
		public static gameData:Object;
	}
}