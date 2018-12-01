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
    },

    GenerateDisplay: function (message) {
    switch (message)
    {
    case 3: 
        for (var i = 0; i <3;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<3;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(1, 1);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 130;
                this.address.getComponent(cc.Layout).paddingLeft = 240;
                this.address.getComponent(cc.Layout).paddingTop = 40;
                this.address.getComponent(cc.Layout).spacingX = 30;
                this.address.getComponent(cc.Layout).spacingY = 30;
            }
        }
        break;

    case 4:
        for (var i = 0; i <4;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<4;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(1, 1);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 80;
                this.address.getComponent(cc.Layout).paddingLeft = 160;
                this.address.getComponent(cc.Layout).paddingTop = 40;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;

    case 5:
        for (var i = 0; i <5;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<5;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(0.85, 0.85);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 80;
                this.address.getComponent(cc.Layout).paddingLeft = 140;
                this.address.getComponent(cc.Layout).paddingTop = 40;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;

    // case 6:
    //     for (var i = 0; i <6;i++) {
    //         var prefablist = this.Prefab;
    //         for (var j=0;j<6;j++) {
    //             var Sprefab = Math.floor(Math.random()*3);
    //             var NewPrefab = cc.instantiate(prefablist[Sprefab])
    //             NewPrefab.setScale(0.75, 0.75);
    //             NewPrefab.parent = this.address;
    //             NewPrefab.name = `${[i,j]}`;
    //             // console.log(NewPrefab)
    //             // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
    //             this.address.getComponent(cc.Layout).paddingRight = 20;
    //             this.address.getComponent(cc.Layout).paddingLeft = 110;
    //             this.address.getComponent(cc.Layout).paddingTop = 40;
    //             this.address.getComponent(cc.Layout).spacingX = 15;
    //             this.address.getComponent(cc.Layout).spacingY = 15;
    //         }
    //     }
    //     this.address.getChildByName("1,1").opacity = 0

    case 6:
        for (var i = 0; i <6;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<6;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(0.72, 0.72);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 80;
                this.address.getComponent(cc.Layout).paddingLeft = 120;
                this.address.getComponent(cc.Layout).paddingTop = 40;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;


    case 7:
        for (var i = 0; i <7;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<7;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(0.6, 0.6);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 80;
                this.address.getComponent(cc.Layout).paddingLeft = 120;
                this.address.getComponent(cc.Layout).paddingTop = 40;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;

    case 8:
        for (var i = 0; i <8;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<8;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(0.55, 0.55);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // console.log(NewPrefab)
                // console.log("名字x", NewPrefab.name[0],"名字y", NewPrefab.name[2])
                this.address.getComponent(cc.Layout).paddingRight = 60;
                this.address.getComponent(cc.Layout).paddingLeft = 90;
                this.address.getComponent(cc.Layout).paddingTop = 10;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;

    case 9:
        for (var i = 0; i <9;i++) {
            var prefablist = this.Prefab;
            for (var j=0;j<9;j++) {
                var Sprefab = Math.floor(Math.random()*3);
                var NewPrefab = cc.instantiate(prefablist[Sprefab])
                NewPrefab.setScale(0.5, 0.5);
                NewPrefab.parent = this.address;
                NewPrefab.name = `${[i,j]}`;
                NewPrefab.opacity = 0;
                // NewPrefab.setPosition(cc.v2((starti+(indi - 6) * uniti),(startj-(indj - 6) * unitj)));
                this.address.getComponent(cc.Layout).paddingRight = 60;
                this.address.getComponent(cc.Layout).paddingLeft = 60;
                this.address.getComponent(cc.Layout).spacingX = 15;
                this.address.getComponent(cc.Layout).spacingY = 15;
            }
        }
        break;
    }
    }


})

module.exports = generate