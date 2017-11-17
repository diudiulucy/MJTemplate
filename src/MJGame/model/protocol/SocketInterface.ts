/**
 * 定义socket协议发送和收到的数据的格式,好处是提前定义接口的字段，减少与服务器的反复确认
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	/**
	 * 登录  
	 */
	export interface Send100002 {
		user_id: number;
		passwd: string;
	}

	export interface Rev100002 {
		code: number;
		info: loginInfo;
	}

	interface loginInfo{
		room:string;
		old_session:string;
	}

	/**
	 * 创建好友桌
	 */
	export interface Send100101 {
		user_id: number;
	}

	export interface Rev100101 {
		code: number;
		info: CreateDeskInfo;
		need_push: number;
	}

	interface CreateDeskInfo{
		desk_id:number;
		seat_info:Array<PlayerInfo>;
	}

	/**
	 * 准备
	 */
	export interface Send100100 {
		ready: number;		// 1:表示准备, 0:表示未准备
		user_id: number;
	}

	export interface Rev100100 {
		code: number;
		info: readyInfo;
	}

	interface readyInfo{
		ready:number;
	}

	/**
	 * 加入好友桌
	 */
	export interface Send100102 {
		user_id: number;
		desk_id: number;
	}

	export interface Rev100102 {
		code: number;
		info: JoinRoomInfo,
		need_push: number,
	}

	interface JoinRoomInfo{
		desk_id:number;
		seat_info:Array<PlayerInfo>;
	}

	/**
	 * 推送玩家进入房间
	 */
	export interface Rev101107 {
		code: number;
		info: PlayerInfo;
		need_push: number;
	}

	export interface PlayerInfo {
		status: number; //玩家是否准备 1表示未准备
		nick: string;
		seat_id: number;
		user_id: number;
		point: number;
	}

	/**
	 * 推送玩家准备
	 */
	export interface Rev101106 {
		 code:number;
		 info:ReadyInfo;
	}

	interface ReadyInfo {
		user_id:number;
		nick:string;
		ready:number;
	}

	/**
	 * 推送玩家定庄消息
	 */
	export interface Rev101004 {
		 code:number;
		 need_push:number;
		 info:BankerInfo;
	}

	 interface BankerInfo {
		 bank_seat_id:number;//庄家座位序号
		 dice:[number,number];//骰子值(一般是两个骰子)
	 }

	 /**
	 * 推送发牌消息
	 */
	 export interface Rev101005 {
		 code:number;
		 need_push:number;
		 info:DealCardInfo;
	 }

	 interface DealCardInfo {
		 all_cards:Array<CardInfo>;
	 }

	 interface CardInfo {
		 card_list:Array<number>;//具体牌的数据 
		 seat_id:number;//玩家座位序号
	 }

	  /**
	 * 推送发牌补花
	 */
	 export interface Rev101008 {
		 code:number;
		 need_push:number;
		 info:AppliqueInfo;
	 }

	 interface AppliqueInfo {
		 seat_id:number;	//玩家座位序号
		 hua_card:Array<number>; //花牌
		 bu_cards:Array<number>; //补来的牌,(如果是自己补花,则自己能看到补到的牌值)
	 }
	 

	 /**
	 * 推送玩家摸牌
	 */
	 export interface Rev101002 {
		 code:number;
		 need_push:number;
		 info:DrawCardInfo;
	 }
	 
	interface DrawCardInfo {
		 seat_id:number;		 	//玩家座位序号
		 card_list:Array<number>;	//摸到的牌
		 remain_count:number;		//剩余牌数
	 }
	
}