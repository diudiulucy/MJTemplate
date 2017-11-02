var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 单例类
 * @author lucywang
 * @date 2017/10/19
 */
var LC;
(function (LC) {
    var Single = (function () {
        //构造函数必须保护型才算真正的单例
        function Single() {
        }
        Single.getInstance = function () {
            if (!this.instance) {
                var clsName = egret.getQualifiedClassName(this);
                console.log(clsName);
                var cls = egret.getDefinitionByName(clsName);
                this.instance = new cls();
            }
            return this.instance;
        };
        return Single;
    }());
    LC.Single = Single;
    __reflect(Single.prototype, "LC.Single");
})(LC || (LC = {}));
//# sourceMappingURL=Single.js.map