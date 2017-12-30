var Module = Module || {};

self.window = self;
self.onReady = function() {
  if (self.ready_) {
    self.ready();
  } else {
    self.ready_ = true;
  }
};

var screen = {
    width: 0,
    height: 0
};

Module["preRun"] = Module["preRun"] || [];

Module['onRuntimeInitialized'] = function () {
  self.init = Module['cwrap']('libassjs_init', 'number', ['number', 'number', 'string']);
  self._resize = Module['cwrap']('libassjs_resize', null, ['number', 'number']);
  self._free_track = Module['cwrap']('libassjs_free_track', null, null);
  self._create_track = Module['cwrap']('libassjs_create_track', null, ['string']);
  self._render = Module['cwrap']('libassjs_render', null, ['number', 'number']);
  self.quit = Module['cwrap']('libassjs_quit', null, []);
  self.changed = Module._malloc(4);

  self.onReady();
};

Module["print"] = function (text) {
  if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
  console.log(text);
};
Module["printErr"] = function (text) {
  if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
  console.error(text);
};

// Modified from https://github.com/kripken/emscripten/blob/6dc4ac5f9e4d8484e273e4dcc554f809738cedd6/src/proxyWorker.js
if (typeof console === 'undefined') {
  // we can't call Module.printErr because that might be circular
  var console = {
    log: function (x) {
      if (typeof dump === 'function') dump('log: ' + x + '\n');
    },
    debug: function (x) {
      if (typeof dump === 'function') dump('debug: ' + x + '\n');
    },
    info: function (x) {
      if (typeof dump === 'function') dump('info: ' + x + '\n');
    },
    warn: function (x) {
      if (typeof dump === 'function') dump('warn: ' + x + '\n');
    },
    error: function (x) {
      if (typeof dump === 'function') dump('error: ' + x + '\n');
    },
  };
}

// performance.now() polyfill
if ("performance" in window === false) {
  window.performance = {};
}
Date.now = (Date.now || function () {
  return new Date().getTime();
});
if ("now" in window.performance === false) {
  var nowOffset = Date.now();
  if (performance.timing && performance.timing.navigationStart) {
    nowOffset = performance.timing.navigationStart
  }
  window.performance.now = function now() {
    return Date.now() - nowOffset;
  }
}