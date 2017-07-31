var Module = Module || {};

var self = {};

var screen = {
    width: 0,
    height: 0
};

Module["preRun"] = Module["preRun"] || [];

Module['onRuntimeInitialized'] = function () {
    if (self.ready_) {
        self.ready();
    } else {
        self.ready_ = true;
    }
};

Module["print"] = function (text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    console.log(text);
};
Module["printErr"] = function (text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    console.error(text);
};