// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var commonValue = require("/Common.js");
var generatedWord = require("./word_generation");
var word = new generatedWord();

module.exports = cc.Class({

    extends: cc.Component,

    properties: {
        AlphabetLayout: cc.Node,
        // 生成字母的母节点

        Alphabet: {
            // 生成字母的prefab
            default: [],
            type: cc.Prefab
        },

        alphabetsTouched: [],
        // 触目过程中存储字母

        wordHasFound: [],
        // 触目过程中的单词

        SpawnsObject: [],
        // 生成字母存储

        AlphabetLocation: {
            // 存储生成字母的坐标 键值对
            default: [],
            type: cc.Node
        },

        Line: cc.Prefab,
        // 生成线prefab

        lineLayout: cc.Node,
        // 生成线的母节点

        line: [],
        // 触摸过程经过的线

        allLine: {
            // 存储生成线 键值对
            default: []
        },

        currentWord: []

    },

    onLoad: function () {
        console.log(window.dictionary["pen"])
        word.onLoad();
        this.init();
    },

    init: function () {
        var word = rankWord[0];
        console.log("commonValue.rankWord", word);
        this.currentWord = rankWord;
        this.generateAlphabet(word);
        this.generateLine(this.AlphabetLocation, word);
        this.initWordShuffle(word);
    },

    generateAlphabet: function (longestWord) {
        for (var i = 0; i < longestWord.length; i++) {
            var NewPrefab = cc.instantiate(this.Alphabet[alphabetOrder[longestWord[i]]]);
            NewPrefab.setScale(1, 1); // 大小
            NewPrefab.parent = this.AlphabetLayout; // 母节点
            NewPrefab.name = `${longestWord[i] + i}`; // 名字
            this.SpawnsObject.push(NewPrefab);

            if (longestWord.length === 3) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-215, -418)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -650)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(215, -418)); // 位置
            }
            if (longestWord.length === 4) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-211, -424)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(236, -590)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(97, -330)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(-75, -678)); // 位置
            }
            if (longestWord.length === 5) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-233, -461)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -296)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(227, -403)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(182, -650)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(-97, -680)); // 位置
            }
            if (longestWord.length === 6) {
                if (i === 0) NewPrefab.setPosition(cc.v2(102, -289)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(245, -474)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(167, -686)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(-254, -530)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(-86, -713)); // 位置
                else if (i === 5) NewPrefab.setPosition(cc.v2(-159, -320)); // 位置
            }
        }
        this.arrayToTablePosition(this.AlphabetLocation, this.SpawnsObject);
    },

    arrayToTablePosition: function (Table, Array) {
        for (var i = 0; i < Array.length; i++) {
            Table[Array[i].name] = Array[i].position;
        }
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
            wordTouched += wordArr[i].name[0]
        }
        window.touchedWord = wordTouched;
        if (this.currentWord.indexOf(wordTouched) !== -1//(words.indexOf(wordTouched) !== -1
            && this.wordHasFound.indexOf(wordTouched) === -1) {
            this.wordHasFound.push(wordTouched);
            console.log("恭喜你答对了");
        }
        else {
            console.log("你是傻了吧");
        }
        console.log(wordTouched);
        console.log(this.wordHasFound);
    },

    initWordShuffle: function(aword) {
        this.button = cc.find("Canvas/Button/button_shuffle");
        this.button.on(cc.Node.EventType.TOUCH_END, () => this.wordShuffle(aword), this.button);
    },

    wordShuffle: function(longestWord) {
        console.log('开始Shuffle');
        this.line = [];
        var anim = this.getComponentsInChildren(cc.Animation);
        var array = [];
        for (var a = 0; a < longestWord.length + 2; a++) {
            array.push(a);
        }
        var rand = array[Math.floor(Math.random() * array.length)];
        console.log(rand);
        for (var i = 0; i < longestWord.length; i++) {
            if (longestWord.length === 3) {
                switch (rand) { 
                case 0:
                    if (i === 0) this.SpawnsObject[i].setPosition(215, -418); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-215, -418); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(0, -650); anim[i].play('Emerge');
                    break;
                case 1:
                    if (i === 0) this.SpawnsObject[i].setPosition(-215, -418); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(215, -418); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(0, -650); anim[i].play('Emerge');
                    break;
                case 2:
                    if (i === 0) this.SpawnsObject[i].setPosition(0, -650); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(215, -418); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-215, -418); anim[i].play('Emerge');
                    break;
                case 3:
                    if (i === 0) this.SpawnsObject[i].setPosition(215, -418); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(0, -650); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-215, -418); anim[i].play('Emerge');
                    break;
                case 4:
                    if (i === 0) this.SpawnsObject[i].setPosition(-215, -418); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(0, -650); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(215, -418); anim[i].play('Emerge');
                    break;
            }
        }

            if (longestWord.length === 4) {
                switch (rand) {
                case 0:
                    if (i === 0) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                break;
                case 1:
                    if (i === 0) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                break;
                case 2:
                    if (i === 0) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                break;
                case 3:
                    if (i === 0) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                break;
                case 4:
                    if (i === 0) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                break;
                case 5:
                    if (i === 0) this.SpawnsObject[i].setPosition(97, -330); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(236, -590); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-75, -678); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-211, -424); anim[i].play('Emerge');
                break;
                }

            }

            if (longestWord.length === 5) {
                switch (rand) {
                case 0:
                    if (i === 0) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                break;
                case 1:
                    if (i === 0) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                break;
                case 2:
                    if (i === 0) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                break;
                case 3:
                    if (i === 0) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                break;
                case 4:
                    if (i === 0) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                break;
                case 5:
                    if (i === 0) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                break;
                case 6:
                    if (i === 0) this.SpawnsObject[i].setPosition(227, -403); anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(182, -650); anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(0, -296); anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-233, -461); anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(-97, -680); anim[i].play('Emerge');
                break;
                }
            }

            if (longestWord.length === 6) {
                switch (rand) {
                case 0:
                    if (i === 0) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 1:
                    if (i === 0) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 2:
                    if (i === 0) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 3:
                    if (i === 0) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 4:
                    if (i === 0) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 5:
                    if (i === 0) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                break;
                case 6:
                    if (i === 0) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                break;
                case 7:
                    if (i === 0) this.SpawnsObject[i].setPosition(-254, -530);anim[i].play('Emerge');
                    if (i === 1) this.SpawnsObject[i].setPosition(-86, -713);anim[i].play('Emerge');
                    if (i === 2) this.SpawnsObject[i].setPosition(-159, -320);anim[i].play('Emerge');
                    if (i === 3) this.SpawnsObject[i].setPosition(102, -289);anim[i].play('Emerge');
                    if (i === 4) this.SpawnsObject[i].setPosition(167, -686);anim[i].play('Emerge');
                    if (i === 5) this.SpawnsObject[i].setPosition(245, -474);anim[i].play('Emerge');
                break;
                }
            }
        }
        this.arrayToTablePosition(this.AlphabetLocation,this.SpawnsObject);
        this.generateLine(this.AlphabetLocation,longestWord);
    },

    // new line
    generateLine: function (LocationArr, longestWord) {
        // var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var fab = cc.instantiate(this.Line);
            fab.parent = this.lineLayout;
            fab.name = `${longestWord[i] + i}`;
            fab.opacity = 0;
            fab.width = 160;
            fab.height = 160;
            fab.setAnchorPoint(0.5, 0.5);
            fab.setPosition(LocationArr[fab.name]);
            this.lineEventListener(LocationArr[fab.name], fab);
            this.line.push(fab);
        }
        this.arrayToTable(this.allLine, this.line);
    },

    arrayToTable: function (Table, Array) {
        for (var i = 0; i < Array.length; i++) {
            Table[Array[i].name] = Array[i];
        }
    },

    lineEventListener: function (position, line) {
        line.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var worldTouchLoc = line.parent.convertToNodeSpaceAR(touchLoc);
            var checkedAlphabet = this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            console.log("开始与屏幕接触");
        }, this);

        line.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var worldTouchLoc = line.parent.convertToNodeSpaceAR(touchLoc);
            var checkedAlphabet = this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            this.objectState(this.allLine, this.alphabetsTouched);
            this.updateLine(this.alphabetsTouched, this.AlphabetLocation, worldTouchLoc);
            console.log("正在与屏幕接触");
        }, this);

        line.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.testWord(this.alphabetsTouched);
            this.clearLine(this.line);
            this.alphabetsTouched = []; // 清空触摸过的字母数组
            window.allWordFound = this.wordHasFound;
            console.log(WinBoolean);
            console.log("屏幕接触取消");
        }, this);
    },

    // nextRoundClear: function () {
    //     if (WinBoolean) {
    //         var Spawns = cc.find("/Canvas/Alphabet");
    //         LevelManager.destroyNode(Spawns.children);
    //         var SpawnsDis= cc.find("/Canvas/DisplayAlphabet");
    //         LevelManager.destroyNode(SpawnsDis.children);
    //         GameScore += 1; // 关卡更新
    //         LevelManager.enterAfterGameScene();
    //         this.init();
    //         BoardCreator.onLoad();
    //         WinBoolean = false;
    //     }
    // },

    objectState: function (Object, Array) {
        for (var i = 0; i < Array.length; i++) {
            Object[Array[i].name].opacity = 255;
            Object[Array[i].name].width = 20;
            Object[Array[i].name].height = 20;
            Object[Array[i].name].setAnchorPoint(0, 0.5)
        }
    },

    drawLine: function (startPosition, endPosition, lineArr) {
        //startPosition为起始点，endPosition为终点就你touch move时的当前点
        lineArr.position = startPosition;
        var dt = startPosition.sub(endPosition);
        //计算角度
        var radian = Math.atan2(dt.x, dt.y);
        var rotation = (180 * radian / Math.PI + 90) % 360;
        //旋转线条
        lineArr.rotation = rotation;
        //设置宽度，我这里是用宽度改变的线条长度
        lineArr.width = startPosition.sub(endPosition).mag();
    },

    updateLine: function (LinePointArr, PointLocationArr, touchPoint) {
        if (LinePointArr.length > 1) {
            for (var i = 0; i < LinePointArr.length - 1; i++) {
                var pointIndex1 = LinePointArr[i + 1].name;
                var pointIndex2 = LinePointArr[i].name;
                this.drawLine(PointLocationArr[pointIndex2], PointLocationArr[pointIndex1], this.allLine[pointIndex2]);
            }
        }
        if (touchPoint != null && LinePointArr.length > 0) {
            var lastPointIndex = LinePointArr[LinePointArr.length - 1].name;
            var lastPoint = PointLocationArr[lastPointIndex];
            this.drawLine(lastPoint, touchPoint, this.allLine[lastPointIndex]);
        }
    },

    clearLine: function (LinePointArr) {
        for (var i = 0; i < LinePointArr.length; i++) {
            LinePointArr[i].opacity = 0;
            LinePointArr[i].rotation = 0;
            LinePointArr[i].width = 160;
            LinePointArr[i].height = 160;
            LinePointArr[i].setAnchorPoint(0.5, 0.5)
        }
    }
});