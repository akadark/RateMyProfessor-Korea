    //Self-executing
    (function(){
       //All my code is local
       var notGlobal = true;
       console.log(notGlobal);
    }());
    
    //Length inside and out
    function funcSeven(param1,param2,param3){
        console.log(arguments);
    }
    console.log(funcSeven.length);
    funcSeven("one");
    
    //optional arguments
    function funcEight(param1,param2){
        if(param1 === undefined){
            return;
        }
        if(param2 !== undefined){
            console.log('got param 2');
            if(typeof param2 === 'function'){
                param2();
            }else{
                console.log("do something else");
            }
        }else{
            console.log("did not get param2");
        }
    }
    funcEight('one');
    funcEight('two',function(){
        console.log("param 2 and i am a function");
    });