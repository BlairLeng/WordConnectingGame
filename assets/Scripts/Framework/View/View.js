var view = cc.Class({
    ctor (myPrefab, tagetPrefab){
        this.myPrefab = myPrefab
        this.tagetPrefab = tagetPrefab
    },

    MovePositionByPrefab: function(myPrefab, targetPrefab){
        this.myPrefab.setPosition(cc.p(this.tagetPrefab.x, this.targetPrefab.y));
    },
})