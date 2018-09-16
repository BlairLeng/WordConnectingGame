var controller = require("../Framework/Controller")
var model = require("../Framework/Model")
cc.Class({
    extends: cc.Component,

    properties: {
        TestBlock: {
            default: null,
            type: cc.Prefab
        },

        _Canvas : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this._Canvas = cc.find("Canvas")

        //var NewUnknownPiece = cc.instantiate(this.TestBlock);
        //this._Canvas.addChild(NewUnknownPiece);
        var InstanModel = new model()
        InstanModel.PlayerName = "hi"
        console.log(InstanModel.PlayerName)
        console.log(this.TestBlock.name)
        var InstanController = new controller(this.TestBlock, 3, "testblock", this._Canvas);
        var Spawnings = InstanController.GeneratePics();
        console.log(Spawnings);
        for (var i = 0; i < Spawnings.length; i++) {
           var tempNode = Spawnings[i]
            tempNode.x = -21
            tempNode.y = 41 + 120 * i
        }
        InstanController.DestroyPics(Spawnings)
    },

    //start () {},

    // update (dt) {},
});
