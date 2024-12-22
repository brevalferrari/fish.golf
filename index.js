// https://blog.dotenx.com/set-the-theme-of-a-website-based-on-the-time-of-the-day-no-external-library
// Get the current time
var date = new Date();
var hour = date.getHours();

// Apply the light or dark stylesheet based on the time of day
if (hour > 6 && hour < 18) {
  // If the time is between 6am and 6pm, use the light theme
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "day.css");
  document.head.appendChild(link);
} else {
  // Otherwise, use the dark theme
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "night.css");
  document.head.appendChild(link);
}
