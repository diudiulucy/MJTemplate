//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingScene: LC.LoadingScene;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            console.log("app 进入后台");
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            console.log("app 进入前台");
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(LC.Config.default_res_json, LC.Config.default_resource);

        //和配置等同步加载，可以提高效率，等主题加载完再显示，不要等主题加载完再开始加载，主题加载很慢
        LC.ResUtil.Instance.loadGroup("loading", this, this._onResourceLoadingComplete, null, 1);//先加载loading，尽快的显示UI,注意loading界面最好不用exml来布局，exml必须等主题加载完毕才能正常显示
        LC.ResUtil.Instance.loadGroup("preload", this, this._onResourcePreLoadComplete, this._onPreloadResourceProgress);
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme(LC.Config.default_thm_json, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;

    private _onResourceLoadingComplete(event: RES.ResourceEvent) {
        this.parent.removeChild(this);

        // interface Lengthwise {
        //     length: number;
        // }
        // function identi<A extends Lengthwise>(arg: A): A {
        //     console.log(arg.length);
        //     return arg;
        // }

        // let output = identi([1,2,3]);
        // console.log(output);

        

        //设置加载进度界面
        this.loadingScene = new LC.LoadingScene();
        LC.SceneManager.Instance.runWithScene(this.loadingScene);
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private _onResourcePreLoadComplete(event: RES.ResourceEvent): void {
        this.isResourceLoadEnd = true;
        this.createScene();
    }

    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            LC.ErrorCodeManager.Instance.init("error_txt");
            // this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
            let loginScene = new LC.LoginScene();
            LC.SceneManager.Instance.replaceScene(loginScene);
            // LC.Tips.Instance.setLayer(egret.MainContext.instance.stage);

            // let gameScene = new LC.GameScene();
            // LC.SceneManager.Instance.replaceScene(gameScene);

        }
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private _onPreloadResourceProgress(event: RES.ResourceEvent): void {
        this.loadingScene.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    }
}
