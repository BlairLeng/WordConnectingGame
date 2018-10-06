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
        SettingPanel: {
            default: null,
            type: cc.Prefab
        },

        _sound: cc.Node,
        _vibration: cc.Node,
        _back: cc.Node,
        _Canvas: cc.Node
    },

    onLoad:function () {
        this._back = cc.find("Canvas/SettingPanel/back");
        //console.log("hello");
        this._back.on(cc.Node.EventType.TOUCH_END, () => this._backClick(), this._back)
    },

    _backClick: function () {
        //console.log("hello");
        this.enterCurrentScene();
    },

    enterCurrentScene: function () {
        var CurrentScene = cc.director.getScene().name;
        console.log(CurrentScene)
        cc.director.loadScene(CurrentScene)
        //cc.director.loadScene("InitScene")
    },

    start () {

    },

    // update (dt) {},
});
