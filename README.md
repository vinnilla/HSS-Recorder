### Store XPath Recorder

##### To Install:
Drag repository folder onto the chrome extension page.

##### To Use:
1. Navigate to the page you would like to start at and wait for it to fully load. 
2. Click the extension icon (should be a red circle) to start the recorder. The recorder will note the starting url and the icon will turn green.
3. As you interact with the DOM elements, keep an eye on the recorder icon. If it runs into an error finding the XPath, the icon will turn into a pink hexagon. Try interacting with the same element again and if the icon turns back into a green circle, the XPath was successfully gotten.
4. When typing into a search field or user input field, press 'TAB' on completion to trigger the retrieval of the string. Please refrain from using the 'ENTER' key to submit forms and instead click on the appropriate button to submit.
5. When navigating to a different page on the site, the icon will turn orange to indicate that the script has yet to load. Wait for the icon to turn green before interacting with the site.
6. Once you navigate to the page where the Honey Extension pops up, click the extension icon one more time. It should turn red, signaling the end of the script.

##### Known issues:
* Some sites (like Macy's item page) tend to trigger errors due to the altering DOM elements. Keep an eye out for the pink hexagon.
* Some sites also trigger a load event before the path finder can finish executing (also Macy's item page...)