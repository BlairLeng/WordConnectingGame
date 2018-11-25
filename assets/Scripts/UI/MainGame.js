// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var controller = require("../Framework/Controller/Generate");

cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Node,
        hint: cc.Node,
        Canvas: cc.Node,
        rankLabel: cc.Label,
        coinLabel: cc.Label,

        SettingPanel: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.rankLabel.string = (GameScore+1).toString();
        this.coinLabel.string = (window.GameCoin).toString();
        // cc.game.addPersistRootNode(this.Node);
        this.setting.on(cc.Node.EventType.TOUCH_START, () => this.settingClick(), this.setting)
        this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    },

    settingClick: function () {
        this.Canvas = cc.find("Canvas");
        var settingGen = new controller(this.SettingPanel, 1, "", this.Canvas);
        settingGen.GeneratePics();
    },

    hintClick: function () {
        window.GameCoin += 25;
        this.coinLabel.string = (window.GameCoin).toString();
    },

    // start() {
    //
    // },

    // update (dt) {
    //     this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    // },
});
