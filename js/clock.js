$(document).ready(function () {
    $("#startstop").find('i').addClass('fa fa-play'); //display play icon
    $("#sound").find('i').addClass('fa fa-volume-up'); //display sound icon

    // display changes base on slider
    range.oninput = () => {
        startstop.value = "Start";

        //add "0" if range display is < 10
        timer.innerHTML = (range.value < 10) ? `0${range.value}:00` : `${range.value}:00`;

        if (id !== "") {
            window.clearInterval(id); //stop the timer
        }

        // During drag, remove pause icon and replace with play
        if (startstop.value === "Start") {
            $("#startstop").find('i').removeClass('fa fa-pause');
            $("#startstop").find('i').addClass('fa fa-play');
        }
    };
});

let isCounting = Boolean(false); //When the start button is click this becomes true
let started = Boolean(false); //if the clock has started, stopped, started...etc
let breakLength = 5;
let focusLength = 25;

let range = document.getElementById("myRange");
let timer = document.getElementById("timer");
let startstop = document.getElementById("startstop"); //start and stop counter
let sound = document.getElementById("sound"); //sound icon button

let soundPlayer = new Audio("media/tick.wav");

let skip = document.getElementById("skip"); //Skip button event handler
let goals = document.getElementById("goals");
let focusCounter = 0;
let breakCounter = 0;
let sessionCounter = 0;
let goalCounter = 12;

const rgbRed = "rgb(255, 64, 63)";
const rgbBluePurp = "rgb(106, 130, 238)";
const hexRed = '#FF403F';
const hexBluePurp = '#6A82EE';

let id;  //id of setInterval

goals.innerHTML= `${sessionCounter}/${goalCounter}`;

//set default timer to display
timer.innerHTML = `${range.value}:00`;

startstop.addEventListener("click", function () {
    $(this).find('i').toggleClass('fa-play fa-pause');
    startstop.value = startCountDown(startstop.value);
});

startCountDown = (str) => {
    let state; //state of the button

    if (str === "Start") {
        state = "Stop";
        isCounting = true;
    }
    else {
        state = "Start";
        isCounting = false;
    }

    countDown(timer.innerHTML, isCounting);
    return state;
}

function countDown(str, counting) {
    //get the min and sec from str
    let min = parseInt(str.substr(0, str.indexOf(":")));
    let sec = parseInt(str.substr(str.indexOf(":") + 1, str.length - 1));

    handler();
    id = window.setInterval(handler, 1000);

    function handler() {
        if (counting === false) {
            window.clearInterval(id);
        }
        else {
            timer.innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

            //if time reach "0"
            if (timer.innerHTML === "00:00") {
                window.clearInterval(id);
            }

            if (sec === 0) {
                sec = 59;
                range.value = min; //move the slider automatical during countdown
                min--;
            }
            else {
                sec--;                
                started = true;
            }
            soundPlayer.play(); //play sound on every tick           
        }
    }
}

skip.addEventListener("click", function(e){
    if($('#content > *').css('background-color') == rgbRed){ 
        $('#content > *').css('background-color', hexBluePurp);
        range.value = breakLength; 
             
    }
    else if($('#content > *').css('background-color') == rgbBluePurp){ 
        $('#content > *').css('background-color', hexRed);
        range.value = focusLength;
    }

    timer.innerHTML = (range.value < 10) ? `0${range.value}:00` : `${range.value}:00`;
    window.clearInterval(id);
    // e.preventDefault();
    // startstop.click();    
});

sound.addEventListener("click", function(){

    if(soundPlayer.volume){
        soundPlayer.volume = false;
        $("#sound").find('i').removeClass('fa fa-volume-up');
        $("#sound").find('i').addClass('fa fa-volume-off');
    }
    else{
        soundPlayer.volume = true;
        $("#sound").find('i').removeClass('fa fa-volume-off');
        $("#sound").find('i').addClass('fa fa-volume-up');
    }
});


