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
        // backSprite: cc.Node,
        wordLabel: cc.Label,
        chineseLabel: cc.Label,
        numberLabel: cc.Label,
    },

    init: function (rank, data) {
        // var word = window.PresentedWords[i];
        var chinese = window.dictionary[data];
        // if (rank === 0) {
        //     this.numberLabel.node.color = new cc.Color(255, 0, 0, 255);
        //     this.numberLabel.node.setScale(2);
        // } else if (rank === 1) {
        //     this.numberLabel.node.color = new cc.Color(255, 255, 0, 255);
        //     this.numberLabel.node.setScale(1.6);
        // } else if (rank === 2) {
        //     this.numberLabel.node.color = new cc.Color(100, 255, 0, 255);
        //     this.numberLabel.node.setScale(1.3);
        // }
        this.numberLabel.string = (rank + 1).toString();
        this.wordLabel.string = data.toString();
        this.chineseLabel.string = chinese.toString();
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
