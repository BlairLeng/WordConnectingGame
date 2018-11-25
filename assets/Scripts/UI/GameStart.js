var controller = require("../Framework/Controller/Generate");
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
        // cc.game.addPersistRootNode(this.Node);
        this._ZenBtn= cc.find("Canvas/ZenBtn");
        this._ZenBtn.on(cc.Node.EventType.TOUCH_END, () => this._ZenBtnClick(), this._ZenBtn);

        this._setting= cc.find("Canvas/setting");
        this._setting.on(cc.Node.EventType.TOUCH_END, () => this._settingClick(), this._setting);

        this._rank= cc.find("Canvas/rank");
        this._rank.on(cc.Node.EventType.TOUCH_END, () => this._rankClick(), this._rank);


    },

    _ZenBtnClick: function () {
        cc.director.loadScene("Game")
    },

    _settingClick: function () {
        this._Canvas = cc.find("Canvas");
        var settinggen = new controller(this.SettingPanel,1,"",this._Canvas);
        settinggen.GeneratePics();
    },

    _rankClick: function () {
        cc.director.loadScene("RankingView")
    }

});