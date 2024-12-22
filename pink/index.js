var title_variant = 0;

// hex color to closest color code
const hex2name = (hex) => ntc.name(hex)[1];

// write color name to figure caption
const write_colorname = () => {
  document.getElementById("caption").innerHTML =
    "I'm <strong>" +
    hex2name(document.getElementById("color-input").value).toLowerCase() +
    "</strong>.";
};

const hide_color_picker = () => {
  document.getElementById("color-picker").hidden = true;
};

// color was entered, process it
const results = () => {
  hide_color_picker();
  write_colorname();
};

const rotate_title = () => {
  var variant = title_variant++ % 3;
  document.getElementById("title").innerHTML =
    variant === 0
      ? "Pick a Pink"
      : variant === 1
        ? "Top a Twink"
        : variant === 2
          ? "Stop and Think"
          : "lihuqergilhuqionbopimuthnbsuinl";
  const subtitle = document.getElementById("subtitle").innerHTML;
  subtitle.innerHTML = "";
  for (var i = 0; i < 9; i++)
    subtitle +=
      variant === 0
        ? "pink"
        : variant === 1
          ? "twink"
          : variant === 2
            ? "think"
            : "lihuqergilhuqionbopimuthnbsuinl";
};

window.onload = rotate_title; // initial title
