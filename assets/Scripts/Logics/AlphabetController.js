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
var word = new generatedWord();
var words = word.onLoad();
// var words = ["pencil", "pen"];
module.exports = cc.Class({

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

        AlphabetLocation: {
            //存储生成字母的坐标 键值对
            default: [],
            type: cc.Node
        },

        test: {
            type: cc.Prefab,
            default: []
        },

        testLayout: cc.Node,

        line: [],

        linebyname: []

    },

    onLoad: function () {
        console.log("这个词", words);
        this.init();
    },

    init: function () {
        this.generateAlphabet();
        this.generateLine(this.AlphabetLocation);
    },

    generateAlphabet: function () {
        var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var NewPrefab = cc.instantiate(this.Alphabet[commonValue.alphabetOrder[longestWord[i]]]);
            NewPrefab.setScale(1, 1); // 大小
            NewPrefab.parent = this.AlphabetLayout;
            NewPrefab.name = `${longestWord[i] + i}`;
            // this.addTouchEvent(NewPrefab);
            this.SpawnsObject.push(NewPrefab);

            if (longestWord.length === 3) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -300)); // 位置
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
            }
            if (longestWord.length === 4) {
                if (i === 0) NewPrefab.setPosition(cc.v2(0, -250));
                else if (i === 1) NewPrefab.setPosition(cc.v2(0, -450));
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -350)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -350)); // 位置
            }
            if (longestWord.length === 5) {
                if (i === 0) NewPrefab.setPosition(cc.v2(0, -200));
                else if (i === 1) NewPrefab.setPosition(cc.v2(-100, -400));
                else if (i === 2) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(-200, -300)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(200, -300)); // 位置
            }
            if (longestWord.length === 6) {
                if (i === 0) NewPrefab.setPosition(cc.v2(-100, -100));
                else if (i === 1) NewPrefab.setPosition(cc.v2(100, -100));
                else if (i === 2) NewPrefab.setPosition(cc.v2(-100, -400)); // 位置
                else if (i === 3) NewPrefab.setPosition(cc.v2(100, -400)); // 位置
                else if (i === 4) NewPrefab.setPosition(cc.v2(-200, -250)); // 位置
                else if (i === 5) NewPrefab.setPosition(cc.v2(200, -250)); // 位置
            }
        }

        for (var i = 0; i < this.SpawnsObject.length; i++) {
            this.AlphabetLocation[this.SpawnsObject[i].name] = this.SpawnsObject[i].position;
        }
        // console.log("产出1", this.SpawnsObject);
        // console.log("产出2", this.AlphabetLocation);

    },

    addTouchEvent: function (Alphabet) {
        //console.log("canvas script onload");

        Alphabet.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            // console.log("sdfdsaf",this.alphabetsTouched);
            // lines.updateLine(this.alphabetsTouched, this.AlphabetLocation, this.testLayout.convertToNodeSpaceAR(touchLoc), this.test[0], this.testLayout);
            console.log("开始与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            // lines.updateLine(this.alphabetsTouched, this.AlphabetLocation, this.testLayout.convertToNodeSpaceAR(touchLoc), this.test[0], this.testLayout);
            console.log("正在与屏幕接触");
        }, this);

        Alphabet.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.testWord(this.alphabetsTouched);
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
            wordTouched += wordArr[i].name[0]
        }
        if (words.indexOf(wordTouched) !== -1
            && this.wordHasFound.indexOf(wordTouched) === -1) {
            this.wordHasFound.push(wordTouched);
            console.log("恭喜你答对了")
        }
        else {
            console.log("你是傻了吧")
        }
        console.log(wordTouched);
        console.log(this.wordHasFound);
    },

    // new
    generateLine: function (LocationArr) {
        var longestWord = words[0];
        for (var i = 0; i < longestWord.length; i++) {
            var fab = cc.instantiate(this.test[0]);
            fab.parent = this.testLayout;
            fab.name = `${longestWord[i] + i}`;
            fab.setScale(1, 1);
            fab.setPosition(LocationArr[fab.name]);
            this.lineEventListener(LocationArr[fab.name], fab);
            this.line.push(fab);
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
            this.updateLine(this.alphabetsTouched, this.AlphabetLocation, worldTouchLoc);
            // for (var i = this.line.length - 1; i >= 0; i--) {
            // 	console.log(this.line[i].name,this.line[i].position)
            // 	console.log(this.SpawnsObject[i].name,this.SpawnsObject[i].position)
            // }
            
            console.log("正在与屏幕接触");
        }, this);

        line.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            this.checkAlphabet(this.SpawnsObject, touchLoc);
            this.testWord(this.alphabetsTouched);
            // this.updateLine(this.alphabetsTouched, this.AlphabetLocation, null);
            this.clearLine(this.line);
            this.alphabetsTouched = []; // 清空触摸过的字母数组
            console.log("屏幕接触取消");
        }, this);
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
                // if (i === LinePointArr.length - 1) {
                //     break;
                // }
                console.log(i,this.line[i].name,this.line[i].position)
                var pointIndex1 = LinePointArr[i + 1].name;
                var pointIndex2 = LinePointArr[i].name;
                this.drawLine(PointLocationArr[pointIndex2], PointLocationArr[pointIndex1], this.line[i]);//this.linebyname[pointIndex2])//
            }
        }
        if (touchPoint != null) {
            var lastPointIndex = LinePointArr[LinePointArr.length - 1].name;
            var lastPoint = PointLocationArr[lastPointIndex];
            this.drawLine(lastPoint, touchPoint, this.line[LinePointArr.length - 1]);//this.linebyname[lastPointIndex])
        }
    },

    clearLine: function (LinePointArr) {
        for (var i = 0; i < LinePointArr.length; i++) {
            // console.log("复原后",LinePointArr[i].position);
            // console.log("复原前",this.line[i]);
            // console.log("字母位置",this.SpawnsObject[i]);
            LinePointArr[i].rotation = 0;
            LinePointArr[i].width = 10;
            LinePointArr[i].height = 10
        }

    }
});