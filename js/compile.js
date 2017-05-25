class Compile {
  constructor (el, vm) {
    this.vm = vm
    this.el = document.querySelector(el)
    this.fragment = null
    this.init()
  }
  init () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    }
  }
  nodeToFragment (el) {
    let fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }
  compileElement (el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (self.isElementNode(node)) {
        console.log(node)
          // self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) {
          console.log(node)
          self.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
          self.compileElement(node);
      }
    });

  }
  compileText (node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        // new Watcher(this.vm, exp, function (value) {
        //     self.updateText(node, value);
        // });
    }
  updateText (node, value) {
      node.textContent = typeof value == 'undefined' ? '' : value;
  }
  isElementNode (node) {
    return node.nodeType == 1
  }
  isTextNode (node) {
    return node.nodeType == 3
  }
}
