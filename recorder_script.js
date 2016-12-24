let storage = []

const pathFinder = function cssPath(el) {
	if (!(el instanceof Element)) {
		return
	}
	let path = [];
	while (el.nodeType == Node.ELEMENT_NODE) {
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
	return path.join("/");
}

const clickEvent = function clicked(e) {
	const target = e.target
	const path = pathFinder(target);
	storage.push(path)
}

const changeEvent = function changed(e) {
	const index = e.target.selectedIndex
	const target = e.target.options[index]
	const path = pathFinder(target);
	storage.push(path)
}

const keydownEvent = function keydowned(e) {
	if (e.key == 'Enter') {
		storage.push(e.srcElement.value)
	}
}

const getURL = function url() {

	let queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function(tabs) {
		const tab = tabs[0];
		return tab.url;
	});

}

// add event listeners on start click
document.querySelector('HSM START BUTTON').addEventListener('click', function() {
	// REPLACE START WITH STOP BUTTON

	// GET THE URL
	const url = getURL();

	document.querySelector('body').addEventListener('click', (e)=> clickEvent(e));
	document.querySelector('body').addEventListener('change', (e)=> changeEvent(e));
	document.querySelector('body').addEventListener('keydown', (e)=> keydownEvent(e));
})

// remove event listener on stop
document.querySelector('HSM STOP BUTTON').addEventListener('click', function() {
	// REPLACE STOP WITH START BUTTON

	// clone body and replace it (effectively removing all event listeners attached to body)
	const body = document.querySelector('body'),
    		bodyClone = body.cloneNode(true);
	body.parentNode.replaceChild(bodyClone, body);

	// push into meta data or send directly to a backend route specifically for script generation
	
})