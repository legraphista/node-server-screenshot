# node-server-screenshot
A server-side NodeJS component that takes screenshots of:
* Webpage at a `URL` location
* Pure `HTML`
* `HTML` injected into a webpage at a `URL`

## API:

**fromURL(url, destinationFile, options, callback)**

This will navigate to the url, take a screenshot and save it to the destination file
* Url: `String` with the URL
* DestinationFile: `String` with the location of the image file that will be saved.
If null is provided then the callback will return as 2nd parameter a PNG buffer.
* Options: `Object[={}]` with options
    * width: `Number[=1280]` to set the width of the viewport
    * height: `Number[=720]` to set the height of the viewport
    * waitAfterSelector: `String[="html"]` to set the selector that will be awaited for completion before taking the screenshot
    * waitMilliseconds: `Number[=1000]` to set the waiting time after the selector is ready before taking the screenshot
    * clip: `Object[={}]` crops the image
        * x: `Number`
        * y: `Number`
        * width: `Number`
        * height: `Number`
    * scale: `Number[=1]` to set the scaling of the browser.
* Callback: `Function` with an optional error argument, and an optional PNG buffer argument.

#### Example:
```javascript
var app = require("node-server-screenshot");
app.fromURL("https://google.com", "test.png", function(){
    //an image of google.com has been saved at ./test.png
});
```

___

**fromHTML(html, destinationFile, options, callback)**

This will navigate to the url, take a screenshot and save it to the destination file
* Url: `String` with the URL
* DestinationFile: `String` with the location of the image file that will be saved.
If null is provided then the callback will return as 2nd parameter a PNG buffer.
* Options: `Object[={}]` with options
    * width: `Number[=1280]` to set the width of the viewport
    * height: `Number[=720]` to set the height of the viewport
    * waitAfterSelector: `String[="html"]` to set the selector that will be awaited for completion before taking the screenshot
    * waitMilliseconds: `Number[=1000]` to set the waiting time after the selector is ready before taking the screenshot
    * clip: `Object[={}]` crops the image
        * x: `Number`
        * y: `Number`
        * width: `Number`
        * height: `Number`
    * inject: `Object[={}]`
        * url: `String[="about:blank"]` the url that the html will be injected in
        * selector `String[="html"]`: selecting the nodes where the HTML will be injected
            * `String`
            * `{tag: String}`
            * `{id: String}`
            * `{className: String}`
            * `{jQuery: String}` - Note! JQuery must be embedded in the page already
* Callback: `Function` with an optional error argument, and an optional PNG buffer argument.

#### Example:
```javascript
var app = require("node-server-screenshot");
app.fromHTML(
    'This has been modified by injecting the HTML',
    "test.png",
    {inject: {
        url: "https://en.wikipedia.org/wiki/Main_Page",
        selector: {className: "mw-wiki-logo"}
    }},
    function(){
        //an image of the HTML has been saved at ./test.png
    }
);
```
```javascript
var app = require("node-server-screenshot");
app.fromHTML("<html><body>Hello world!</body></html>", "test.png", function(){
    //an image of the HTML has been saved at ./test.png
});
```
