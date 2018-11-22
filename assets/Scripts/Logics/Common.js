// window.number = 0;

module.exports = {
    alphabetNumber: 3,

    alphabetOrder: {
        "a": 0,
        "b": 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7,
        "i": 8,
        "j": 9,
        "k": 10,
        "l": 11,
        "m": 12,
        "n": 13,
        "o": 14,
        "p": 15,
        "q": 16,
        "r": 17,
        "s": 18,
        "t": 19,
        "u": 20,
        "v": 21,
        "w": 22,
        "x": 23,
        "y": 24,
        "z": 25
    },

    rankWord:[],
    // 所有关卡预存词汇

    touchedWord: "",
    // 触摸瞬间点击的单词

    WinBoolean: false,//是否通关

    PresentedWords:[],//已显示的单词

    GameClubButton: null,//游戏圈按钮
    GameScene: null,

    DEVICE_WIDTH: 720, // 屏幕宽度
    DEVICE_HEIGHT: 1280,

    MAIN_MENU_NUM: "Classic",// 主选择菜单

    GameScore: 0,//游戏得分
    GameHeightScore: 0,//游戏最高分

    IS_GAME_MUSIC: true,// 游戏音效

    IS_GAME_SHARE: false,// 游戏分享
    IS_GAME_START: false, //游戏是否开始
    IS_GAME_OVER: false,// 游戏是否结束
};