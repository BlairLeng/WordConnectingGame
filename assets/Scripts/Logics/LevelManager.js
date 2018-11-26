module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        share: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.NextGame= cc.find("Canvas/NextGame");
        this.NextGame.on(cc.Node.EventType.TOUCH_END, () => this.enterNewGameScene(), this.NextGame)
        this.share.on(cc.Node.EventType.TOUCH_START, () => this.onShareBtn(), this.share);
    },
    destroyNode: function (Node) {
        for (var i = 0; i < Node.length; i++) {
            Node[i].destroy();
        }
    },

    enterNewGameScene: function () {
        cc.director.loadScene("Game")
    },

    enterAfterGameScene: function () {
        window.GameCoin += 15;

        var score = window.GameScore;
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: "x1",
                score: score,
            });
        }

        if (CC_WECHATGAME) {
            window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            window.wx.postMessage({
                messageType: 4,
                MAIN_MENU_NUM: "x1"
            });
        }
        cc.director.loadScene("AfterGame")
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
                    window.GameCoin += 20;
                },
                fail(res){
                    console.log("转发失败!!!");
                }
            })
        });
    }

    //start () {},

    // update (dt) {},
});
