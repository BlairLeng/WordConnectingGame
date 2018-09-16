cc.Class({
    extends: cc.Component,

    properties: {
        _ZenBtn : cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.game.addPersistRootNode(this.Node)
        this._ZenBtn= cc.find("Canvas/ZenBtn")

        this._ZenBtn.on(cc.Node.EventType.TOUCH_END, () => this._ZenBtnClick(), this._ZenBtn)
    },

    _ZenBtnClick: function () {
        //console.log("hello")
        this.enterLevelScene();
    },

    enterLevelScene: function () {
        cc.director.loadScene("Levels")
    }
});