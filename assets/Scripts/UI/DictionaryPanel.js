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
        close: cc.Node,
        DictionaryPanel: cc.Node,
        DictionaryItemPrefab: cc.Prefab,
        scrollViewContent: cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.close.on(cc.Node.EventType.TOUCH_START, () => this.toClose(), this.close);
        console.log(window.allWordFound)
        this.dictionaryItem(window.allWordFound);
    },

    toClose: function () {
        this.DictionaryPanel.destroy();
    },

    dictionaryItem: function (data) {
        for (var i = 0; i < data.length; i++) {
            var word = data[i];
            // var item = cc.instantiate(this.DictionaryItemPrefab);
            // item.setPosition(cc.v2(0, 0))
            // item.getComponent('DictionaryItem').init(i, word);
            // this.scrollViewContent.addChild(item);
                var userItem = cc.instantiate(this.DictionaryItemPrefab);
                userItem.setScale(1, 1);
                userItem.getComponent('DictionaryItem').init(i, word);
                userItem.y = 220 - i * 50;
                console.log(userItem)
                // this.scrollViewContent.addChild(userItem);
                this.node.addChild(userItem, 1, "1000");

        }
        if (data.length <= 8) {
            var layout = this.scrollViewContent.getComponent(cc.Layout);
            layout.resizeMode = cc.Layout.ResizeMode.NONE;
        }
    },

    // start () {
    //
    // },

    // update (dt) {},
});
