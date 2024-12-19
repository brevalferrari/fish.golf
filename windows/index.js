let timerTime = 0;
let interval;

const start = () => {
  isRunning = true;
  interval = setInterval(incrementTimer, 1000);
};

const stop = () => {
  isRunning = false;
  clearInterval(interval);
  timerTime = 0;
};

const pad = (number) => {
  return number < 10 ? "0" + number : number;
};

const incrementTimer = () => {
  timerTime++;
  if (timerTime > 4) {
    stop();
    document.getElementsByTagName("body")[0].classList.add("explode");
    document.getElementById("window").hidden = true;
    document.getElementById("title").hidden = true;
    document.getElementById("myTable").hidden = true;
    setTimeout(() => {
      document.getElementById("center").classList.remove("invisible");
      document.getElementById("center").classList.add("visible");
    }, 2000);
  }
};

function update_speed() {
  if (
    Number(document.getElementById("range23").value) >=
    Number(document.getElementById("range23").max)
  ) {
    start();
  } else {
    stop();
  }
  document.getElementById("bar").style["animation-duration"] =
    (9 / Number(document.getElementById("range23").value)).toString() + "s";
}

function add_entry(command) {
  document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0].innerHTML +=
    "<tr><td>" +
    command +
    "</td><td>" +
    makeid(Math.floor(Math.random() * 18)) +
    "</td><td>" +
    new Date().getTime().toExponential() +
    "</td></tr>";
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
