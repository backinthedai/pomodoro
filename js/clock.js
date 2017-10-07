let isOn = Boolean(true); //is Icon is true

let slider = document.getElementById("myRange");
let timer = document.getElementById("timer");
let startstop = document.getElementById("startstop");

//set default timer to display
timer.innerHTML = `${slider.value}:00`;

// display changes base on slider
slider.oninput = () => timer.innerHTML = `${slider.value}:00`;



startstop.addEventListener("click", function () {

    startstop.innerHTML = toggleIcon(startstop.innerHTML);

});


function toggleIcon(str) {
    if (str === "Start") {
        countDown(timer.innerHTML, startstop.innerHTML);
        return "Stop";
    }
    else {
        countDown(timer.innerHTML, startstop.innerHTML);
        return "Start";
    }
}


function countDown(str, state) {

    let min = parseInt(str.substr(0, str.indexOf(":")));
    let sec = 59;
    min--;

    handler();
    var id = window.setInterval(handler, 1000);

    function handler() {
            timer.innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

            if (timer.innerHTML === "00:00" || state === "Stop") {
                window.clearInterval(id);
            }

            if (sec === 0) {
                sec = 59;
                min--;
            }
            else {
                sec--;
            }

    };

   


}
