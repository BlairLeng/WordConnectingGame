// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        test: {
            type: cc.Prefab,
            default: [],
        },
        testLayout: cc.Node,

        line: [],

        lineTouched: [],

        LineLocation: []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var fab = cc.instantiate(this.test[0]);
        fab.parent = this.testLayout;
        fab.setScale(1, 1);
        fab.setPosition(cc.v2(0, 0));
        this.line.push(fab);
        console.log(fab)



    },

    generateLine: function (position, prefab, layout, name) {
        var fab = cc.instantiate(prefab);
        fab.parent = layout;//this.testLayout;
        fab.setScale(0.2, 0.3);
        fab.setPosition(position);
        fab.name = `${name}`;
        this.line.push(fab);
        this.lineEventListener(position, fab);
    },

    lineEventListener: function (position, line) {
        line.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.line, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);
            // lines.updateLine(this.alphabetsTouched, this.AlphabetLocation, this.testLayout.convertToNodeSpaceAR(touchLoc), this.test[0], this.testLayout);
            console.log("开始与屏幕接触fdsafds");
        }, this);

        line.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.line, touchLoc);
            this.pushTouchedAlphabet(checkedAlphabet);

            console.log("鼠标位置", line.parent.convertToNodeSpaceAR(touchLoc));
            // this.drawLine(position, layout.convertToNodeSpaceAR(touchLoc), this.line);

            this.updateLine(this.lineTouched, this.LineLocation, line.parent.convertToNodeSpaceAR(touchLoc));
            console.log("正在与屏幕接触");
        }, this);

        line.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            var checkedAlphabet = this.checkAlphabet(this.line, touchLoc);
            console.log(this.lineTouched);
            this.lineTouched = []; // 清空触摸过的字母数组
            console.log("屏幕接触取消");
        }, this);
    },

    drawLine: function (startPosition, endPosition, lineArr) {
        //this._start为起始点，this._end为终点就你touchmove时的当前点

        console.log("第一条线", lineArr.position, lineArr);
        console.log("第dfs一条线", startPosition, endPosition);

        lineArr.position = startPosition;
        var dt = startPosition.sub(endPosition);

        //计算角度
        var radian = Math.atan2(dt.x, dt.y);
        var rotation = (180 * radian / Math.PI + 90) % 360;
        //旋转线条
        lineArr.rotation = rotation;
        //设置宽度，我这里是用宽度改变的线条长度
        lineArr.width = startPosition.sub(endPosition).mag(); //cc.pDistance(this._start, this._end)
    },

    updateLine: function (_LinePointArr, _PointLocationArr, touchPoint) {
        console.log("sdsdsd",_LinePointArr, _PointLocationArr);
        if (_LinePointArr.length > 1) {
            for (var i = 1; i < _LinePointArr.length; i++) {
                //this.generateLine(_LinePointArr[i].position,prefab,layout);

                var pointIndex1 = _LinePointArr[i].name;
                console.log("啥", pointIndex1, _PointLocationArr[pointIndex1]);
                var pointIndex2 = _LinePointArr[i - 1].name;

                this.drawLine(_PointLocationArr[pointIndex2], _PointLocationArr[pointIndex1], this.line[i]);
            }
        }

        if (touchPoint != null) {
            var lastPointIndex = _LinePointArr[_LinePointArr.length - 1].name;
            var lastPoint = _PointLocationArr[lastPointIndex];
            this.drawLine(lastPoint, touchPoint, this.line[_LinePointArr.length - 1]);
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
        var existAlphabet = this.lineTouched.indexOf(alphabet);
        // var existAlphabet = this.alphabetsTouched.find(alphabet);
        if (existAlphabet === -1 && alphabet != null) {
            //添加暂存
            this.lineTouched.push(alphabet);
        }
    },

    // update (dt) {},
});
