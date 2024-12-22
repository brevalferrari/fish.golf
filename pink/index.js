var title_variant = 0;

// hex color to closest color code
const hex2name = (hex) => ntc.name(hex)[1];

// write color name to figure caption
const write_colorname = (name) => {
  document.getElementById("caption").innerHTML =
    "I'm <strong>" + name + "</strong>.";
};

const color_picker_visible = (bool) => {
  document.getElementById("color-picker").hidden = !bool;
};

const change_image = (link) => {
  document.getElementById("pic").src = link;
};

const apply_gradient = (hex) => {
  const pic = document.getElementById("pic").style;
  pic.background = `
radial-gradient(
  closest-corner at 20% 50%,
  ${hex},
  ${hex},
  ${hex},
  transparent,
  transparent,
  transparent,
  transparent
) no-repeat`;
  pic.backgroundPosition = "left";
  pic.backgroundSize = "80% 130%";
};

// color was entered, process it
const results = () => {
  color_picker_visible(false);
  const hex_color = document.getElementById("color-input").value;
  const color_name = hex2name(hex_color).toLowerCase();
  apply_gradient(hex_color);
  write_colorname(color_name);
  change_image("https://fish.golf/pink/img/full-draw.png");
};

const reset_background = () => {
  const pic = document.getElementById("pic").style;
  pic.background = "none";
};

const reset_caption = () => {
  document.getElementById("caption").innerHTML = "";
};

const reset = () => {
  reset_background();
  color_picker_visible(true);
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
