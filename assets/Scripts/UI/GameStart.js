var controller = require("../Framework/Controller/Generate");
cc.Class({
    extends: cc.Component,

    properties: {
        _ZenBtn : cc.Node,
        _setting: cc.Node,
        _mode: cc.Node,
        _rank: cc.Node,
        _Canvas : cc.Node,

        SettingPanel: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // cc.game.addPersistRootNode(this.Node);
        this._ZenBtn= cc.find("Canvas/ZenBtn");
        this._ZenBtn.on(cc.Node.EventType.TOUCH_END, () => this._ZenBtnClick(), this._ZenBtn);

        this._rank= cc.find("Canvas/rank");
        this._rank.on(cc.Node.EventType.TOUCH_END, () => this._rankClick(), this._rank);

        this.share = cc.find("Canvas/shareFriend");
        this.share.on(cc.Node.EventType.TOUCH_END, () => this.onShareBtn(), this.share);



    },

    _ZenBtnClick: function () {
        cc.director.loadScene("Game")
    },

    _settingClick: function () {
        this._Canvas = cc.find("Canvas");
        var settinggen = new controller(this.SettingPanel,1,"",this._Canvas);
        settinggen.GeneratePics();
    },

    _rankClick: function () {
        cc.director.loadScene("RankingView")
    },

    onShareBtn: function(){ //分享按钮
        cc.log("点击分享按钮");
        //主动拉起分享接口
        cc.loader.loadRes("texture/share",function(err,data){
            wx.shareAppMessage({
                title: "不怕，就来PK！",
                imageUrl: data.url,
                success(res){
                    console.log("转发成功!!!");
                    // window.GameCoin += 20;
                },
                fail(res){
                    console.log("转发失败!!!");
                }
            })
        });
    }

});