
cc.Class({
    extends: cc.Component,

    properties: {
        Line: {
            default: null,
            type: cc.Prefab
        },
    },

    generate: function () {
        var a = cc.instantiate(this.Line);
        this.node.addChild(a);
        a.setScale(1, 1); // 大小
        a.setPosition(cc.v2(10, 10));
    },

    updateLine: function() {
        //this._start为起始点，this._end为终点就你touchmove时的当前点
        this.node.position = this._start;
        var dt = cc.pSub(this._start, this._end);
        //计算角度
        var radian = Math.atan2(dt.x, dt.y);
        var rotation = (180 * radian / Math.PI + 90) % 360;
        //旋转线条
        this.node.rotation = rotation;
        //设置宽度，我这里是用宽度改变的线条长度
        this.node.width =  cc.pDistance(this._start, this._end)
    },

    onLoad () {
        this.generate();
        // this.updateLine()
    },

    // start () {},

    // update (dt) {},
});
