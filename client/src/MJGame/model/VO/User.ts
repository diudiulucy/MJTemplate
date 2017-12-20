/**
 * 用户数据
 */
module LC {

	export enum UserState {
		UNREADY = 1,    // 待准备
		READY = 2,     // 准备中
		PLAYING = 3,    // 游戏中
		ESCAPE = 4,     // 逃跑
	}

	export enum NetState {
		OFFLINE = 0,	// 0 掉线  
		ONLINE = 1,		// 1 在线
	}

	export class User {
		/**用户ID*/
		public user_id: number;
		public nick: string = "";
		public seat_id: number;//服务器座位号
		public point: number;
		public status: UserState;//用户状态
		public client_seatID: number;//客户端座位号  0,1,2,3取值  保留seat_id的逆时针顺序，与服务器座位号弱关联
		public isBanker: boolean = false;//是否是庄家
		public is_online: NetState; 
	}
}