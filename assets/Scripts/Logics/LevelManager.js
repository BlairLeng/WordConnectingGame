var controller = require("../Framework/Controller/Generate")
var model = require("../Framework/Model/PlayerInfo")
module.exports = cc.Class({
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
        this._Canvas = cc.find("Canvas");
        this.NextGame= cc.find("Canvas/NextGame");
        this.NextGame.on(cc.Node.EventType.TOUCH_END, () => this.enterNewGameScene(), this.NextGame)

        //var NewUnknownPiece = cc.instantiate(this.TestBlock);
        //this._Canvas.addChild(NewUnknownPiece);
        // var InstanModelPlayer = new model()
        // InstanModelPlayer.PlayerName = "hi"
        // console.log(InstanModelPlayer.PlayerName)
        // console.log(this.TestBlock.name)
        // var InstanControllerGenerate = new controller(this.TestBlock, 3, "testblock", this._Canvas);
        // var Spawnings = InstanControllerGenerate.GeneratePics();
        // console.log(Spawnings);
        // for (var i = 0; i < Spawnings.length; i++) {
        //    var tempNode = Spawnings[i]
        //     tempNode.x = -21
        //     tempNode.y = 41 + 120 * i
        // }
        // InstanControllerGenerate.DestroyPics(Spawnings)
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
