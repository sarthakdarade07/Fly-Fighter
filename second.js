var counter=0;

function startcounter(){
    counter++;
    postMessage(counter);
}

function settimer(){
    setInterval("startcounter()",1000);
}

settimer();