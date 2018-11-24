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
// var commonValue = require("/Common.js");

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
        cc.game.addPersistRootNode(this.Node);
        this.setting.on(cc.Node.EventType.TOUCH_START, () => this.settingClick(), this.setting)
        this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    },

    settingClick: function () {
        this.Canvas = cc.find("Canvas");
        var settinggen = new controller(this.SettingPanel, 1, "", this.Canvas);
        var setting = settinggen.GeneratePics();
    },

    hintClick: function () {
        GameCoin += 25;
        this.coinLabel.string = (GameCoin).toString();
    },

    // start() {
    //
    // },

    // update (dt) {
    //     this.hint.on(cc.Node.EventType.TOUCH_START, () => this.hintClick(), this.hint)
    // },
});
