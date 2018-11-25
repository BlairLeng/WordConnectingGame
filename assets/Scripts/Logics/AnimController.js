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
        Clips : cc.Animation
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

  
    animState : function () {
        var anim = this.getComponent(cc.Animation);
        
        var animState = anim.play('Amplify');
        // // 获取动画关联的clip
        // var clip = animState.clip;
        // // 获取动画的名字
        var name = animState.name;
        console.log('名字:',name);

        // // 获取动画的播放速度
        var speed = animState.speed;
        console.log('速度:',speed);

        // // 获取动画的播放总时长
        var duration = animState.duration;
        console.log('时长:',duration);

        // // 获取动画的播放时间
        var time = animState.time;
        console.log('时间:',time);

        // // 获取动画的重复次数
        var repeatCount = animState.repeatCount;
        console.log('重复:',repeatCount);

        // // 获取动画的循环模式
        var wrapMode = animState.wrapMode
        console.log('循环:',wrapMode);

        // // 获取动画是否正在播放
        var playing = animState.isPlaying;
        console.log('是否播放:',playing);

        // // 获取动画是否已经暂停
        var paused = animState.isPaused;
        console.log('是否暂停:',paused);

        // // 获取动画的帧率
        var frameRate = animState.frameRate;
        console.log('帧数:',frameRate);
        
        anim.stop();

       
        // var delay1 = cc.delayTime(0.5); //延迟0.5秒
        // var toBigAction1 = cc.scaleTo(0.3, 3); //0.3秒变成3倍大小(默认是线性的放大，即匀速放大)
        // var action1 = cc.sequence(delay1, toBigAction1); //按顺序执行，先延迟1秒，后缩放
        // this.birdNode1.runAction(action1); //this.birdNode1执行以上动作

    },


    testMove : function() {
        var move =  this.moveTo(2, 100, 100);
        // 执行动作
        node.runAction(action);
        // 停止一个动作
        node.stopAction(action);
        // 停止所有动作
        // node.stopAllActions();
    },

    generateClips : function () {
        // var nodeTest = new cc.Node();
 
        // nodeTest.name = 'NodeTest';
        
        // var sprite = nodeTest.addComponent(cc.Sprite);
        
        // sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/cubetype1.png'));
        
        // nodeTest.parent = this.node;
        
        // var animation = nodeTest.addComponent(cc.Animation);
        
        var animation = this.node.getComponent(cc.Animation);
        // frames 这是一个 SpriteFrame 的数组.
        var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrame, 10);
        clip.name = "anim_run";
        clip.wrapMode = cc.WrapMode.Loop;

        // 添加帧事件
        clip.events.push({
            frame: 1,               // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件
            func: "frameEvent",     // 回调函数名称
            params: [1, "hello"]    // 回调参数
        });

        animation.addClip(clip);
        animation.play('anim_run');

    },

    animStart : function (touch) {
        var anim = this.getComponent(cc.Animation);
        var detectTouch = touch;
        var state = anim.play();
        anim.play('Amplify');
    },

    playAmplify: function() {
        var anim = this.getComponent(cc.Animation);
        anim.play('Amplify');
    },

    playEmerge: function() {
        var anim = this.getComponent(cc.Animation);
        anim.play('Emerge');
    },

    // playSubmerge: function() {
    //     var anim = this.getComponent(cc.Animation);
    //     anim.play('Submerge');
    // },



    onLoad : function () {
        var anim = this.getComponentsInChildren(cc.Animation);
        console.log(anim);
        for(var i = 0; i < anim.length; i++) {
            anim[i].stop();
        }
        //console.log(anim);
        //var animChild = this.getComponentsInChildren(cc.Animation);
        //console.log(animChild);
        // var state = anim.play('Emerge');
        //console.log(animChild);
        //anim.play('Emerge');
        //anim.play('Emerge');
        //this.playAmplify();
        //this.playEmerge();
        //this.playSubmerge();
    },
    // update (dt) {},
});
