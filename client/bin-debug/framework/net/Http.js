var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Http请求类
 * 使用如下：
 * 		LC.Http.post("http://httpbin.org/post", { id: 1, level: 1 }, (e) => {
                var request = e.currentTarget;
                console.log("post data : ", request.response);
            }, this);

            LC.Http.get("http://httpbin.org/get", { id: 1, level: 1 }, (e) => {
                var request = e.currentTarget;
                console.log("get data : ", request.response);
            }, this);
 *
 *
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Http = (function () {
        function Http() {
        }
        /**
         * 发送post请求
         * @param url 		 路径
         * @param data 		 数据
         * @param success  	 成功的回调
         * @param thisObject 调用回调的对象
         * @param error 	 失败的回调
         */
        Http.post = function (url, data, success, thisObject, error, progress) {
            console.log("post url = " + url);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (data) {
                if (data instanceof Object) {
                    var param = this.changeUrlCode(data);
                    request.send(param);
                }
                else {
                    request.send(data);
                }
            }
            else {
                request.send();
            }
            success && request.addEventListener(egret.Event.COMPLETE, success, thisObject);
            error && request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, thisObject);
            progress && request.addEventListener(egret.ProgressEvent.PROGRESS, progress, thisObject);
        };
        /**
         * 发送get请求
         * @param url 		路径
         * @param data 		数据
         * @param success  	成功的回调
         * @param error 	失败的回调
         */
        Http.get = function (url, data, success, thisObject, error) {
            console.log("get url = " + url);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            if (data) {
                var param = this.changeUrlCode(data);
                request.open(url + "?" + param, egret.HttpMethod.GET);
            }
            else {
                request.open(url, egret.HttpMethod.GET);
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            success && request.addEventListener(egret.Event.COMPLETE, success, thisObject);
            error && request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, thisObject);
        };
        Http.changeUrlCode = function (param) {
            if (!param)
                return null;
            var str = "";
            for (var key in param) {
                str += key + "=" + param[key] + "&";
            }
            return str.substr(0, str.length - 1);
        };
        return Http;
    }());
    LC.Http = Http;
    __reflect(Http.prototype, "LC.Http");
})(LC || (LC = {}));
//# sourceMappingURL=Http.js.map