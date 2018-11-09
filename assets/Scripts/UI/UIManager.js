var controller = require("../Framework/Controller/Generate")
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
        cc.game.addPersistRootNode(this.Node)
        this._ZenBtn= cc.find("Canvas/ZenBtn")
        this._ZenBtn.on(cc.Node.EventType.TOUCH_END, () => this._ZenBtnClick(), this._ZenBtn)

        this._setting= cc.find("Canvas/setting")
        this._setting.on(cc.Node.EventType.TOUCH_END, () => this._settingClick(), this._setting)
    },

    _ZenBtnClick: function () {
        //console.log("hello")
        this.enterLevelScene();
    },

    enterLevelScene: function () {
        cc.director.loadScene("GameStart")
    },

    _settingClick: function () {
        this.enterSettingPanel();
    },

    enterSettingPanel: function () {
        this._Canvas = cc.find("Canvas");
        var settinggen = new controller(this.SettingPanel,1,"",this._Canvas);
        var setting = settinggen.GeneratePics();
    }
});