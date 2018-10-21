// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dic = require("../level1.js");
module.exports = cc.Class({
    extends: cc.Component,

    properties: {

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },


    permut: function (string) {
        if (string.length < 2) return string;

        var permutations = [];

        for (var i = 0; i < string.length; i++) {
            var char = string[i]


            if (string.indexOf(char) != i)
                continue;

            var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

            for (var subPermutation of this.permut(remainingString))
                permutations.push(char + subPermutation)

        }
        return permutations;
    },


    pickRandomProperty: function (obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1 / ++count)
                result = prop;
        return result;
    },


    combinations: function (str) {
        var fn = function (active, rest, a) {
            if (!active && !rest)
                return;
            if (!rest) {
                a.push(active);
            } else {
                fn(active + rest[0], rest.slice(1), a);
                fn(active, rest.slice(1), a);
            }
            return a;
        }
        return fn("", str, []);
    },

    remove_duplicates: function(a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = a[i];
             if(seen[item] !== 1) {
                   seen[item] = 1;
                   out[j++] = item;
             }
        }
        return out;
},


    onLoad: function () {

        // while (true)

        //var myString = "happy";
        //cc.log(myString);

        var myString = this.pickRandomProperty(dic);
        var myList = this.combinations(myString);

        var result = [];
        for (var element in myList) {
            var permutations = this.permut(myList[element]);
            //  cc.log(permutations);
            for (var permutation in permutations) {
                // cc.log(permutation)
                if (permutations[permutation] in dic) {
                    result.push(permutations[permutation]);
                }
            }

        }
        // // edit
        result = this.remove_duplicates(result)
        return result;
        //cc.log("valid words: " + result)

    },

    //start () {},

    // update (dt) {},


});
