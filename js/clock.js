let slider = document.getElementById("myRange");
let timer = document.getElementById("timer");
timer.innerHTML = `${slider.value}:00`;

//slider.oninput = () => timer.innerHTML = moment(slider.value, 'mm').format('mm:ss');

slider.oninput = () => timer.innerHTML = `${slider.value}:00`;