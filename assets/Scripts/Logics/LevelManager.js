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
        cc.director.loadScene("AfterGame")
    }

    //start () {},

    // update (dt) {},
});
