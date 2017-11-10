/**
 * 游戏的配置
 * @author lucywang
 * @date 2017/10/19
 */
module LC {

	// 版本控制在这里
	export class Config {
		public static default_res_json:string = "resource/default.res.json";
		public static default_thm_json:string = "resource/default.thm.json";
		public static default_resource:string = "resource/";
		public static SERVER_URL:string = "ws://echo.websocket.org:80";
		public static MD5PASS:string = "";
	}

	export const WEB_URL:string = "http://119.23.66.138:50002/majapi/";

}