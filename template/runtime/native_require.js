
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"polyfill/promise.js",
	"bin-debug/framework/core/Layer.js",
	"bin-debug/framework/core/Scene.js",
	"bin-debug/framework/managers/Single.js",
	"bin-debug/framework/ui/ComboCards.js",
	"bin-debug/framework/core/Controller.js",
	"bin-debug/framework/managers/ErrorCodeManager.js",
	"bin-debug/framework/managers/EventManager.js",
	"bin-debug/framework/managers/PopupManager.js",
	"bin-debug/framework/managers/SceneManager.js",
	"bin-debug/framework/adapter/AssetAdapter.js",
	"bin-debug/framework/managers/SoundManager.js",
	"bin-debug/framework/ui/Card.js",
	"bin-debug/framework/ui/CardModLayout.js",
	"bin-debug/framework/adapter/ThemeAdapter.js",
	"bin-debug/framework/utils/StringUtil.js",
	"bin-debug/framework/utils/UIUtil.js",
	"bin-debug/Main.js",
	"bin-debug/MJGame/config/Config.js",
	"bin-debug/MJGame/event/CustomEvent.js",
	"bin-debug/MJGame/model/User.js",
	"bin-debug/MJGame/scenes/GameScene.js",
	"bin-debug/MJGame/scenes/HallScene.js",
	"bin-debug/MJGame/scenes/LoadingScene.js",
	"bin-debug/MJGame/scenes/LoginScene.js",
	"bin-debug/MJGame/views/game/GameLayer.js",
	"bin-debug/MJGame/views/load/LoadingLayer.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 1334,
		contentHeight: 750,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};