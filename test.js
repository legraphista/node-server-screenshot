var app = require("./index");
var exec= require("child_process").exec;

app.fromURL("https://yahoo.com", "test.png", {}, function(){
    "use strict";

    exec("open ./test.png");
});

app.fromHTML('This has been modified by injecting the HTML', "test2.png", {inject: {url: "https://en.wikipedia.org/wiki/Main_Page", selector: {className: "mw-wiki-logo"}}},function(){
    "use strict";
    exec("open ./test2.png");
});

app.fromHTML("<html><body>iaurt</body></html>", "test3.png", function(){
    "use strict";
    exec("open ./test3.png");
});