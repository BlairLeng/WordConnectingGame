var generate = cc.Class({
    ctor(Prefab, number, name, address) {
        this.Prefab = Prefab;
        this.number = number;
        this.name = name;
        this.address = address;
    },

    GeneratePics: function () {
        var SpawnsObject = []
        for (var i = 0; i < this.number; i++) {
            var NewPrefab = cc.instantiate(this.Prefab)
            NewPrefab.parent = this.address
            NewPrefab.name = this.name + `_${i}`
            SpawnsObject.push(NewPrefab);
        }
        return SpawnsObject
    },

    DestroyPics: function (ObjectsToDestroy) {
        for (var i = 0; i < ObjectsToDestroy.length; i++) {
            ObjectsToDestroy[i].destroy()
        }
    }

})

module.exports = generate