/**
 * Socket协议类(只做协议的处理,不要处理UI，最好不要依赖其他的模块)
 * @author lucywang
 * @date 2017/10/19
 */
module LC {
	export class Socket extends Single {
		private print_log:false;
		private _socket: egret.WebSocket;
		private _timerId: number;
		private _connectInterval: number = 4500;
		private _headSize: number = 12;
		private _successCallback:Function;
		private _errorCallback:Function;
		private _closeCallback:Function;
		private _funcObj:any;

		//为方便代码提示，加入此接口
		public static get Instance(): Socket {
			return this.getInstance();
		}

		/**
		 * 创建socket
		 */
		private _initWebSocket(): void {
			//创建 WebSocket 对象
			this._socket = new egret.WebSocket();
			//设置数据格式为二进制，默认为字符串
			this._socket.type = egret.WebSocket.TYPE_BINARY;
			//添加链接打开侦听，连接成功会调用此方法
			this._socket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
			//添加收到数据侦听，收到数据会调用此方法
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
			this._socket.addEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			//添加异常侦听，出现异常会调用此方法
			this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
		}

		/**
		 * 开始根据提供的url连接socket
		 * @param url  全地址。如ws://echo.websocket.org:80
		 */
		public startConnect(url: string,success?: Function, thisObject?: any, error?: Function, close?: Function) {
			egret.log("start connect " + url);

			this._successCallback = success;
			this._errorCallback = error;
			this._funcObj = thisObject;

			this._initWebSocket();
			this._socket.connectByUrl(url);
			this._timerId = egret.setTimeout(this.timeOutHandler, this, this._connectInterval);
		}

		/**
		 * 关闭socket
		 * 
		 */
		public closeSocket(): void {
			egret.clearTimeout(this._timerId);
			this._socket.removeEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this._onSocketClose, this);
			this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this._onSocketError, this);
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
			this._socket.connected && this._socket.close();
		}


		/**
     	 * 发送数据
         * @param data 	      待发送json数据
         * @param mainID      主ID
         * @param AssistantID 辅ID
         */
		public sendData(data: string, mainID: number, AssistantID?: number) {
			if (this._socket && this._socket.connected) {
				console.log("Send: mainID = " + mainID + " data = " + data);
				//创建 ByteArray 对象
				let byte: egret.ByteArray = this._EnvelopedMessage(data, mainID, AssistantID);
				byte.endian = egret.Endian.LITTLE_ENDIAN;
				byte.position = 0;
				//发送数据
				this._socket.writeBytes(byte, 0, byte.length);
			} else {
				egret.log("socket is not connected");
			}
		}

		/**是否已连接*/
		public isConnected() {
			if (this._socket && this._socket.connected) {
				return true;
			}
			return false;
		}

		/**
		 * 连接超时
		 */
		private timeOutHandler() {
			if (!this._socket.connected) {
				egret.log("connect time out!");
				this.closeSocket();
			}
		}

		/**
		 * 连接成功回调
		 */
		private _onSocketOpen(event: egret.Event): void {
			egret.log("connect successed");
			egret.clearTimeout(this._timerId);
			this._successCallback.call(this._funcObj);
		}

		/**
		 * 关闭连接回调
	 	 * 
	 	 */
		private _onSocketClose(event: egret.Event): void {
			egret.log("onSocketClose");
			this._closeCallback.call(this._funcObj);
		}

		/**
		 * 连接错误回调
		 * 
		 */
		private _onSocketError(event: egret.IOErrorEvent): void {
			egret.log("_onSocketError");
			this._errorCallback.call(this._funcObj);
		}

		/**
		 * 接收数据回调
		 * @param e 事件
		 */
		private _onReceiveMessage(event: egret.ProgressEvent): void {
			//创建 ByteArray 对象
			let byte: egret.ByteArray = new egret.ByteArray();
			//读取数据
			this._socket.readBytes(byte);
			this._parseMessage(byte);
		}

		/**
		 * 解析数据
		 * @param byte 待解析的数据
		 */
		private _parseMessage(byte: egret.ByteArray): void {
			byte.endian = egret.Endian.LITTLE_ENDIAN;
			var len: number = byte.readInt();
			var mainID: number = byte.readInt();
			var AssistantID: number = byte.readInt();

			let data = byte.readUTFBytes(len - this._headSize);
			console.log("Receive: mainID = " + mainID + " data = " + data);

			EventManager.getInstance().dispatchCustomEvent(mainID.toString(),data);
		}

		/**
		 * 封装数据
		 * @param byte 待封装的数据
		 */
		private _EnvelopedMessage(data: string, mainID: number, AssistantID: number = 0): egret.ByteArray {
			let body: egret.ByteArray = new egret.ByteArray();
			body.endian = egret.Endian.LITTLE_ENDIAN;
			//写入数据
			body.writeUTFBytes(data);

			let byte: egret.ByteArray = new egret.ByteArray();
			byte.endian = egret.Endian.LITTLE_ENDIAN;

			let len = this._headSize + body.length;
			byte.writeInt(len);
			//写入主命令
			byte.writeInt(mainID);
			//写入辅命令
			byte.writeInt(AssistantID);
			byte.writeBytes(body, 0, len);
			return byte;
		}
	}
}