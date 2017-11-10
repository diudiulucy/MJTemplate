/**
 * 
 */
module LC {
	/**性别类型*/
	enum SEX_TYPE {
		boy = 1,
		girl = 2,
		unknow = 3
	}
	export class User {
		/**用户ID*/
		public userID: number;
		/**昵称*/
		public nickName: string;
		/**用户头像地址*/
		public headUrl:string;
		/**是否点击分享链接进入，并玩了一局游戏  1是，0否*/
		public hadinvited: number;
		/**验证用户有效性*/
		public skey: string;
		/**过期时间**/
		public isOvertime: number;
		/**桌子名称**/
		public excluroomName: string;
		/**桌子号**/
		public excluroomCode: string;
		/**游客标识 */
		public isVisitor: number;
		/**玩家性别*/
		public sex: SEX_TYPE;
	}
}