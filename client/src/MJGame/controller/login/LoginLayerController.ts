/**
 * 登录层的控制器
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class LoginLayerController extends Controller {
		protected init() {
			super.init();
			this.SocketEventList = [
				// LC.SocketEvents.Rev100000,
				// LC.SocketEvents.Rev100002,
			];
		}

		/**测试账号登录*/
		public sendDebugLoginReq(name: string, password: string) {
			let url = LC.WEB_URL + "login";
			let data = { user: name, password: password };
			let param = JSON.stringify(data);
			// Http.post(url, param, this._loginResult, this);


			//test
			let str = JSON.stringify({
				"action": "LoginHandler",
				"data": { "diamond": 0, "uid": name, "avater_url": "https://impublic-res.oss-cn-shenzhen.aliyuncs.com/f5c7153f80aa66f7a4f2fd9e0d9b996b", "ip": "192.168.1.101", "sex": 1, "user": "test1", "password": "8222b2020c704671b9c51d6fdcfe776c", "port": 20000, "accid": 1, "skey": "30d148f652bfdf660b873313f0acda73", "name": "test1", "point": 0, "payment": 2, "is_visitor": 0 }, // 服务器数据对User进行封装？
				"ret": 0,
				"desc": "success"
			});
			let obj = <egret.Event>{
				currentTarget: {
					response: str
				}
			}
			this._loginResult(obj);

		}

		/**
	 		* 
		{
			"action": "LoginHandler",
			"data": { "diamond": 0, "uid": name, "avater_url": "https://impublic-res.oss-cn-shenzhen.aliyuncs.com/f5c7153f80aa66f7a4f2fd9e0d9b996b", "ip": "192.168.1.101", "sex": 1, "user": "test1", "password": "8222b2020c704671b9c51d6fdcfe776c", "port": 20000, "accid": 1, "skey": "30d148f652bfdf660b873313f0acda73", "name": "test1", "point": 0, "payment": 2, "is_visitor": 0 }, // 服务器数据对User进行封装？
			"ret": 0,
			"desc": "success"
		}
	 */
		private _loginResult(e: egret.Event) {
			let data = e.currentTarget.response;
			let Obj = JSON.parse(data);
			console.log("login success! data : ", Obj);
			if (Obj.ret == "0") {
				let ud = Obj.data;
				let user = new User();
				user.user_id = ud.uid;
				UsersInfo.MySelf = user;
				
				LC.Config.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
				LC.Config.MD5PASS = ud.password;

				this.gotoHall();
			} else {
				console.log("login error action:%s,ret:%s,desc:%s", Obj.action, Obj.ret, Obj.desc);
			}
		}

		private gotoHall() {
			let hallScene = new LC.HallScene();
			LC.SceneManager.Instance.replaceScene(hallScene);
		}
	}
}

