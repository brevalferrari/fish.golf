const getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

const getModificationDate = (subdomain, callback) => {
  getJSON(
    `https://api.github.com/repos/p6nj/fish.golf/commits?path=${subdomain}%2Findex.html&page=1&per_page=1`,
    function (err, data) {
      if (err === null) {
        callback(data[0].commit.committer.date);
      }
    },
  );
};

const getSize = (tree, subdomain) => {
  let totalSize = 0;

  tree.forEach((item) => {
    if (item.path.startsWith(subdomain + "/") && item.type === "blob") {
      totalSize += item.size;
    }
  });

  return (
    (totalSize / 1024).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + " KB"
  );
};

function add_listing(name, last_modified, size) {
  document.getElementsByTagName("tbody")[0].innerHTML +=
    '<tr><td valign="top"><img src="index_files/folder.gif" alt="[DIR]" /></td><td><a href="https://' +
    name +
    '.fish.golf">' +
    name +
    '</a></td><td align="right">' +
    last_modified +
    '</td><td align="right">' +
    size +
    "</td></tr>";
}

getJSON(
  "https://api.github.com/repos/p6nj/fish.golf/git/trees/main?recursive=1",
  function (err, data) {
    if (err === null) {
      let subdomains = [];
      data.tree.forEach((item) => {
        if (item.type === "tree") {
          let subdomain = item.path.split("/")[0];
          if (!subdomains.includes(subdomain)) {
            subdomains.push(subdomain);
          }
        }
      });
      subdomains.forEach((item) => {
        getModificationDate(item, function (modif) {
          add_listing(item, modif, getSize(data.tree, item));
        });
      });
    }
    document.getElementsByTagName("tbody")[0].innerHTML +=
      '<tr><th colspan="4"><hr /></th></tr>';
  },
);
