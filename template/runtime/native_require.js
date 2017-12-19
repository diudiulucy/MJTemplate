
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/socket/socket.js",
	"libs/modules/cryptoJS/cryptoJS.js",
	"promise/promise.js",
	"bin-debug/framework/core/Controller.js",
	"bin-debug/framework/core/Layer.js",
	"bin-debug/framework/core/Scene.js",
	"bin-debug/framework/managers/Single.js",
	"bin-debug/MJGame/config/Config.js",
	"bin-debug/Main.js",
	"bin-debug/framework/adapter/ThemeAdapter.js",
	"bin-debug/framework/anim/MCPlayer.js",
	"bin-debug/framework/managers/ErrorCodeManager.js",
	"bin-debug/framework/managers/EventManager.js",
	"bin-debug/framework/managers/PopupManager.js",
	"bin-debug/framework/managers/SceneManager.js",
	"bin-debug/framework/constant/Global.js",
	"bin-debug/framework/managers/SoundManager.js",
	"bin-debug/framework/net/Http.js",
	"bin-debug/framework/net/Socket.js",
	"bin-debug/framework/ui/Card.js",
	"bin-debug/framework/ui/CardModLayout.js",
	"bin-debug/framework/ui/ComboCards.js",
	"bin-debug/framework/ui/LCButton.js",
	"bin-debug/framework/ui/OutCardLayout.js",
	"bin-debug/framework/ui/Tips.js",
	"bin-debug/framework/ui/Waiting.js",
	"bin-debug/framework/utils/ArrayUtils.js",
	"bin-debug/framework/utils/base64-typescript-class.js",
	"bin-debug/framework/utils/CryptoUtils.js",
	"bin-debug/framework/utils/EffectUtils.js",
	"bin-debug/framework/utils/ResUtil.js",
	"bin-debug/MJGame/views/popups/hall/SelectRoom.js",
	"bin-debug/MJGame/controller/game/GameLayerController.js",
	"bin-debug/MJGame/controller/game/comp/ActHandlerController.js",
	"bin-debug/MJGame/controller/hall/HallLayerController.js",
	"bin-debug/MJGame/controller/load/LoadingLayerController.js",
	"bin-debug/MJGame/controller/login/LoginLayerController.js",
	"bin-debug/MJGame/controller/popups/hall/JoinRoomController.js",
	"bin-debug/MJGame/controller/popups/hall/SelectRoomController.js",
	"bin-debug/MJGame/event/CustomEvents.js",
	"bin-debug/MJGame/event/SocketEvents.js",
	"bin-debug/MJGame/model/data/DeskInfo.js",
	"bin-debug/MJGame/model/data/UsersInfo.js",
	"bin-debug/MJGame/model/protocol/SocketInterface.js",
	"bin-debug/MJGame/model/vo/User.js",
	"bin-debug/MJGame/scenes/GameScene.js",
	"bin-debug/MJGame/scenes/HallScene.js",
	"bin-debug/MJGame/scenes/LoadingScene.js",
	"bin-debug/MJGame/scenes/LoginScene.js",
	"bin-debug/MJGame/views/components/UserHead.js",
	"bin-debug/MJGame/views/game/GameLayer.js",
	"bin-debug/MJGame/views/game/comp/ActHandler.js",
	"bin-debug/MJGame/views/game/comp/CardPointer.js",
	"bin-debug/MJGame/views/game/comp/Disc.js",
	"bin-debug/MJGame/views/hall/HallLayer.js",
	"bin-debug/MJGame/views/load/LoadingLayer.js",
	"bin-debug/MJGame/views/login/LoginLayer.js",
	"bin-debug/MJGame/views/popups/game/GameResult.js",
	"bin-debug/MJGame/views/popups/hall/JoinRoom.js",
	"bin-debug/framework/adapter/AssetAdapter.js",
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
		frameRate: 60,
		scaleMode: "fixedNarrow",
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