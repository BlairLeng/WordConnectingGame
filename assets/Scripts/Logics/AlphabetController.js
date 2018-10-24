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
var commonValue = require("/Common.js");
var testword = ["my", "pen"];
var generatedWord = require("../word_generation.js");
var word = new generatedWord();
var words = word.onLoad();

cc.Class({
    extends: cc.Component,

    properties: {
        AlphabetLayout: cc.Node,

        Alphabet: {
            default: [],
            type: cc.Prefab
        },

        alphabetsTouched: [],

        initWord: [],

        wordHasFound: [],

        SpawnsObject: [],
    },

    onLoad: function () {
        console.log("这个词", words);
        this.init();

    },

    init: function () {
        this.generate();
    },

    generate: function () {
        var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var NewPrefab = cc.instantiate(this.Alphabet[commonValue.alphabetOrder[longestWord[i]]]);
            NewPrefab.setScale(1, 1); // 大小
            NewPrefab.parent = this.AlphabetLayout;
            NewPrefab.name = `${longestWord[i]}`;
            this.addTouchEvent(NewPrefab);
            this.SpawnsObject.push(NewPrefab);

            if (longestWord.length === 3) {
                if      (i === 0) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -300)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
            }
            if (longestWord.length === 4) {
                if      (i === 0) NewPrefab.setPosition(cc.v2(0, -250));
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -450));
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -350)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -350)); // 位置
            }
            if (longestWord.length === 5) {
                if      (i === 0) NewPrefab.setPosition(cc.v2(0, -300));
                else if (i === 1) NewPrefab.setPosition(cc.v2(-100, -500));
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -500)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(-200, -400)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(200, -400)); // 位置
            }
            if (longestWord.length === 6) {
                if      (i === 0) NewPrefab.setPosition(cc.v2(-100, -100));
                else if (i === 1) NewPrefab.setPosition(cc.v2(100, -100));
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(-200, -250)); // 位置
                else if (i === 5) NewPrefab.setPosition(cc.v2(200, -250)); // 位置
            }
        }
    },

    addTouchEvent: function (Alphabet) {
        //console.log("canvas script onload");

        Alphabet.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            console.log("开始与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            console.log("正在与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_END, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            console.log("屏幕接触结束");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.testWord(this.alphabetsTouched);
            console.log("这里", this.alphabetsTouched);
            this.alphabetsTouched = []; // 清空触摸过的字母数组
            console.log("屏幕接触取消");
        }, this);
    },

    checkAlphabet(alphabetArr, touch) {
        for (var k = alphabetArr.length - 1; k >= 0; k--) {
            var box = alphabetArr[k].getBoundingBoxToWorld();
            if (box.contains(touch)) {
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
        if (words.indexOf(wordTouched) !== -1
            && this.wordHasFound.indexOf(wordTouched) === -1) {
            this.wordHasFound.push(wordTouched);
            console.log("hahhayes")
        }
        console.log(wordTouched);
        console.log(this.wordHasFound);
    }


});