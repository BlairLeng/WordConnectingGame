// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        settingPanel: cc.Node,
        back: cc.Node,
        exitGame: cc.Node,
        shareGame: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.back.on(cc.Node.EventType.TOUCH_START, () => this.backClick(), this.back)
        this.exitGame.on(cc.Node.EventType.TOUCH_START, () => this.exitClick(), this.exitGame)
        this.shareGame.on(cc.Node.EventType.TOUCH_START, () => this.shareClick(), this.shareGame)
    },

    backClick: function () {
        this.settingPanel.destroy();
    },

    exitClick: function () {
        cc.director.loadScene("InitScene")
    },

    shareClick: function () {
        cc.log("点击分享按钮");
        //主动拉起分享接口
        cc.loader.loadRes("texture/share",function(err,data){
            wx.shareAppMessage({
                title: "不怕，就来PK！",
                imageUrl: data.url,
                success(res){
                    console.log("转发成功!!!");
                    window.GameCoin += 20;
                },
                fail(res){
                    console.log("转发失败!!!");
                }
            })
        });
    }


    // start() {
    //
    // },

    // update (dt) {
    //     this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    // },
});
