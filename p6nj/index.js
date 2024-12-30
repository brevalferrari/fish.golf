const reveal_secrets = () => {
  var nodeIterator,
    node,
    i = 0;
  nodeIterator = document.createNodeIterator(
    document.getElementById("layout"),
    NodeFilter.SHOW_ELEMENT,
    function (node) {
      var nodeName = node.nodeName.toLowerCase();
      if (
        nodeName === "script" ||
        nodeName === "style" ||
        nodeName === "noscript"
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.offsetParent === void 0) {
        return NodeFilter.FILTER_ACCEPT;
      }
      var computedStyle = window.getComputedStyle(node, null);
      if (
        computedStyle.getPropertyValue("visibility") === "hidden" ||
        computedStyle.getPropertyValue("display") === "none"
      ) {
        return NodeFilter.FILTER_ACCEPT;
      }
    },
  );
  while ((node = nodeIterator.nextNode()) && ++i) {
    if (node.parentNode instanceof HTMLElement) {
      node.hidden = false;
    }
  }
};
