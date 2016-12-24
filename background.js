let active = false,
    properTabId = 0,
    storage = [];

function enableBrowserAction(tab) {
  // change icon
  chrome.browserAction.setIcon({path:'active.png'});
  // listen for content script sending data
  chrome.runtime.onMessage.addListener(addToStorage)
  // get url and place as first index in storage array
  storage.unshift(tab.url);
  console.log('started');
  // tell content script to run
  chrome.tabs.sendMessage(tab.id, 'START')
}

function disableBrowserAction(tab) {
  // change icon
  chrome.browserAction.setIcon({path:'inactive.png'});
  // stop listening for data
  chrome.runtime.onMessage.removeListener(addToStorage)
  // tell content script to stop
  chrome.tabs.sendMessage(tab.id, 'STOP')
  // upload storage
  console.log('uploading data...');
  console.log(storage);

  // clear storage
  console.log('clearing storage...');
  storage = [];
  console.log(storage);
}

function updateState(tab) {
  if (active == false) {
    active = true;
    properTabId = tab.id;
    enableBrowserAction(tab);
  } else {
    active = false;
    disableBrowserAction(tab);
  }
}

function addToStorage(msg, sender) {
  if (msg != '~~~~~~\nFAILED\n~~~~~') {
    chrome.browserAction.setIcon({path:'active.png'});
    storage.push(msg);
    console.log(storage);
  } else {
    chrome.browserAction.setIcon({path:'error.png'});
  }
}

// when extension icon is clicked
chrome.browserAction.onClicked.addListener(updateState);

// when active tab page changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // change icon to transition state
  if (active == true && changeInfo.status == 'loading') {
    chrome.browserAction.setIcon({path:'transition.png'});
  }
  if (active == true && changeInfo.status == 'complete' && tabId == properTabId) {
    // change icon to ready state
    chrome.browserAction.setIcon({path:'active.png'});
    // tell content script to run on new page
    chrome.tabs.sendMessage(tab.id, 'START');
  }
})

// when active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  if (active == true && activeInfo.tabId != properTabId) {
    // change icon to transition state
    chrome.browserAction.setIcon({path:'transition.png'});
  } 
  else if (active == true && activeInfo.tabId == properTabId) {
    // change icon to ready state
    chrome.browserAction.setIcon({path:'active.png'});
  }
})