const createDomNode = (node, element, ...classes) => (
  (node = document.createElement(element)),
  classes && node.classList.add(...classes),
  node
);
