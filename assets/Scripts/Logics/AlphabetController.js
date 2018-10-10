// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var testDic = require("/Dictionary/DicModuel.js");
var gengerate = require("/../Framework/Controller/Generate.js");
var commonValue = require("/Common.js");
var word = testDic.ac; // test word
cc.Class({
    extends: cc.Component,

    properties: {
        AlphabetLayout: cc.Node,

        Alphabet: {
            default: [],
            type: cc.Prefab
        },

        alphabetsTouched: [],
    },

    onLoad: function () {
        this.init();
    },

    init: function () {
        for (var i = 0; i < word.length; i++) {
            this.addTouchEvent(this.generate()[i]);
        }
    },

    generate: function () {
        var SpawnsObject = [];
        for (var i = 0; i < word.length; i++) {
            var NewPrefab = cc.instantiate(this.Alphabet[commonValue.alphabetOrder[word[i]]]);
            NewPrefab.setPosition(cc.p(i * 100 - 100, 250)); // 位置
            NewPrefab.parent = this.AlphabetLayout;
            // NewPrefab.isCheck = false;
            NewPrefab.name = `${word[i]}`;
            SpawnsObject.push(NewPrefab);
            console.log(NewPrefab.name);
        }
        return SpawnsObject;
    },

    addTouchEvent: function (Alphabet) {
        var alphabets = this.generate();

        console.log("canvas script onload");

        Alphabet.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(alphabets, touchLoc);
            console.log("开始与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(alphabets, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            console.log("正在与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_END, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(alphabets, touchLoc);
            console.log("屏幕接触结束");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(alphabets, touchLoc);
            this.testWord(this.alphabetsTouched);
            console.log("屏幕接触取消");
        }, this);
    },

    checkAlphabet(alphabetArr, touch) {
        for (var k = alphabetArr.length - 1; k >= 0; k--) {
            var box = alphabetArr[k].getBoundingBoxToWorld();
            if (box.contains(touch)) {
                // alphabetArr[k].isCheck = true;
                // alphabetArr[k].opacity = 200;
                return alphabetArr[k];
            }
        }
    },

    // 暂存触摸到的字母
    pushTouchedAlphabet: function (alphabet) {
        //防止重复添加
        var existAlphabet = this.alphabetsTouched.indexOf(alphabet);
        // var existAlphabet = this.alphabetsTouched.find(alphabet);
        if (existAlphabet === -1 && alphabet != null) {
            //添加暂存
            this.alphabetsTouched.push(alphabet);
        }
    },

    // 检测是否为单词顺序
    testWord: function (wordArr) {
        var wordTouched = "";
        for (var i = 0; i < wordArr.length; i++) {
            wordTouched += wordArr[i].name
        }
        console.log(wordTouched === word);
        return wordTouched === word;
    }

});