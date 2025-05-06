var x, y, si; //x and y are co-ordinates to traslate the fly and si is reftence of interval of movefly

var highscore = 0, //highscore maintain the highscore of player
  counter = 0, //counter to count current score of player
  webWorker, // store the refrence of web worker i.e timer
  i = 0, //index to traverse through quote array i.e arr
  si2; //store refrence of quote interval
var flag = 0; //here flag is used to indicate that game is start or not

var arr = [
  "One swat at a time, you're the buzz-killer!",
  "Focus. Smash. Win. Repeat!",
  "They may fly, but they can’t hide!",
  "Push limits, break records.",
];

// collecting refrence of all elements

var score = document.getElementById("score");
var timer = document.getElementById("timer");

var flyImg = document.getElementById("flyImg");
flyImg.addEventListener("click", funCount);

var playImg = document.getElementById("playImg");
playImg.addEventListener("click", funStart);

var retryImg = document.getElementById("retryImg");
retryImg.addEventListener("click", funRetry);

var highscorebox = document.getElementById("highscore");

var quotes = document.getElementById("quotes");

var audio1 = document.getElementById("clickSound"); //audio1=click sound

var d1 = document.getElementById("d1");

var bigCursor=document.getElementById('big-cursor');

// sound manage
var sound = "on";
var mute_img = document.getElementById("muteImg");
var sound_img = document.getElementById("soundImg");
var slapSound = document.getElementById("slapSound");
funSound();

console.log(si);

//function to start the game

function funStart() {
  console.log(sound);
  if (sound == "on") {
    audio1.play();
  }

  if (webWorker) {
    webWorker.terminate();
    window.clearInterval(si);
    window.clearInterval(si2);
  }
  flag = 1;
  si = setInterval("movefly()", 1500); //interval to traslate the fly
  si2 = setInterval("chooseQuotes()", 3000); //interval to choose quote from an array

  webWorker = new Worker("second.js"); //Web Workder

  //event handler for message event
  webWorker.onmessage = function (event) {
    var str =
      '<h3 style="color: white; margin-top: 0px; margin-left: 20%;">TIMER</h3>' +
      '<h3 style="color: white; margin-top: 0px; margin-left: 42%; font-size:bold">00:' +
      event.data +
      "</h3>";
    timer.innerHTML = str;

    //if game ends
    if (event.data == 30) {
      webWorker.terminate();
      window.clearInterval(si);
      window.clearInterval(si2);
      highscore1();
      counter = 0;
      flag = 0;
    }
  };
}

//fucntion to restart the game
function funRetry() {
  if (sound == "on") {
    audio1.play();
  }
  webWorker.terminate();
  window.clearInterval(si);
  window.clearInterval(si2);

  var str =
    '<h3 style="color: white; margin-top: 0px; margin-left: 30%;">Score</h3>' +
    '<h3 style="color: white; margin-top: 0px; margin-left: 42%; font-size:bold">' +
    counter +
    "</h3>";
  score.innerHTML = str;
  highscore1();
  counter = 0;
  var str =
    '<h3 style="color: white; margin-top: 0px; margin-left: 30%;">Score</h3>' +
    '<h3 style="color: white; margin-top: 0px; margin-left: 42%; font-size:bold">' +
    counter +
    "</h3>";
  score.innerHTML = str;
  funStart();
}

//fuction to manage home button
function funHome() {
  if (sound == "on") {
    audio1.play();
  }

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

//function to count score of player
function funCount() {
  if (sound == "on" && flag == 1) {
    slapSound.play();
    slapSound.volume = 0.4;
  }
  if (flag == 1) {
    counter++;
    console.log("clicked");
    var str =
      '<h3 style="color: white; margin-top: 0px; margin-left: 30%;">Score</h3>' +
      '<h3 style="color: white; margin-top: 0px; margin-left: 42%; font-size:bold">' +
      counter +
      "</h3>";
    score.innerHTML = str;
  }

  flyImg.style.opacity = "0.5";
  setTimeout(() => {
    flyImg.style.opacity = "1";
  }, 200);
}

// function to generate Random numbers
function generateRandom() {
  x = Math.random() * d1.offsetHeight;
  y = Math.random() * d1.offsetWidth;
}

//function to traslate fly
function movefly() {
  generateRandom();
  if (x < d1.offsetHeight && y < d1.offsetWidth) {
    flyImg.style.transform = "translate(" + x + "px," + y + "px" + ")";
  } else {
    generateRandom();
  }
}

//function to calculate high score
function highscore1() {
  if (counter > highscore) {
    highscore = counter;
    console.log(highscore);
    var str =
      ' <h3 style="color: white; margin-top: 0px; font-size: 4vh; margin-left: 10%;">HIGH SCORE</h3>' +
      '<h3 style="color: white; margin-top: 2vh; margin-left: 42%; font-size:bold">' +
      highscore +
      "</h3>";
    highscorebox.innerHTML = str;
  }
}

//function to choose quote from an array
function chooseQuotes() {
  var str =
    ' <h3 style="color: white; margin-top: 0px; margin-left: 30%;">Quotes</h3>' +
    '<h3 style="color: white; margin-top: 0px; font-size:bold">' +
    arr[i] +
    "</h3>";
  quotes.innerHTML = str;
  i++;
  if (i == arr.length) {
    i = 0;
  }
}

// function to handle sound on off
function funSound() {
  if (sound == "on") {
    mute_img.style.display = "inline-block";
    sound_img.style.display = "none";

    sound = "off";
    audio1.pause();
  } else if (sound == "off") {
    mute_img.style.display = "none";
    sound_img.style.display = "inline-block";
    sound = "on";
    audio1.play();
  }
}

d1.addEventListener("mousemove",  (e)=> {
  const cursor = document.getElementById("big-cursor");
  cursor.style.display='inline';
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

