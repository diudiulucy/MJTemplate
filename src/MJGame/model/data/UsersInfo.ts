/**
 * 对用户信息列表进行管理
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class UsersInfo extends Single {
		private _users: Object = {};//所有的用户列表 userid做key
		public static MySelf: User;//自己的用户对象

		//为方便提示，加入此接口
		public static get Instance(): UsersInfo {
			return this.getInstance();
		}

		// /**获取自己用户信息*/
		// public get MySelf(): User {
		// 	return this.getUserById(UsersInfo._mySelf.user_id);
		// }

		// /**设置自己用户信息*/
		// public set MySelf(user: User) {
		// 	UsersInfo._mySelf = user;
		// }

		/**
		 * 获取用户列表信息
		 */
		public get UsersList() {
			return this._users;
		}

		/**
 		 * 设置对应的客户端座位号
 		 */
		private _setClientSeatID(user: User) {//注意客户端的座位号根据自己的座位来计算偏移位置，所以必须先对自己的服务器座位号赋值
			if (user.user_id == UsersInfo.MySelf.user_id) {
				user.client_seatID = 0;
				UsersInfo.MySelf = user;
			}

			let offset: number = LC.Config.MaxPlayerCount - UsersInfo.MySelf.seat_id;
			user.client_seatID = (offset + user.seat_id) % LC.Config.MaxPlayerCount;
			console.log(`${user.user_id}的客户端座位号为${user.client_seatID}`);
		}

		/**
   	     * 添加用户
   		 * @param user 用户对象
   		*/
		public addUser(user: User) {
			this._users[user.user_id] = user;
			this._setClientSeatID(user);
		}

		/**
	 	 * 根据userID获取用户信息
	     * @param userID 
	     * @returns 返回用户信息
	     */
		public getUserById(userID: number): User {
			return this._users[userID];
		}

		/**
	 	 * 根据seatID获取用户信息
	     * @param seatID 
	     * @returns 返回用户信息
	     */
		public getUserBySeatID(seatID: number): User {
			for (let key in this._users) {
				if (this._users[key].seat_id == seatID) {
					return this._users[key];
				}
			}
		}

		/**
   		 * 删除用户信息
   	     * @param userID 用户ID
   	     */
		public deleteUser(userID: number) {
			delete this._users[userID];
		}

	}
}