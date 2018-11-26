module.exports = cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.NextGame= cc.find("Canvas/NextGame");
        this.NextGame.on(cc.Node.EventType.TOUCH_END, () => this.enterNewGameScene(), this.NextGame)
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
    }

    //start () {},

    // update (dt) {},
});
