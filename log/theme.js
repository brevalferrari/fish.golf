document.getElementById("theme").onchange = (e) => {
  document.getElementsByTagName("andypf-json-viewer")[0].theme = e.target.value;
};
