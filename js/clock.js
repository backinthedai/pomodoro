$(document).ready(function () {
    $("#startstop").find('i').addClass('fa fa-play');

    // display changes base on slider
    range.oninput = () => {
        startstop.value = "Start";
        timer.innerHTML = `${range.value}:00`;
        if (id !== "") {
            window.clearInterval(id); //stop the timer
        }

        if (startstop.value === "Start") {
            $("#startstop").find('i').removeClass('fa fa-pause');
            $("#startstop").find('i').addClass('fa fa-play');
        }
    };
});


let isCounting = Boolean(false); //When the start button is click this becomes true
let started = Boolean(false); //if the clock has started, stopped, started...etc

let range = document.getElementById("myRange");
let timer = document.getElementById("timer");
let startstop = document.getElementById("startstop");

let id;  //id of setInterval

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

            if (timer.innerHTML === "00:00") {
                window.clearInterval(id);
            }

            if (sec === 0) {
                sec = 59;
                min--;
            }
            else {
                sec--;
                started = true;
            }
        }
    }
}

