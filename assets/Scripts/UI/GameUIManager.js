// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var controller = require("../Framework/Controller/Generate")
cc.Class({
    extends: cc.Component,

    properties: {
        _setting: cc.Node,
        _Canvas: cc.Node,

        SettingPanel: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.game.addPersistRootNode(this.Node)
        this._setting = cc.find("Canvas/setting")
        this._setting.on(cc.Node.EventType.TOUCH_END, () => this._settingClick(), this._setting)
    },

    _settingClick: function () {
        this.enterSettingPanel();
    },

    enterSettingPanel: function () {
        this._Canvas = cc.find("Canvas");
        var settinggen = new controller(this.SettingPanel, 1, "", this._Canvas);
        var setting = settinggen.GeneratePics();
    },

    start() {

    },

    // update (dt) {},
});
