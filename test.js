var app = require("./index");
var exec = require("child_process").exec;
var fs = require('fs');

function assertPNG(buffer) {
  //                       ?     P   N   G   \r  \n  SUB \n
  var pngSignatureHeader = [137, 80, 78, 71, 13, 10, 26, 10];

  for (var i = 0; i < pngSignatureHeader.length; i++) {
    if (buffer[i] !== pngSignatureHeader[i]) {
      throw new Error('Buffer has malformed PNG signature')
    }
  }
}

function assertPNGfile(file) {
  if (!fs.existsSync(file)) {
    throw new Error('File ' + file + ' not found!');
  }

  assertPNG(fs.readFileSync(file));
}

console.log('saving google.com into google.png');
app.fromURL("https://google.com", "google.png", { clip: { x: 490, y: 180, width: 100, height: 100 }, scale: 1 }, function (err) {
  if (err) {
    throw err;
  }

  assertPNGfile('google.png');
  console.log('google.png looks ok');

  console.log('saving wikipedia.png with injected html headlessly')
  app.fromHTML('This has been modified by injecting the HTML', "wiki.png", {
    inject: {
      url: "https://en.wikipedia.org/wiki/Main_Page",
      selector: { className: "mw-wiki-logo" }
    },
    width: 500,
    height: 1000,
    show: false
  }, function () {
    if (err) {
      throw err;
    }
    assertPNGfile('wiki.png');
    console.log('wiki.png looks ok');


    console.log('checking that if provided path is null, it will output a buffer');
    app.fromHTML("<html><body>something something html</body></html>", null, {
      clip: {
        width: 100,
        height: 100
      }
    }, function (err, buff) {
      if (err) {
        throw err;
      }

      assertPNG(buff);
      console.log('PNG buffer looks ok');

      app.fromURL("https://bluecrate.com", "redirect.png",{waitMilliseconds: 5000}, function(err){
        if (err) {
          throw err;
        }

        assertPNGfile('redirect.png');
        console.log('redirect.png looks ok');
      });
    });
  });
});
