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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.back.on(cc.Node.EventType.TOUCH_START, () => this.backClick(), this.back)
    },

    backClick: function () {
        this.settingPanel.destroy();
    },


    // start() {
    //
    // },

    // update (dt) {
    //     this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    // },
});