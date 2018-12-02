// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
//import math;


var Level = require("./LevelManager");
// var alphabetController = require("./AlphabetController");
var Generate = require("../Framework/Controller/Generate");
// var Board = require("./WordPuzzleNew");

var LevelManager = new Level();

var address = new Object; // the dictionary that store each letter's index
var rest = new Array(); // the array to store any words that CAN NOT be in the puzzle; we will place them addtionally
var wordadd = new Object();
var board; //board variable
var BoardLen = 13;
var BoardWid = 13;
var wordcount = 0;
var lettercount = 0;
var totalletter = 0;
var wordforDisplay;
var unpresentedword = new Array();

cc.Class({
    extends: cc.Component,

    properties: {

        AlphabetLayout: cc.Node,

        Alphabet: {
            default: [],
            type: cc.Prefab
        },

        wordlist: [],

        Square1: cc.Prefab,
        Square2: cc.Prefab,
        Square3: cc.Prefab,

        DisplayLayout: cc.Node,


    },

//example for testing

    onLoad: function () {
        wordadd = [];
        rest = [];
        address = [];
        totalletter = 0;
        lettercount = 0;
        wordcount = 0;
        this.wordlist = [];


        this.wordlist = rankWord;
        //this.wordlist = ["space","case","sea","as"];


        board = this.CreateBoard();

        this.WordPuzzleMaker(board, this.wordlist.slice(0, 4));
        console.log(board);
        console.log(wordadd, this.wordlist[0])
        this.DisplaySquare(board, this.wordlist.slice(0, 4), wordadd);
        console.log("这是每一关的wordadd",wordadd);

        this.hint= cc.find("Canvas/Button/button_hint");
        console.log(this.hint)
        this.hint.on(cc.Node.EventType.TOUCH_END, () => this.hintClick(), this.hint);
    },

    DisplaySquare: function (board, wordlist, wordadd) {
        var longestword = wordlist[0];
        var len = longestword.length;
        for (var a = 0; a < wordlist.length; a++) {
            if (wordlist[a].length > longestword.length) {
                longestword = wordlist[a]
            }
        }

        var frequencyX = {};
        var frequencyY = {};
        var test2 = [];
        var wordl = Object.keys(wordadd);
        var wordp = Object.values(wordadd);

        for (var i = 0; i < wordp.length; i++) {
            for (var j = 0; j < wordp[i].length; j++) {
                test2.push(wordp[i][j])
            }
        }
        for (var i = 0; i < test2.length; i++) {
            frequencyX[test2[i][0]] = (frequencyX[test2[i][0]] || 0) + 1;
            frequencyY[test2[i][1]] = (frequencyY[test2[i][1]] || 0) + 1;
        }
        // console.log(frequencyX,frequencyY);

        var arrX = Object.keys(frequencyX);
        var minX = Math.min(...arrX);
        var maxX = Math.max(...arrX);
        this.mina = minX

        var arrY = Object.keys(frequencyY);
        var minY = Math.min(...arrY);
        var maxY = Math.max(...arrY);
        var message = (maxX-minX) > (maxY-minY) ? (maxX-minX+1) : (maxY-minY+1);

        // console.log(arrX,arrY,minX,minY,maxX,maxY,message);

        var generate = new Generate([this.Square1, this.Square2, this.Square3], 1, 1, this.DisplayLayout);
        generate.GenerateDisplay(message);

        var a = maxX - minX + 1 < message && ((maxX - Math.round((maxX - minX + 1) / 2))+1) <= message ? Math.round((maxX - minX + 1) / 2) : minX;
        var b = maxY - 6 + 1 <= message ? (maxY + 1 - message) : 6;
        for (var i = 0; i < test2.length; i++) {
            this.DisplayLayout.getChildByName(`${[test2[i][0]- minX,test2[i][1]-6]}`).opacity = 255;
            //console.log([test2[i][0]- a,test2[i][1]-6]);
        }
        // console.log(test2, this.DisplayLayout)


        var word = wordl[0];
        var letteradd = wordadd[word];
        console.log("letter add ", wordl);
        console.log("letter wordadd ", wordadd);
        console.log("letter de ", letteradd[0][0]);
    },


    WordPuzzleMaker: function (board, wordlist) {
        //This function will go through each word in the list and place them onto the board one by one

        var word;//variable to keep track of each word in the wordlist

        var a;
        for(a = 0; a<wordlist.length;a++)
        {
            var b;
            for(b = 0;b<wordlist[a].length;b++)
            {
                totalletter = totalletter + 1;
            }
        }
        console.log("这一关的total letter",totalletter);


        var i;//index variable
        for (i = 0; i < wordlist.length; i++) { //for loop to go through each word and place the word onto the board
            word = wordlist[i];
            //console.log(word);
            this.PlaceWord(board, word, i);
        }

        var j;//for loop index variable
        for (j = 0; j < rest.length; j++) //if there are any words left in the rest array which means those words CAN NOT be part of the puzzle
        { 
            console.log("call rest");                     //then put them onto any random empty spaces
            this.PlaceRest(board, rest[j],wordlist);
        }

    },

    AddressInsert: function (letter, indx, indy, n) {
        //This function insert the index for each letter that has been placed on the 2D board 
        //into the Address dictionary that we will return in the end
        //INPUT: each char,index i, index j

    

        if (letter in address) {
            var i;//for loop index variable
            for (i = 0; i < address[letter].length; i++) //to avoid insert same index again
            {

                if ((address[letter][i][0] == indx) && (address[letter][i][1] == indy)) {

                }
            }

        }
        else {
            address[letter] = [[indx, indy]]; //otherwise, insert this char into the dictionary and record the index
        }


        var word = this.wordlist[n]; // 此处要再确认

        if (word in wordadd) //if this particular char has already in dictionary
        {
            /*
            var i;//for loop index variable
            for(i=0;i<address[letter].length;i++) //to avoid insert same index again
            {

                if((address[letter][i][0]==indx)&&(address[letter][i][1]==indy))
                {
                    return;
                }
            }
            */
            wordadd[word] = wordadd[word].concat([[indx, indy,0]]); //add the index into the existing list
        }
        else {
            wordadd[word] = [[indx, indy,0]]; //otherwise, insert this char into the dictionary and record the index
        }
        window.wordadd = wordadd;

    },


    CreateBoard: function () {
        var i;//for loop index variable
        var a;//for loop index variable
        var b;//for loop index variable

        var ret = new Array(BoardLen);
        //The return variable: return an initialized 2D board
        //with the initialization of ALl 0s

        //TO KNOW: There are 5 kinds of elements in the 2D board: letter,0,1,2,3
        //letter: each letter that has been placed into the board
        //0 means that that specifc block is available; In other words, it is empty and you can place the letter/word
        //1 means that although that block is empty, the blocks besides it has been placed by some letters; 
        // so in order not to conflict with other words, you can only place letter/word HORIZONTALLY
        //2 means that although that block is empty, the blocks besides it has been placed by some letters; 
        // so in order not to conflict with other words, you can only place letter/word VERTICALLY
        //3 means that although that block is empty, the blocks besides it has been placed by some letters; 
        // so in order not to conflict with other words, you CAN NOT place letter into this block

        for (i = 0; i < BoardLen; i++) {
            ret[i] = new Array(BoardWid);

        }

        for (a = 0; a < ret.length; a++) {
            for (b = 0; b < ret[a].length; b++) {
                ret[a][b] = 0;
            }
        }
        return ret;
    },


    PlaceWord: function (board, word, n) {
        // this function will get the starting postion(index) for the word
        // It will return [index i,index j, flag variable]
        // The flag variable serves as a message to tell how to place the word (horizontal or vertical)
        // If the flag variable is 0, then we will place the word horizontally;
        // If the flag variable is 1, then we will place the word vertically;
        var startpos;

        startpos = this.GetStartPosition(board, word);

        if (startpos[0] == -1) {
            console.log("word是啥",word);
            console.log("进rest");
            rest = rest.concat([word]);
            console.log("rest",rest);

            return board;
        }

        var x; //variable to store the index i
        var y; //variable to store the index j
        var flag;//variable to store the flag

        x = startpos[0];
        y = startpos[1];
        flag = startpos[2]

        console.log("this word startpos", startpos);

        if (flag == 0)//place the word HORIZONTALLY
        {

            var i;//for loop index variable
            for (i = 0; i < word.length; i++) {
                if (i == 0) //the first letter of the word
                {
                    if (board[x][y - 1] == 0) {
                        board[x][y - 1] = 3; //the block that is left to the first letter will be assigned to 3
                                             //Because no matter how you place the letter into this block later
                                             //it will conflict with the current word
                    }

                    if (board[x][y - 1] == 1) {
                        board[x][y - 1] = 3; //the block that is left to the first letter will be assigned to 3
                                             //Because no matter how you place the letter into this block later
                                             //it will conflict with the current word
                    }

                    if (board[x][y - 1] == 2) {
                        board[x][y - 1] = 3; //the block that is left to the first letter will be assigned to 3
                                             //Because no matter how you place the letter into this block later
                                             //it will conflict with the current word
                    }
                }
                if (i == word.length - 1) //the last letter of the word
                {
                    if (board[x][y + i + 1] == 0) {
                        board[x][y + i + 1] = 3; //the block that is right to the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word
                    }
                    if (board[x][y + i + 1] == 1) {
                        board[x][y + i + 1] = 3; //the block that is right to the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word
                    }
                    if (board[x][y + i + 1] == 2) {
                        board[x][y + i + 1] = 3; //the block that is right to the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word
                    }
                }

                if (board[x - 1][y + i] == 0)//by placing the letter into the current block, we need to assign
                {                     //the block above the current block to 2 which means "available for only placing horizontal"
                    //In other words, from now on, the block above will only be able to place a word that is placed horizontally
                    board[x - 1][y + i] = 2;
                }
                else if (board[x - 1][y + i] == 1) {
                    board[x - 1][y + i] = 3;
                }
                else if (board[x - 1][y + i] == 2) {
                    board[x - 1][y + i] = 3;
                }

                if (board[x + 1][y + i] == 0)//by placing the letter into the current block, we need to assign
                {                     //the block below the current block to 2 which means "available for only placing horizontal"
                    board[x + 1][y + i] = 2;

                }
                else if (board[x + 1][y + i] == 1) {
                    board[x + 1][y + i] = 3;
                }
                else if (board[x + 1][y + i] == 2) {
                    board[x + 1][y + i] = 3;
                }

                board[x][y + i] = word[i]; //place the letter onto the board
                this.AddressInsert(word[i], x, y + i, n); //insert the index information into the Address dictionary
                //[letter,index i,index j]
            }
        }
        else if (flag == 1)//place the word VERTICALLY
        {
            console.log("长度", word.length);
            var j;//for loop index variable
            for (j = 0; j < word.length; j++) {
                console.log("字母", word[j]);
                if (j == 0) //the first letter of the word
                {
                    if (board[x - 1][y] == 0) {
                        board[x - 1][y] = 3;  //the block that is above the first letter will be assigned to 3
                                              //Because no matter how you place the letter into this block later
                                              //it will conflict with the current word
                    }
                    else if (board[x - 1][y] == 1) {
                        board[x - 1][y] = 3;  //the block that is above the first letter will be assigned to 3
                                              //Because no matter how you place the letter into this block later
                                              //it will conflict with the current word
                    }
                    else if (board[x - 1][y] == 2) {
                        board[x - 1][y] = 3;  //the block that is above the first letter will be assigned to 3
                                              //Because no matter how you place the letter into this block later
                                              //it will conflict with the current word
                    }
                }
                if (j == word.length - 1) //the last letter of the word
                {
                    if (board[x + j + 1][y] == 0) {
                        board[x + j + 1][y] = 3; //the block that is below the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word

                    }
                    else if (board[x + j + 1][y] == 1) {
                        board[x + j + 1][y] = 3; //the block that is below the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word

                    }
                    else if (board[x + j + 1][y] == 2) {
                        board[x + j + 1][y] = 3; //the block that is below the last letter will be assigned to 3
                                                 //Because no matter how you place the letter into this block later
                                                 //it will conflict with the current word

                    }
                }
                if (board[x + j][y - 1] == 0) {
                    board[x + j][y - 1] = 1;
                }
                else if (board[x + j][y - 1] == 2) {
                    board[x + j][y - 1] = 3;
                }
                else if (board[x + j][y - 1] == 1) {
                    board[x + j][y - 1] = 3;
                }

                if (board[x + j][y + 1] == 0) {
                    board[x + j][y + 1] = 1;
                }
                else if (board[x + j][y + 1] == 2) {
                    board[x + j][y + 1] = 3;
                }
                else if (board[x + j][y + 1] == 1) {
                    board[x + j][y + 1] = 3;
                }

                board[x + j][y] = word[j]; //place the letter onto the board
                this.AddressInsert(word[j], x + j, y, n); //insert the index information into the Address dictionary
                //[letter,index i,index j]

            }
        }
        return board;
    },

    GetStartPosition: function (board, word) {
        //This function will get the starting position for each word
        //Generally speaking the way to get starting postion:
        //we will go through the letters that have been placed onto the board to see if some of the letters can
        //match with the letter in the word that we want to place now.
        //If we find such letter existed, we will check its availability by checking the available spaces around that block both horizontally and vertically
        //if the availability works, then we will return the staring position as that existing block's index
        //If we can't find such letter, then we will return [-1,-1,-1] which implies that it might be a good time to place this word right now
        //if you track [-1,-1,-1] in the PlaceWord function, it will simply return the board by making no changes.

        var addlen;
        var key;
        //console.log("place this word",word);


        if (board[6][6] == 0)//According to the way we create the board,[6][6] is the center
        {                   //we will always first put the word in center (if center position is available)
            return [6, 6, 0];
        }

        addlen = Object.keys(address).length;

        //address is the Dictionary that we record the index of each letter that has been placed onto the board

        var i; //for loop index variable
        for (i = 0; i < addlen; i++) //go through each letter in the address dictionary
        {
            key = Object.keys(address)[i]; //variable to keep track of the current letter

            //console.log("the current out key"+key);


            if (word.indexOf(key) != -1)//if the word that we want to place contains the key
            {                         //for example, "sit" contains "i"
                //By knowing the word contains the key letter is not enough, we also need to know the which position of the letter in the word
                //for example "sit" contains "i" and "i" is the second letter in the word “sit"
                //there are one letter that is to the left of "i"
                //and there are one letter that is to the right of "i"
                //console.log("the current key"+key);

                var ind;
                var frontlen; //store the number of blocks we need the place the letters before the key letter; In "sit", we need one block to place "s" 
                var behindlen; //store the number of blocks we need the place the letters after the key letter; In "sit", we need one block to place "t" 

                ind = word.indexOf(key); //the index of the key letter in the word
                frontlen = ind;
                behindlen = word.length - 1 - ind;
                //console.log("in starpos 单词是",word);

                //console.log("前",frontlen);
                //console.log("后",behindlen);


                var a; //for loop index variable
                for (a = 0; a < address[key].length; a++) //There are might be several same key letters on the board
                {                                     //therefore, a for loop to go through each position for that key letter

                    var keyind; //variable to keep track the current key letter's index
                    var keyind = address[key][a];

                    var x;
                    var y;
                    x = keyind[0];//variable to store the keyind's index i
                    y = keyind[1];//variable to store the keyind's index j

                    if (this.CheckAvlH(x, y, frontlen, behindlen, board))//Check if this block has enough availability in horizontal direction
                    {                                               //if YES, then return the starting postion [index i,index j,flag = 0]
                        return [x, y - frontlen, 0];
                    }
                    else if (this.CheckAvlV(x, y, frontlen, behindlen, board))//Check if this block has enough availability in vertical direction
                    {                                  //if YES, then return the starting postion [index i,index j,flag = 1]
                        return [x - frontlen, y, 1];
                    }

                }

            }

        }
        //if we can't find a key letter that can match with the letters in the current word or if all of the key letters don't 
        //have enough empty spaces, then we will return [-1,-1,-1] to tell the PlaceWord function that there is no starting position
        //for this word, so PlaceWord function will do nothing and just return the board without any changes.

        return [-1, -1, -1];
    },

    CheckAvlH: function (indx, indy, front, behind, board) {

        //This function will check the availability of a given block in the horizontal direction
        //INPUT:[index x,index y,front,behind,board]
        //front represents the number of blocks that is needed before the position[i,j]
        //behind represents the number of blocks that is needed behind the position[i,j]

        var frontlen = front;
        var behindlen = behind;

        var x = indx;
        var y = indy;


        if (((x - frontlen) < 0) && ((x + behindlen) > 12)) //Due to the way we created the board
        {                                          //the board is limited by BoardLen and BoardWid.
            //we need check if the index will out of the bound. In other words, not enough spaces due to out of bound
            return false;
        }
        if (((y - frontlen) < 0) && ((y + behindlen) > 12)) //same thing above; checking boundary
        {
            return false;
        }

        //TO KNOW: In order to check availability, we need to check each block's number
        //By recalling the rules above, if we want to place the word horizontally, each block should be either 0 or 1

        var i; //for loop index variable
        for (i = 1; i <= frontlen; i++) {
            if ((board[x][y - i] == 3) || (board[x][y - i] == 2)) //since the element inside a block can only be 5 kinds(0,1,2,3,letter)
            {                                          //after the 1st if statement, the possible element can only be (0,1,letter)
                //In this if statement, we check if the element is a letter, then return false
                return false;
            }
            if ((board[x][y - i] != 0) && (board[x][y - i] != 1)) {
                return false;
            }
        }

        var j; //for loop index variable
        for (j = 1; j <= behindlen; j++) //same thing as above
        {

            if ((board[x][y + i] == 3) || (board[x][y + i] == 2)) {
                return false;
            }
            if ((board[x][y + i] != 0) && (board[x][y + i] != 1)) {
                return false;
            }
        }
        return true;
    },

    CheckAvlV: function (indx, indy, front, behind, board) {

        //This function will check the availability of a given block in the horizontal direction
        //INPUT:[index x,index y,front,behind,board]
        //front represents the number of blocks that is needed before the position[i,j]
        //behind represents the number of blocks that is needed behind the position[i,j]
        var frontlen = front;
        var behindlen = behind;

        var x = indx;
        var y = indy;

        if (((x - frontlen) < 0) && ((x + behindlen) > 12)) //Due to the way we created the board
        {                                          //the board is limited by BoardLen and BoardWid.
            //we need check if the index will out of the bound. In other words, not enough spaces due to out of bound
            return false;
        }
        if (((y - frontlen) < 0) && ((y + behindlen) > 12)) //same thing above; checking boundary
        {
            return false;
        }

        //TO KNOW: In order to check availability, we need to check each block's number
        //By recalling the rules above, if we want to place the word vertically, each block should be either 0 or 2

        var i; //for loop index variable
        for (i = 1; i <= frontlen; i++)     //since the element inside a block can only be 5 kinds(0,1,2,3,letter)
        {                              //after the 1st if statement, the possible element can only be (0,2,letter)
            //In this if statement, we check if the element is a letter, then return false
            if ((board[x - i][y] == 3) || (board[x - i][y] == 1)) {
                return false;
            }
            if ((board[x - i][y] != 0) && (board[x - i][y] != 2)) {
                return false;

            }
        }

        var j;
        for (j = 1; j <= behindlen; j++)//same thing as above
        {
            if ((board[x + i][y] == 3) || (board[x + i][y] == 1)) {
                return false;
            }
            if ((board[x + i][y] != 0) && (board[x + i][y] != 2)) {
                return false;
            }
        }

        return true;
    },

    PlaceRest: function (board, word,wordlist) {
        //this function will place the words that CAN NOT be in the puzzle
        

        var lenr = BoardLen;
        var lenc = BoardWid;
        var wordlen = word.length;

        var starti = 0;
        var startj = 0;

        for(var r =0;r<BoardLen;r++)
        {
            for(var c = 0;c<BoardWid;c++)
            {
                var em = board[r][c];
                if(em==3)
                {
                    starti = r;
                    startj = c;
                    break;

                }


            }
            if(starti!=0)
            {
                break;
            }
        }

        var i;
        for(i = starti; i < lenr; i++)
        {
            var j;

            for(j = startj; j < lenc; j++)
            {
                var ele = board[i][j]

                console.log("在哪里",i,j);
                
                if(ele==0)
                {
                    if(this.CheckAvlH(i,j,0,word.length-1,board))
                    {
                        console.log("check了哦")

                        var a;
                        for (a = 0; a < wordlen; a++) 
                        {
                            console.log("进for loop")
                            board[i][j+a] = word[a]
                            this.AddressInsert(word[a], i, j+a, wordlist.indexOf(word));

                        }
                        return;


                    }
                    else if(this.CheckAvlV(i,j,0,word.length-1,board))
                    {
                        var a;
                        for (a = 0; i < wordlen; i++) 
                        {
                            board[i+a][j] = word[a]
                            this.AddressInsert(word[a], i+a, j, wordlist.indexOf(word));

                        }
                        //this.AddressInsert(word[], x + j, y, n)
                        return;

                    }
                }

                

            }
        }

        

    },

    AvoidRep: function(board,x,y,wordadd){
        //console.log("在avoid");
        //console.log(i);
        //console.log(j);
        var key = Object.keys(wordadd);

        var i;
        for(i = 0; i<key.length;i++)
        {
            var word = key[i];
            var addr = wordadd[word];

            var j;
            for(j = 0;j<addr.length;j++)
            {
                var indi = addr[j][0];
                var indj = addr[j][1];

                if((indi == x)&&(indj == y))
                {
                    wordadd[word][j][2] = 1;
                    lettercount = lettercount + 1;
                    //console.log("rep",wordadd[word]);
                }
            }

        }


    },

    DisplayW: function (board, wordadd,wordlist, wordforDisplay) {

        var addr = wordadd[wordforDisplay];
        // console.log("addr",addr)
        if (addr !== undefined) {
            
            wordcount = wordcount + 1;//在此处 把Wordcount加一，表明已有单词被玩家猜中
            for (var i = 0; i < wordforDisplay.length; i++) {
                //lettercount = lettercount + 1;
                wordadd[wordforDisplay][i][2] = 1;
                this.AvoidRep(board,addr[i][0],addr[i][1],wordadd);
                console.log("letter", wordforDisplay[i]);
                var NewPrefab = cc.instantiate(this.Alphabet[alphabetOrder[wordforDisplay[i]]]);
                NewPrefab.parent = this.AlphabetLayout;
                NewPrefab.name = `${wordforDisplay[i]}`;
                var Position = this.DisplayLayout.getChildByName(`${[addr[i][0]- this.mina,addr[i][1]-6]}`).position;
                var finalPosition =this.DisplayLayout.convertToWorldSpaceAR(Position)
                var Scale = this.DisplayLayout.getChildByName(`${[addr[i][0]- this.mina,addr[i][1]-6]}`).getScale()
                NewPrefab.setScale(Scale); // 大小
                // console.log(this.AlphabetLayout.convertToNodeSpaceAR(finalPosition))

                NewPrefab.setPosition(cc.v2(this.AlphabetLayout.convertToNodeSpaceAR(finalPosition)));
            }
        }
        //commonValue.touchedWord = ""
    },

    DisplayHint: function (board, displayedWord, wordadd, alpabetPrefab) {
        var wordl = Object.keys(wordadd);

        for(var i = 0;i<wordl.length;i++) {
            var word = wordl[i];
            var addr = wordadd[word];
            //console.log("测试",wordl,addr);
            //console.log()
            for(var j = 0;j<addr.length;j++) {

                if(addr[j][2]==0) {
                    //console.log("这次的hint",letter);
                    var letter = word[j]
                    var posi = addr[j][0]
                    var posj = addr[j][1]
                    //console.log("这次的hint",letter);

                    var NewPrefab = cc.instantiate(this.Alphabet[alphabetOrder[letter]]);
                    NewPrefab.parent = this.AlphabetLayout;
                    var Position = this.DisplayLayout.getChildByName(`${[posi- this.mina,posj-6]}`).position;
                    var finalPosition =this.DisplayLayout.convertToWorldSpaceAR(Position)
                    // console.log(addr)
                    var Scale = this.DisplayLayout.getChildByName(`${[posi- this.mina,posj-6]}`).getScale()
                    NewPrefab.setScale(Scale);
                    NewPrefab.setPosition(cc.v2(this.AlphabetLayout.convertToNodeSpaceAR(finalPosition)));
                    wordadd[word][j][2] = 1
                    //lettercount = lettercount + 1;
                    this.AvoidRep(board,posi,posj,wordadd);
                    return;
                }
            }
        }

    },
    
    hintClick: function () {
        this.DisplayHint(board,this.wordlist.slice(0,4),wordadd);
    },


    update(dt) {
        // console.log("这个是从commonvalue里过来的touched word", commonValue.touchedWord);
        //console.log("现在的letter count",lettercount);
        if (touchedWord !== "") {
            this.DisplayW(board, wordadd,this.wordlist.slice(0, 4), touchedWord);
            delete wordadd[touchedWord];
            touchedWord = "";
        }
        //console.log("fdsafa",wordcount,this.wordlist)
        if (wordcount >= 4
            || wordcount >= this.wordlist.length || lettercount == totalletter) {
            window.WinBoolean = true;
            var Spawns = cc.find("/Canvas/Alphabet");
            LevelManager.destroyNode(Spawns.children);
            var SpawnsDis = cc.find("/Canvas/DisplayAlphabet");
            LevelManager.destroyNode(SpawnsDis.children);
            window.allWordFound = [];
            window.GameScore += 1; // 关卡更新
            LevelManager.enterAfterGameScene();

            Spawns.getComponent('AlphabetController').init();
           
            this.onLoad();
            window.WinBoolean = false;
            wordcount = 0;

        }


        // if(window.hinttouched == true)
        // {
        //     this.DisplayHint(board,this.wordlist.slice(0,4),wordadd);
        // }
    },

});
