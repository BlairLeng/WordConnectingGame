// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var playerInfo = cc.Class({
    extends: cc.Component,

    properties: {
        //PlayerName, PlayerLevel
        PlayerName: {
            get() {
                return this._name
            },
            set(value) {
                this._name = value
            }
        },

        PlayerLevel: {
            get() {
                return this._level
            },
            set(value) {
                this._level = value
            }
        }



    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

module.exports = playerInfo
