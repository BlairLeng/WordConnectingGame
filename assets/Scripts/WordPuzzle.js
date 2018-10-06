// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var wordlist = ["is","sit","it","its"];
//example for testing

var dict = new Object; 
var address = new Object; 
//the dictionary to return the final index address
//for each letter

var BoardLen = 13;
var BoardWid = 13;
//for display use

WordPuzzleMaker(wordlist);

function WordPuzzleMaker(wl){
    //serve as a play function
    var board;
    var wordl = wl;
    var wd;
    var i;

    board = CreateBoard(BoardLen,BoardWid);
    //console.log(board);
    for(i = 0;i<wordl.length;i++){
        wd = wordl[i];
        //console.log(wd);
        board = PlaceWord(board,wd);
    }
    //console.log(address);
    //console.log(board);

}



function CreateBoard(BoardLenInd,BoardWidInd){
    //创建一个board


    var i;
    var a;
    var b;
    var ret;

    ret = new Array(BoardLenInd);

    for(i = 0;i<BoardLenInd;i++){
        ret[i] = new Array(BoardWidInd);    
    }

    for(a = 0;a<ret.length;a++){
        for(b = 0;b<ret[a].length;b++){
            ret[a][b] = 0;
        }
    }
    console.log(ret);
    return ret;
}



function AddressInsert(c,i,j){
    //把已经放置完成的letter的坐标记录下来，存进名为address的dictionary里

    if(c in address){
        address[c] = address[c].concat([[i,j]]);
       
    }
    else{
        address[c] = [[i,j]];

    }


}



function PlaceWord(b,w){
    //放置Word的function
    //console.log("in placeword");
    var word = w;
    var bd = b;


    var sp;

    sp = GetSp(bd,word);
    //get the start position
    //console.log(sp);
    //console.log(word);
    if(sp[0]==-1){
        
        return bd;

    }

    var x;
    var y;

    x = sp[0];
    y = sp[1];
    //console.log("this is sp");
    //console.log(sp);


    if(sp[2] == 0){
        //console.log("?");

        //放左边
        var i;
        for(i=0;i<word.length;i++){
            //console.log("in for loop");
            if(i==0){

                bd[x][y-1] = 2;
            }
            if(i==word.length-1){
                bd[x][y+i+1] = 2;
            }
            //if(bd[x-1][y+i]!=0){
                //每个格子上面的格子
                //bd[x-1][y+i]=3;
            //}
            //if(bd[x+1][y+i]!=0){
                //每个格子下面的格子
                //bd[x+1][y+i]=3;
            //}
            //console.log("1");
            bd[x][y+i] = word[i];
            AddressInsert(word[i],x,y+i);


        }

    }
    else if(sp[2]==1){
        //放下面
        var j;
        //console.log("kai shi fang");
        //console.log(word);

        for(j=0;j<word.length;j++){
            if(j==0){
                bd[x-1][y] = 1;
            }
            if(j==word.length-1){
                bd[x+j+1][y] = 1;
            }
            //if(bd[x+i][y-1]!=0){
                //每个格子上面的格子
                //bd[x+i][y]=3;
            //}
            //if(bd[x+i][y+1]!=0){
                //每个格子下面的格子
                //bd[x+i][y+1]=3;
            //}
            bd[x+j][y] = word[j];
            AddressInsert(word[j],x+j,y);


        }

    }
    return bd;


}

function GetSp(b,w){
    //return 每一个Word将为摆放位置的starting position
    //[x,y,f]
    //x,y即为坐标，f表示着 这个Word 将会是横着放 还是竖着放
    //f = 0表明横着放；1是竖着放

    var board;
    var word = w;
    var i;
    
    var key;
    var ind;
    var addlen;
    board = b;


    

   

    if(board[6][6] == 0){
        return [6,6,0];
        //0 表示 放左边放
    }

    addlen = Object.keys(address).length;
    console.log(address);

    for(i = 0;i<addlen;i++){
        var key;
        //console.log("what is the key for now");
        key = Object.keys(address)[i];
        console.log(key);
        if(word.indexOf(key)!= -1){
            var i;
            var fl;
            var bl;
            //console.log("have that letter");

            i = word.indexOf(key);
            fl = i;
            bl = word.length-1-i;
            var j;
            
          

            for(j = 0; j<address[key].length;j++){
                var ind;

                var ind = address[key][j];
                //console.log("ind");
                //console.log(ind);
                var x;
                var y;
                x = ind[0];
                y = ind[1];
                //console.log(x);
                //console.log(y);
                //console.log("OK?");
                if(CheckAvlH(x,y,fl,bl,board)){
                    return [x,y-fl,0];
                    //左右放


                }
                else if(CheckAvlV(x,y,fl,bl,board)){
                    return [x-fl,y,1];
                    //上下放

                }

            }



        }

    }

    return [-1,-1,-1];
}


function CheckAvlH(x,y,f,b,bd){
    
    var fl = f;
    var bl = b;
    var board = bd;

    var x = x;
    var y = y;

    var i;
    var j;

    if(((x-fl)<0) && ((x+bl)>12)){
        return false;
    }
    if(((y-fl)<0) && ((y+bl)>12)){
        return false;
    }


    for(i = 1;i<=fl;i++){
        //if(board[x][y-i]==2){
        //    return false;
        //}
        //else if(board[x][y-i]==3){
        //    return false;
        //}
        if(board[x][y-i]!=0){
            return false;

        }

    }

    for(j = 1;j<=bl;j++){
        //if(board[x][y+j]==2){
        //    return false;
        //}
        //else if(board[x][y+j]==3){
        //    return false;
        //}
        if(board[x][y+i]!=0){
            return false;

        }

    }

    return true;

}

function CheckAvlV(x,y,f,b,bd){
  
    var fl = f;
    var bl = b;
    var board = bd; 

    var x = x;
    var y = y;

    var i;
    var j;

    for(i = 1;i<=fl;i++){
        //if(board[x-i][y]==1){
        //    return false;
        //}
        //else if(board[x-i][y]==3){
        //    return false;
        //}
        if(board[x-i][y]!=0){
            return false;
        }
    }

    for(j = 1;j<=bl;j++){
        //if(board[x+j][y]==1){
        //    return false;
        //}
        //else if(board[x+j][y]==3){
        //    return false;
        //}
        if(board[x+i][y]!=0){
            return false;
        }
    }

    return true;
}


/*
function DictInsertion(w){
    var i;
    var j;
    var temp;
    var templen;

    for(i = 0;i<w.length;i++){
        for(j = 0;j<w[i].length;j++){
            
            if(w[i][j] in dict){
                temp = w[i][j];
                templen = dict[w[i][j]].length;
                if(dict[temp][templen-1][0]!=i){
                    //dict[temp][length-1] = dict[temp][templen-1].concat([j]);
                    dict[temp] = dict[temp].concat([[i,j]]);

                }
            }
            else
            {
                dict[w[i][j]] = [[i,j]];
            }
            
        }
    }
}



DictInsertion(wordlist);
//console.log(Object.keys(dict)[0]);
//console.log(Object.keys(dict)[1]);
*/


/*
function FindMostFreWord(w){
    var i;
    var j;
    var temp;
    var word;
    

    for(i = 0;i<w.length;i++){
        for(j = 0;j<w[i].length;j++){
            temp = w[i][j];

            if(dict[temp].length>mf){
                mf = dict[temp].length;
                word = temp;
            }

        }
    }

    return word;

}

*/



 







    



//var boardl = [CreateBoard(BoardLen,BoardWid),CreateBoard(BoardLen,BoardWid),CreateBoard(BoardLen,BoardWid),CreateBoard(BoardLen,BoardWid),CreateBoard(BoardLen,BoardWid)];

/*
function WordPuzzleMaker(wl,bl){
    var templist = wl;
    var i;
    var j;
    var a;
    var boardlist = bl;
    var currentboard;
    var indexlist = [];
    currentboard = boardlist[1];

    for(i = 0;i<templist.length;i++){
        if(place(templist[i],currentboard)){
            boardlist[i+1] = currentboard;
            currentboard = boardlist[i+1];
        }
        else
        {
            for(a = 1;a<boardlist.length;a++){
                boardlist[a] = boardlist[0];
            }
            break;
        }
    }

}

function place(w,b){
    var board = b;
    var word = w;
    var a;
    

    if(board[5][5]==0){
        for(a = 0;a<word.length;a++){
            if(CheckAvl(5+a,5)== False){
                return false;
            }
            else{
                board[5+a][5] = word[a];
                board[5+a-1][5] = 2;
                board[5+a][5+1] = 1;
                board[5+a][5-1] = 1;
                WordPuzzleMaker.indexlist = WordPuzzleMaker.indexlist + [[5+a],5];
            }
        }

        return board;

    }





}

*/


/*function CheckAvl(i,j,c){

    if(board[i][j] == 0){
        return True;
    }
    else if(board[i][j] == 1){
        return False;
    }
    else{
        return False;
    }
}


function FindSpot(w,a,b){
    var char;
    var i;

    for(i = 0;i<w.length;i++){
        if(CheckAvl(a,b))






    }


}

function Place(){
    var item;
    var clist;
    var spx;
    var spy;

    item = GetWord(wordlist);
    clist = WordToChar(item);





}

function WordToChar(w){
    var i;
    var charlist;
    charlist = [];

    for(i = 0;w.length;i++){
        charlist = charlist + [w[i]];
    }

    return charlist;
}


function GetWord(a){
    var tempword = wordlist.slice(0,wordlist.length);
    var i;
    var ret;
    for(i=0;i<tempword.length;i++){
        if(a in tempword[i]){
            ret = tempword[i];
            tempword.splice(i,1);
            return ret;
        }
    }
    if(tempword == []){
        return;
    }
    else{
        ret = tempword[0]
        tempword.splice(0,1);
        return ret;
    }

}



*/

cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad () {},

    start () {

    },

    // update (dt) {},
});
