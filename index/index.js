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

const getFileModificationDate = (path, callback) => {
  getJSON(
    `https://api.github.com/repos/p6nj/fish.golf/commits?path=${path}&page=1&per_page=1`,
    function (err, data) {
      if (err === null) {
        callback(data[0].commit.committer.date);
      } else {
        console.error(err);
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

const getFileSize = (tree, path) => {
  let totalSize = 0;

  tree.forEach((item) => {
    if (item.path == path) {
      return (
        (item.size / 1024).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + " KB"
      );
    }
  });

  return "?";
};

const getTotalSize = (tree) => {
  let totalSize = 0;

  tree.forEach((item) => {
    if (item.size !== undefined) totalSize += item.size;
  });

  return (
    (totalSize / 1024).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + " KB"
  );
};

function add_listing(name, last_modified, size) {
  document.getElementById("last").outerHTML =
    '<tr><td valign="top"><img src="img/folder.gif" alt="[DIR]" /></td><td><a href="https://' +
    name +
    '.fish.golf">' +
    name +
    '/</a></td><td align="right">' +
    last_modified +
    '</td><td align="right">' +
    size +
    "</td></tr>" +
    document.getElementById("last").outerHTML;
}

function insert_listing(name, subdomain, last_modified, size) {
  document.getElementById("first").outerHTML +=
    '<tr><td valign="top"><img src="img/folder.gif" alt="[DIR]" /></td><td><a href="https://' +
    subdomain +
    '.fish.golf">' +
    name +
    '/</a></td><td align="right">' +
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
          if (subdomain !== "index" && !subdomains.includes(subdomain)) {
            subdomains.push(subdomain);
          }
        }
      });
      subdomains.forEach((item) => {
        getModificationDate(item, function (modif) {
          add_listing(item, modif, getSize(data.tree, item));
        });
      });
      getModificationDate("index", function (modif) {
        insert_listing(".", "index", modif, getSize(data.tree, "index"));
      });
      getFileModificationDate("index.html", (last_modified) => {
        document.getElementById("first").outerHTML +=
          '<tr class="first"><td valign="top"><img src="img/folder.gif" alt="[DIR]" /></td><td><a href="https://fish.golf">../</a></td><td align="right">' +
          last_modified +
          '</td><td align="right">' +
          getTotalSize(data.tree) +
          "</td></tr>";
      });
      getFileModificationDate(
        "index%2Fheav_memetic_image.png",
        (last_modified) => {
          document.getElementById("last").outerHTML +=
            '<tr class="first"><td valign="top"><img src="img/unknown.gif" alt="[FILE]" /></td><td><a href="heav_memetic_image.png">heav_memetic_image.png</a></td><td align="right">' +
            last_modified +
            '</td><td align="right">' +
            getFileSize(data.tree, "index/heav_memetic_image.png") +
            "</td></tr>" +
            document.getElementById("last").outerHTML;
        },
      );
    }
  },
);
