// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var commonValue = require("/Common.js");
var generatedWord = require("../word_generation.js");
var Level = require("/LevelManager.js");
var Board = require("/WordPuzzleNew.js");

var LevelManager = new Level();
var word = new generatedWord();
var BoardCreator = new Board();
// var words = word.onLoad();


// var result = [];
// for (var i = 0; i < 10; i++) {
//     result[i] = word.onLoad();
//     console.log(result[i])
// }
//
// commonValue.generatedWords = result[commonValue.GameScore]; // 给common里generatedWords赋值

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

        currentWord:[]

    },

    onLoad: function () {


        // console.log("这个生成的随机词", words);
        //console.log("这个生成的随机词组", result);
        word.onLoad();
        this.init();
    },

    init: function () {
        var word = commonValue.rankWord[0];
        console.log("commonValue.rankWord", word)
        // var longestWord = word;
        this.currentWord = commonValue.rankWord;
        this.generateAlphabet(word);
        this.generateLine(this.AlphabetLocation,word);
    },

    generateAlphabet: function (longestWord) {
        // var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var NewPrefab = cc.instantiate(this.Alphabet[commonValue.alphabetOrder[longestWord[i]]]);
            NewPrefab.setScale(1, 1); // 大小
            NewPrefab.parent = this.AlphabetLayout; // 母节点
            NewPrefab.name = `${longestWord[i] + i}`; // 名字
            this.SpawnsObject.push(NewPrefab);

            if (longestWord.length === 3) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -300)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
            }
            if (longestWord.length === 4) {
                if (i === 0) NewPrefab.setPosition(cc.v2(0, -250)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -450)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -350)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -350)); // 位置
            }
            if (longestWord.length === 5) {
                if (i === 0) NewPrefab.setPosition(cc.v2(0, -200)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(-200, -300)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(200, -300)); // 位置
            }
            if (longestWord.length === 6) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-100, -100)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(100, -100)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(-200, -250)); // 位置
                else if (i === 5) NewPrefab.setPosition(cc.v2(200, -250)); // 位置
            }
        }
        this.arrayToTablePosition(this.AlphabetLocation,this.SpawnsObject);
    },

    arrayToTablePosition: function (Table,Array) {
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
        commonValue.touchedWord = wordTouched;
        if (this.currentWord.indexOf(wordTouched) !== -1//(words.indexOf(wordTouched) !== -1
            && this.wordHasFound.indexOf(wordTouched) === -1) {
            this.wordHasFound.push(wordTouched);
            console.log("恭喜你答对了");

            // return true;
        }
        else {
            console.log("你是傻了吧");
            // return false;
        }
        console.log(wordTouched);
        console.log(this.wordHasFound);
    },

    // new line
    generateLine: function (LocationArr,longestWord) {
        // var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var fab = cc.instantiate(this.Line);
            fab.parent = this.lineLayout;
            fab.name = `${longestWord[i] + i}`;
            fab.opacity = 0;
            fab.width = 60;
            fab.height = 60;
            fab.setAnchorPoint(0.5,0.5);
            fab.setPosition(LocationArr[fab.name]);
            this.lineEventListener(LocationArr[fab.name], fab);
            this.line.push(fab);
        }
        this.arrayToTable(this.allLine,this.line);
    },

    arrayToTable: function (Table,Array) {
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
            var s = cc.find("/Canvas/Alphabet");
            console.log(commonValue.WinBoolean)
            if (commonValue.WinBoolean) {
                var Spawns = cc.find("/Canvas/Alphabet");
                LevelManager.destroyNode(Spawns.children);
                var SpawnsDis= cc.find("/Canvas/DisplayAlphabet");
                LevelManager.destroyNode(SpawnsDis.children);
                commonValue.GameScore += 1; // 关卡更新

                // var userData = {
                //     GameScore: commonValue.GameScore,
                // };
                // cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
                //
                // var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
                // console.log(userData);

                LevelManager.enterAfterGameScene();
                this.init(commonValue.GameScore);

                BoardCreator.onLoad();
                commonValue.WinBoolean = false;
                //words = result[commonValue.GameScore];
            }
            //console.log(commonValue.GameScore)

            console.log("屏幕接触取消");
        }, this);
    },

    objectState: function (Object, Array) {
        for (var i = 0; i < Array.length; i++) {
            Object[Array[i].name].opacity = 255;
            Object[Array[i].name].width = 10;
            Object[Array[i].name].height = 10;
            Object[Array[i].name].setAnchorPoint(0,0.5)
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
            LinePointArr[i].width = 60;
            LinePointArr[i].height = 60;
            LinePointArr[i].setAnchorPoint(0.5,0.5)
        }
    }
});