const pathFinder = function cssPath(el) {
  if (!(el instanceof Element)) {
    return
  }
  let path = [];
  while (el && el.nodeType == Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    // check for id
    if (el.id) {
      selector = `//*[@id="${el.id}"]`;
      path.unshift(selector)
      break
    }
    else {
      let sib = el,
          nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() == selector) {
          nth++;
        }
      }
      if (nth != 1) {
        selector += `[${nth}]`;
      }
      path.unshift(selector);
    }
    el = el.parentNode;
  }
  if (path[0].indexOf('//') != 0) {
    return '~~~~~~\nFAILED\n~~~~~';
  } else {
    return path.join("/");
  }
}

const clickEvent = function clicked(e) {
  const target = e.target;
  const path = pathFinder(target);
  console.info(path);
  chrome.runtime.sendMessage(path);
}

const changeEvent = function changed(e) {
  const index = e.target.selectedIndex;
  if (e.target.options) {
    const target = e.target.options[index];
    const path = pathFinder(target);
    console.info(path);
    chrome.runtime.sendMessage(path);
  }
}

const keydownEvent = function keydowned(e) {
  if (e.key == 'Tab') {
    console.info(e.srcElement.value);
    chrome.runtime.sendMessage(e.srcElement.value);
  }
}

chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg === 'START') {
    console.info('script running...');
    document.body.addEventListener('click', (e)=> clickEvent(e));
    document.body.addEventListener('change', (e)=> changeEvent(e));
    document.body.addEventListener('keydown', (e)=> keydownEvent(e));
  }
  else if (msg === 'STOP') {
    console.info('script stopping...');
    // remove event listeners by replacing body with clone
    const bodyClone = document.body.cloneNode(true);
    document.body.parentNode.replaceChild(bodyClone, document.body);
  }
})