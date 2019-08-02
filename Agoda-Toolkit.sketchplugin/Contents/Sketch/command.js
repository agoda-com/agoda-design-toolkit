var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/fs/index.js":
/*!****************************************!*\
  !*** ./node_modules/@skpm/fs/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: async. Should probably be done with NSFileHandle and some notifications
// TODO: file descriptor. Needs to be done with NSFileHandle
var Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer;
var utils = __webpack_require__(/*! ./utils */ "./node_modules/@skpm/fs/utils.js");
var parseStat = utils.parseStat;
var fsError = utils.fsError;
var fsErrorForPath = utils.fsErrorForPath;
var encodingFromOptions = utils.encodingFromOptions;
var NOT_IMPLEMENTED = utils.NOT_IMPLEMENTED;

module.exports.constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1
};

module.exports.access = NOT_IMPLEMENTED("access");

module.exports.accessSync = function(path, mode) {
  mode = mode | 0;
  var fileManager = NSFileManager.defaultManager();

  switch (mode) {
    case 0:
      canAccess = module.exports.existsSync(path);
      break;
    case 1:
      canAccess = Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
    case 2:
      canAccess = Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 3:
      canAccess =
        Boolean(Number(fileManager.isExecutableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 4:
      canAccess = Boolean(Number(fileManager.isReadableFileAtPath(path)));
      break;
    case 5:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
    case 6:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 7:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path))) &&
        Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
  }

  if (!canAccess) {
    throw new Error("Can't access " + String(path));
  }
};

module.exports.appendFile = NOT_IMPLEMENTED("appendFile");

module.exports.appendFileSync = function(file, data, options) {
  if (!module.exports.existsSync(file)) {
    return module.exports.writeFileSync(file, data, options);
  }

  var handle = NSFileHandle.fileHandleForWritingAtPath(file);
  handle.seekToEndOfFile();

  var encoding = encodingFromOptions(options, "utf8");

  var nsdata = Buffer.from(
    data,
    encoding === "NSData" || encoding === "buffer" ? undefined : encoding
  ).toNSData();

  handle.writeData(nsdata);
};

module.exports.chmod = NOT_IMPLEMENTED("chmod");

module.exports.chmodSync = function(path, mode) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.setAttributes_ofItemAtPath_error(
    {
      NSFilePosixPermissions: mode
    },
    path,
    err
  );

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }
};

module.exports.chown = NOT_IMPLEMENTED("chown");
module.exports.chownSync = NOT_IMPLEMENTED("chownSync");

module.exports.close = NOT_IMPLEMENTED("close");
module.exports.closeSync = NOT_IMPLEMENTED("closeSync");

module.exports.copyFile = NOT_IMPLEMENTED("copyFile");

module.exports.copyFileSync = function(path, dest, flags) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.copyItemAtPath_toPath_error(path, dest, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, false, err.value());
  }
};

module.exports.createReadStream = NOT_IMPLEMENTED("createReadStream");
module.exports.createWriteStream = NOT_IMPLEMENTED("createWriteStream");

module.exports.exists = NOT_IMPLEMENTED("exists");

module.exports.existsSync = function(path) {
  var fileManager = NSFileManager.defaultManager();
  return Boolean(Number(fileManager.fileExistsAtPath(path)));
};

module.exports.fchmod = NOT_IMPLEMENTED("fchmod");
module.exports.fchmodSync = NOT_IMPLEMENTED("fchmodSync");
module.exports.fchown = NOT_IMPLEMENTED("fchown");
module.exports.fchownSync = NOT_IMPLEMENTED("fchownSync");
module.exports.fdatasync = NOT_IMPLEMENTED("fdatasync");
module.exports.fdatasyncSync = NOT_IMPLEMENTED("fdatasyncSync");
module.exports.fstat = NOT_IMPLEMENTED("fstat");
module.exports.fstatSync = NOT_IMPLEMENTED("fstatSync");
module.exports.fsync = NOT_IMPLEMENTED("fsync");
module.exports.fsyncSync = NOT_IMPLEMENTED("fsyncSync");
module.exports.ftruncate = NOT_IMPLEMENTED("ftruncate");
module.exports.ftruncateSync = NOT_IMPLEMENTED("ftruncateSync");
module.exports.futimes = NOT_IMPLEMENTED("futimes");
module.exports.futimesSync = NOT_IMPLEMENTED("futimesSync");

module.exports.lchmod = NOT_IMPLEMENTED("lchmod");
module.exports.lchmodSync = NOT_IMPLEMENTED("lchmodSync");
module.exports.lchown = NOT_IMPLEMENTED("lchown");
module.exports.lchownSync = NOT_IMPLEMENTED("lchownSync");

module.exports.link = NOT_IMPLEMENTED("link");

module.exports.linkSync = function(existingPath, newPath) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.linkItemAtPath_toPath_error(existingPath, newPath, err);

  if (err.value() !== null) {
    throw fsErrorForPath(existingPath, undefined, err.value());
  }
};

module.exports.lstat = NOT_IMPLEMENTED("lstat");

module.exports.lstatSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.attributesOfItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }

  return parseStat(result);
};

module.exports.mkdir = NOT_IMPLEMENTED("mkdir");

module.exports.mkdirSync = function(path, options) {
  var mode = 0o777;
  var recursive = false;
  if (options && options.mode) {
    mode = options.mode;
  }
  if (options && options.recursive) {
    recursive = options.recursive;
  }
  if (typeof options === "number") {
    mode = options;
  }
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
    path,
    recursive,
    {
      NSFilePosixPermissions: mode
    },
    err
  );

  if (err.value() !== null) {
    throw new Error(err.value());
  }
};

module.exports.mkdtemp = NOT_IMPLEMENTED("mkdtemp");

module.exports.mkdtempSync = function(path) {
  function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  var tempPath = path + makeid();
  module.exports.mkdirSync(tempPath);
  return tempPath;
};

module.exports.open = NOT_IMPLEMENTED("open");
module.exports.openSync = NOT_IMPLEMENTED("openSync");

module.exports.read = NOT_IMPLEMENTED("read");

module.exports.readdir = NOT_IMPLEMENTED("readdir");

module.exports.readdirSync = function(path, options) {
  var encoding = encodingFromOptions(options, "utf8");
  var fileManager = NSFileManager.defaultManager();
  var paths = fileManager.subpathsAtPath(path);
  var arr = [];
  for (var i = 0; i < paths.length; i++) {
    var pathName = paths[i];
    arr.push(encoding === "buffer" ? Buffer.from(pathName) : String(pathName));
  }
  return arr;
};

module.exports.readFile = NOT_IMPLEMENTED("readFile");

module.exports.readFileSync = function(path, options) {
  var encoding = encodingFromOptions(options, "buffer");
  var fileManager = NSFileManager.defaultManager();
  var data = fileManager.contentsAtPath(path);
  if (!data) {
    throw fsErrorForPath(path, false);
  }

  var buffer = Buffer.from(data);

  if (encoding === "buffer") {
    return buffer;
  } else if (encoding === "NSData") {
    return buffer.toNSData();
  } else {
    return buffer.toString(encoding);
  }
};

module.exports.readlink = NOT_IMPLEMENTED("readlink");

module.exports.readlinkSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.destinationOfSymbolicLinkAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }

  return String(result);
};

module.exports.readSync = NOT_IMPLEMENTED("readSync");

module.exports.realpath = NOT_IMPLEMENTED("realpath");
module.exports.realpath.native = NOT_IMPLEMENTED("realpath.native");

module.exports.realpathSync = function(path) {
  return String(NSString.stringWithString(path).stringByResolvingSymlinksInPath());
};

module.exports.realpathSync.native = NOT_IMPLEMENTED("realpathSync.native");

module.exports.rename = NOT_IMPLEMENTED("rename");

module.exports.renameSync = function(oldPath, newPath) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.moveItemAtPath_toPath_error(oldPath, newPath, err);

  var error = err.value();

  if (error !== null) {
    // if there is already a file, we need to overwrite it
    if (
      String(error.domain()) === "NSCocoaErrorDomain" &&
      Number(error.code()) === 516
    ) {
      var err2 = MOPointer.alloc().init();
      fileManager.replaceItemAtURL_withItemAtURL_backupItemName_options_resultingItemURL_error(
        NSURL.fileURLWithPath(newPath),
        NSURL.fileURLWithPath(oldPath),
        null,
        NSFileManagerItemReplacementUsingNewMetadataOnly,
        null,
        err2
      );
      if (err2.value() !== null) {
        throw fsErrorForPath(oldPath, undefined, err2.value());
      }
    } else {
      throw fsErrorForPath(oldPath, undefined, error);
    }
  }
};

module.exports.rmdir = NOT_IMPLEMENTED("rmdir");

module.exports.rmdirSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var isDirectory = module.exports.lstatSync(path).isDirectory();
  if (!isDirectory) {
    throw fsError("ENOTDIR", {
      path: path,
      syscall: "rmdir"
    });
  }
  fileManager.removeItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, true, err.value(), "rmdir");
  }
};

module.exports.stat = NOT_IMPLEMENTED("stat");

// the only difference with lstat is that we resolve symlinks
//
// > lstat() is identical to stat(), except that if pathname is a symbolic
// > link, then it returns information about the link itself, not the file
// > that it refers to.
// http://man7.org/linux/man-pages/man2/lstat.2.html
module.exports.statSync = function(path) {
  return module.exports.lstatSync(module.exports.realpathSync(path));
};

module.exports.symlink = NOT_IMPLEMENTED("symlink");

module.exports.symlinkSync = function(target, path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.createSymbolicLinkAtPath_withDestinationPath_error(
    path,
    target,
    err
  );

  if (err.value() !== null) {
    throw new Error(err.value());
  }
};

module.exports.truncate = NOT_IMPLEMENTED("truncate");

module.exports.truncateSync = function(path, len) {
  var hFile = NSFileHandle.fileHandleForUpdatingAtPath(sFilePath);
  hFile.truncateFileAtOffset(len || 0);
  hFile.closeFile();
};

module.exports.unlink = NOT_IMPLEMENTED("unlink");

module.exports.unlinkSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var isDirectory = module.exports.lstatSync(path).isDirectory();
  if (isDirectory) {
    throw fsError("EPERM", {
      path: path,
      syscall: "unlink"
    });
  }
  var result = fileManager.removeItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, false, err.value());
  }
};

module.exports.unwatchFile = NOT_IMPLEMENTED("unwatchFile");

module.exports.utimes = NOT_IMPLEMENTED("utimes");

module.exports.utimesSync = function(path, aTime, mTime) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.setAttributes_ofItemAtPath_error(
    {
      NSFileModificationDate: aTime
    },
    path,
    err
  );

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }
};

module.exports.watch = NOT_IMPLEMENTED("watch");
module.exports.watchFile = NOT_IMPLEMENTED("watchFile");

module.exports.write = NOT_IMPLEMENTED("write");

module.exports.writeFile = NOT_IMPLEMENTED("writeFile");

module.exports.writeFileSync = function(path, data, options) {
  var encoding = encodingFromOptions(options, "utf8");

  var nsdata = Buffer.from(
    data,
    encoding === "NSData" || encoding === "buffer" ? undefined : encoding
  ).toNSData();

  nsdata.writeToFile_atomically(path, true);
};

module.exports.writeSync = NOT_IMPLEMENTED("writeSync");


/***/ }),

/***/ "./node_modules/@skpm/fs/utils.js":
/*!****************************************!*\
  !*** ./node_modules/@skpm/fs/utils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.parseStat = function parseStat(result) {
  return {
    dev: String(result.NSFileDeviceIdentifier),
    // ino: 48064969, The file system specific "Inode" number for the file.
    mode: result.NSFileType | result.NSFilePosixPermissions,
    nlink: Number(result.NSFileReferenceCount),
    uid: String(result.NSFileOwnerAccountID),
    gid: String(result.NSFileGroupOwnerAccountID),
    // rdev: 0, A numeric device identifier if the file is considered "special".
    size: Number(result.NSFileSize),
    // blksize: 4096, The file system block size for i/o operations.
    // blocks: 8, The number of blocks allocated for this file.
    atimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    mtimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    ctimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    birthtimeMs:
      Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000,
    atime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ), // the 0.5 comes from the node source. Not sure why it's added but in doubt...
    mtime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    ctime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    birthtime: new Date(
      Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    isBlockDevice: function() {
      return result.NSFileType === NSFileTypeBlockSpecial;
    },
    isCharacterDevice: function() {
      return result.NSFileType === NSFileTypeCharacterSpecial;
    },
    isDirectory: function() {
      return result.NSFileType === NSFileTypeDirectory;
    },
    isFIFO: function() {
      return false;
    },
    isFile: function() {
      return result.NSFileType === NSFileTypeRegular;
    },
    isSocket: function() {
      return result.NSFileType === NSFileTypeSocket;
    },
    isSymbolicLink: function() {
      return result.NSFileType === NSFileTypeSymbolicLink;
    }
  };
};

var ERRORS = {
  EPERM: {
    message: "operation not permitted",
    errno: -1
  },
  ENOENT: {
    message: "no such file or directory",
    errno: -2
  },
  EACCES: {
    message: "permission denied",
    errno: -13
  },
  ENOTDIR: {
    message: "not a directory",
    errno: -20
  },
  EISDIR: {
    message: "illegal operation on a directory",
    errno: -21
  }
};

function fsError(code, options) {
  var error = new Error(
    code +
      ": " +
      ERRORS[code].message +
      ", " +
      (options.syscall || "") +
      (options.path ? " '" + options.path + "'" : "")
  );

  Object.keys(options).forEach(function(k) {
    error[k] = options[k];
  });

  error.code = code;
  error.errno = ERRORS[code].errno;

  return error;
}

module.exports.fsError = fsError;

module.exports.fsErrorForPath = function fsErrorForPath(
  path,
  shouldBeDir,
  err,
  syscall
) {
  var fileManager = NSFileManager.defaultManager();
  var doesExist = fileManager.fileExistsAtPath(path);
  if (!doesExist) {
    return fsError("ENOENT", {
      path: path,
      syscall: syscall || "open"
    });
  }
  var isReadable = fileManager.isReadableFileAtPath(path);
  if (!isReadable) {
    return fsError("EACCES", {
      path: path,
      syscall: syscall || "open"
    });
  }
  if (typeof shouldBeDir !== "undefined") {
    var isDirectory = module.exports.lstatSync(path).isDirectory();
    if (isDirectory && !shouldBeDir) {
      return fsError("EISDIR", {
        path: path,
        syscall: syscall || "read"
      });
    } else if (!isDirectory && shouldBeDir) {
      return fsError("ENOTDIR", {
        path: path,
        syscall: syscall || "read"
      });
    }
  }
  return new Error(err || "Unknown error while manipulating " + path);
};

module.exports.encodingFromOptions = function encodingFromOptions(
  options,
  defaultValue
) {
  return options && options.encoding
    ? String(options.encoding)
    : options
    ? String(options)
    : defaultValue;
};

module.exports.NOT_IMPLEMENTED = function NOT_IMPLEMENTED(name) {
  return function() {
    throw new Error(
      "fs." +
        name +
        " is not implemented yet. If you feel like implementing it, any contribution will be gladly accepted on https://github.com/skpm/fs"
    );
  };
};


/***/ }),

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/mocha-js-delegate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mocha-js-delegate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-module-user-preferences/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-user-preferences/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const SUITE_PREFIX = 'plugin.sketch.'

function isPresent (data) {
  return data != null
}

module.exports = {
  getUserPreferences: function (pluginName, defaultPrefs) {
    var prefs = {}
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(defaultPrefs).forEach(function (k) {
      if (typeof defaultPrefs[k] === 'boolean') {
        prefs[k] = isPresent(store.boolForKey(k)) ? Boolean(store.boolForKey(k)) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'number') {
        prefs[k] = isPresent(store.doubleForKey(k)) ? store.doubleForKey(k) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'string') {
        prefs[k] = isPresent(store.stringForKey(k)) ? '' + store.stringForKey(k) : defaultPrefs[k]
      } else if (Array.isArray(defaultPrefs[k])) {
        prefs[k] = store.arrayForKey(k) || defaultPrefs[k]
      } else {
        prefs[k] = store.dictionaryForKey(k) || defaultPrefs[k]
      }
    })
    return prefs
  },
  setUserPreferences: function (pluginName, prefs) {
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(prefs).forEach(function (k) {
      if (typeof prefs[k] === 'boolean') {
        store.setBool_forKey(prefs[k], k)
      } else if (typeof prefs[k] === 'number') {
        store.setDouble_forKey(prefs[k], k)
      } else {
        store.setObject_forKey(prefs[k], k)
      }
    })
    store.synchronize()
  }
}


/***/ }),

/***/ "./node_modules/sketch-polyfill-fetch/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/sketch-polyfill-fetch/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {/* globals NSJSONSerialization NSJSONWritingPrettyPrinted NSDictionary NSHTTPURLResponse NSString NSASCIIStringEncoding NSUTF8StringEncoding coscript NSURL NSMutableURLRequest NSMutableData NSURLConnection */
var _ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js")

var ObjCClass = _ObjCClass.default
var Buffer
try {
  Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer
} catch (err) {}

function response (httpResponse, data) {
  var keys = []
  var all = []
  var headers = {}
  var header

  for (var i = 0; i < httpResponse.allHeaderFields().allKeys().length; i++) {
    var key = httpResponse.allHeaderFields().allKeys()[i].toLowerCase()
    var value = String(httpResponse.allHeaderFields()[key])
    keys.push(key)
    all.push([key, value])
    header = headers[key]
    headers[key] = header ? (header + ',' + value) : value
  }

  return {
    ok: (httpResponse.statusCode() / 200 | 0) == 1, // 200-399
    status: Number(httpResponse.statusCode()),
    statusText: NSHTTPURLResponse.localizedStringForStatusCode(httpResponse.statusCode()),
    useFinalURL: true,
    url: String(httpResponse.URL().absoluteString()),
    clone: response.bind(this, httpResponse, data),
    text: function () {
      return new Promise(function (resolve, reject) {
        const str = NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding)
        if (str) {
          resolve(str)
        } else {
          reject(new Error("Couldn't parse body"))
        }
      })
    },
    json: function () {
      return new Promise(function (resolve, reject) {
        var str = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding)
        if (str) {
          // parse errors are turned into exceptions, which cause promise to be rejected
          var obj = JSON.parse(str)
          resolve(obj)
        } else {
          reject(new Error('Could not parse JSON because it is not valid UTF-8 data.'))
        }
      })
    },
    blob: function () {
      return Promise.resolve(data)
    },
    arrayBuffer: function() {
      return Promise.resolve(Buffer.from(data))
    },
    headers: {
      keys: function () { return keys },
      entries: function () { return all },
      get: function (n) { return headers[n.toLowerCase()] },
      has: function (n) { return n.toLowerCase() in headers }
    }
  }
}

// We create one ObjC class for ourselves here
var DelegateClass

function fetch (urlString, options) {
  options = options || {}
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }
  return new Promise(function (resolve, reject) {
    var url = NSURL.alloc().initWithString(urlString)
    var request = NSMutableURLRequest.requestWithURL(url)
    request.setHTTPMethod(options.method || 'GET')

    Object.keys(options.headers || {}).forEach(function (i) {
      request.setValue_forHTTPHeaderField(options.headers[i], i)
    })

    if (options.body) {
      var data
      if (typeof options.body === 'string') {
        var str = NSString.alloc().initWithString(options.body)
        data = str.dataUsingEncoding(NSUTF8StringEncoding)
      } else if (Buffer && Buffer.isBuffer(options.body)) {
        data = options.body.toNSData()
      } else if (options.body.isKindOfClass && (options.body.isKindOfClass(NSData) == 1) ) {
        data = options.body
      } else if (options.body._isFormData) {
        var boundary = options.body._boundary
        data = options.body._data
        data.appendData(
          NSString.alloc()
            .initWithString("--" + boundary + "--\r\n")
            .dataUsingEncoding(NSUTF8StringEncoding)
        )
        request.setValue_forHTTPHeaderField('multipart/form-data; boundary=' + boundary, 'Content-Type')
      } else {
        var error
        data = NSJSONSerialization.dataWithJSONObject_options_error(options.body, NSJSONWritingPrettyPrinted, error)
        if (error != null) {
          return reject(error)
        }
        request.setValue_forHTTPHeaderField('' + data.length(), 'Content-Length')
      }
      request.setHTTPBody(data)
    }

    if (options.cache) {
      switch (options.cache) {
        case 'reload':
        case 'no-cache':
        case 'no-store': {
          request.setCachePolicy(1) // NSURLRequestReloadIgnoringLocalCacheData
        }
        case 'force-cache': {
          request.setCachePolicy(2) // NSURLRequestReturnCacheDataElseLoad
        }
        case 'only-if-cached': {
          request.setCachePolicy(3) // NSURLRequestReturnCacheDataElseLoad
        }
      }
    }


    if (!options.credentials) {
      request.setHTTPShouldHandleCookies(false)
    }

    if (!DelegateClass) {
      DelegateClass = ObjCClass({
        classname: 'FetchPolyfillDelegate',
        data: null,
        httpResponse: null,
        fiber: null,
        callbacks: null,

        'connectionDidFinishLoading:': function (connection) {
          this.callbacks.succeed(this.httpResponse, this.data)
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveResponse:': function (connection, httpResponse) {
          this.httpResponse = httpResponse
          this.data = NSMutableData.alloc().init()
        },
        'connection:didFailWithError:': function (connection, error) {
          this.callbacks.fail(error)
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveData:': function (connection, data) {
          this.data.appendData(data)
        }
      })
    }

    var finished = false

    function succeed(res, data) {
      finished = true
      resolve(response(res, data))
    }

    function fail(err) {
      finished = true
      reject(err)
    }

    var connectionDelegate = DelegateClass.new()
    connectionDelegate.callbacks = NSDictionary.dictionaryWithDictionary({
      succeed: succeed,
      fail: fail,
    })
    connectionDelegate.fiber = fiber;

    var connection = NSURLConnection.alloc().initWithRequest_delegate(
      request,
      connectionDelegate
    )

    if (fiber) {
      fiber.onCleanup(function () {
        if (!finished) {
          connection.cancel()
        }
      })
    }

  })
}

module.exports = fetch

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! exports provided: onStartup, onShutdown, onSupplyHotelName, onSupplyAddress, onSupplyCountry, onSupplyHeroImage, onSupplyRoomImage, onSupplyFacilityImage, openPanel, onSelectionChange, commandTextAddressShort, commandTextAddressMedium, commandTextAddressLong, commandTextAirportShort, commandTextAirportMedium, commandTextAirportLong, commandTextCityShort, commandTextCityMedium, commandTextCityLong, commandTextCountryShort, commandTextCountryMedium, commandTextCountryLong, commandTextPropertyShort, commandTextPropertyMedium, commandTextPropertyLong, commandTextWeatherShort, commandTextWeatherMedium, commandTextWeatherLong, commandTextCurrencyShort, commandTextCurrencyMedium, commandTextCurrencyLong, commandTextTimestampShort, commandTextTimestampMedium, commandTextTimestampLong, commandTextNameShort, commandTextNameMedium, commandTextNameLong, commandImagePropertyHero, commandImagePropertyRoom, commandImagePropertyFacilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setTimeout) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStartup", function() { return onStartup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onShutdown", function() { return onShutdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyHotelName", function() { return onSupplyHotelName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyAddress", function() { return onSupplyAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyCountry", function() { return onSupplyCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyHeroImage", function() { return onSupplyHeroImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyRoomImage", function() { return onSupplyRoomImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSupplyFacilityImage", function() { return onSupplyFacilityImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openPanel", function() { return openPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSelectionChange", function() { return onSelectionChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAddressShort", function() { return commandTextAddressShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAddressMedium", function() { return commandTextAddressMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAddressLong", function() { return commandTextAddressLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAirportShort", function() { return commandTextAirportShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAirportMedium", function() { return commandTextAirportMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextAirportLong", function() { return commandTextAirportLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCityShort", function() { return commandTextCityShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCityMedium", function() { return commandTextCityMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCityLong", function() { return commandTextCityLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCountryShort", function() { return commandTextCountryShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCountryMedium", function() { return commandTextCountryMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCountryLong", function() { return commandTextCountryLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextPropertyShort", function() { return commandTextPropertyShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextPropertyMedium", function() { return commandTextPropertyMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextPropertyLong", function() { return commandTextPropertyLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextWeatherShort", function() { return commandTextWeatherShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextWeatherMedium", function() { return commandTextWeatherMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextWeatherLong", function() { return commandTextWeatherLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCurrencyShort", function() { return commandTextCurrencyShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCurrencyMedium", function() { return commandTextCurrencyMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextCurrencyLong", function() { return commandTextCurrencyLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextTimestampShort", function() { return commandTextTimestampShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextTimestampMedium", function() { return commandTextTimestampMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextTimestampLong", function() { return commandTextTimestampLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextNameShort", function() { return commandTextNameShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextNameMedium", function() { return commandTextNameMedium; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandTextNameLong", function() { return commandTextNameLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandImagePropertyHero", function() { return commandImagePropertyHero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandImagePropertyRoom", function() { return commandImagePropertyRoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandImagePropertyFacilities", function() { return commandImagePropertyFacilities; });
/* harmony import */ var mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mocha-js-delegate */ "./node_modules/mocha-js-delegate/index.js");
/* harmony import */ var mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-polyfill-fetch */ "./node_modules/sketch-polyfill-fetch/lib/index.js");
/* harmony import */ var sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch-module-user-preferences */ "./node_modules/sketch-module-user-preferences/index.js");
/* harmony import */ var sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_2__);




var sketch = __webpack_require__(/*! sketch */ "sketch");

var DataSupplier = sketch.DataSupplier,
    UI = sketch.UI,
    Settings = sketch.Settings;

var os = __webpack_require__(/*! os */ "os");

var path = __webpack_require__(/*! path */ "path");

var util = __webpack_require__(/*! util */ "util");

var fs = __webpack_require__(/*! @skpm/fs */ "./node_modules/@skpm/fs/index.js");

var FillType = {
  Solid: 0,
  Gradient: 1,
  Pattern: 4,
  Noise: 5
};
var PatternFillType = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3
};
var defaultPreferences = {
  randomisation: true
};
var Messaging = {
  downloading: "🕑 Downloading...",
  complete: "✅ Complete!"
};
var Alert = {
  title: "Agoda Toolkit",
  imageUrlBroken: "Some image urls cannot be reached!",
  selectText: "Select any text layers.",
  selectLayerWithFill: "Select any layers with at least one fill style."
};
var IDENTITY = "com.agoda.sketchplugin.datagenerator";
var preferences = sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_2___default.a.getUserPreferences(IDENTITY, defaultPreferences);
var FOLDER = path.join(os.tmpdir(), IDENTITY); //===============================================================================================//
// Data supplier life cycle =====================================================================//
//===============================================================================================//

function onStartup() {
  // DataSupplier.registerDataSupplier('public.image', 'Hotel Property Images', 'SupplyPropertyImage');
  DataSupplier.registerDataSupplier('public.text', 'Hotel Names', 'SupplyHotelName');
  DataSupplier.registerDataSupplier('public.text', 'Address', 'SupplyAddress');
  DataSupplier.registerDataSupplier('public.text', 'Countries', 'SupplyCountry');
  DataSupplier.registerDataSupplier('public.image', 'Hotel Front Images', 'SupplyHeroImage');
  DataSupplier.registerDataSupplier('public.image', 'Hotel Room Images', 'SupplyRoomImage');
  DataSupplier.registerDataSupplier('public.image', 'Hotel Facility Images', 'SupplyFacilityImage'); // DataSupplier.resisterDataSupplier('publuc.image', 'Hotel Room Imaage')
}
function onShutdown() {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers();

  try {
    if (fs.existsSync(FOLDER)) {
      fs.rmdirSync(FOLDER);
    }
  } catch (err) {
    console.error(err);
  }
}
function onSupplyHotelName(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyDataForItems(dataKey, items, "property-name");
}
function onSupplyAddress(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyDataForItems(dataKey, items, "address");
}
function onSupplyCountry(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyDataForItems(dataKey, items, "country");
}
function onSupplyHeroImage(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyImageForItems(dataKey, items, "property");
}
function onSupplyRoomImage(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyImageForItems(dataKey, items, "room");
}
function onSupplyFacilityImage(context) {
  var dataKey = context.data.key;
  var items = util.toArray(context.data.items).map(sketch.fromNative);
  getAndSupplyImageForItems(dataKey, items, "facilities");
}

function getAndSupplyDataForItems(dataKey, items, dataAddress) {
  UI.message(Messaging.downloading);
  fetchData(function (data) {
    items.forEach(function (_, index) {
      var targetData = mergeArrays([data["data"][dataAddress]["long"], data["data"][dataAddress]["medium"], data["data"][dataAddress]["short"]]); // let targetDataIndex = Math.floor(Math.random() * targetData.length)

      var targetDataIndex = getRandom(0, targetData.length - 1);
      var selected = targetData[targetDataIndex];
      DataSupplier.supplyDataAtIndex(dataKey, selected, index);
      UI.message(Messaging.complete);
    });
  });
}

function getAndSupplyImageForItems(dataKey, items, dataAddress) {
  UI.message(Messaging.downloading);
  fetchData(function (data) {
    items.forEach(function (_, index) {
      var targetData = data["data"]["images"][dataAddress]; // let targetDataIndex = Math.floor(Math.random() * targetData.length)

      var targetDataIndex = getRandom(0, targetData.length - 1);
      var selected = targetData[targetDataIndex];
      setImageFromURL(dataKey, index, selected);
    });
  });
}

function mergeArrays() {
  var arrays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var newArray = [];

  for (var i = 0; i < arrays.length; i++) {
    newArray = newArray.concat(arrays[i]);
  } // log(newArray)


  return newArray;
}

function setImageFromURL(dataKey, index, url) {
  return getImageFromURL(url).then(function (imagePath) {
    if (!imagePath) {
      return;
    }

    DataSupplier.supplyDataAtIndex(dataKey, imagePath, index);
    UI.message(Messaging.complete);
  });
}

function getImageFromURL(url) {
  return sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1___default()(encodeURI(url)).then(function (res) {
    return res.blob();
  }).then(saveTempFileFormImageData).catch(function (err) {
    console.error(err);
    log(err);
    return;
  });
}

function saveTempFileFormImageData(imageData) {
  var guid = NSProcessInfo.processInfo().globallyUniqueString();
  var imagePath = path.join(FOLDER, "".concat(guid, ".jpg"));

  try {
    fs.mkdirSync(FOLDER);
  } catch (err) {// probably because the folder already exists
    // TODO: check that it is really because it already exists
    // console.error(err)
    // log(err)
  }

  try {
    fs.writeFileSync(imagePath, imageData, 'NSData');
    return imagePath;
  } catch (err) {
    console.error(err);
    log(err);
    return undefined;
  }
} //===============================================================================================//
// Open Panel Function ==========================================================================//
//===============================================================================================//


function openPanel(context) {
  var panelWidth = 340;
  var panelHeight = 590; // Create an NSThread dictionary with a specific identifier

  var threadDictionary = NSThread.mainThread().threadDictionary();
  var identifier = IDENTITY; // If there's already a panel, prevent the plugin from running

  if (threadDictionary[identifier]) return; // Create the panel and set its appearance

  var panel = NSPanel.alloc().init();
  panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true);
  panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask); // panel.setBackgroundColor(NSColor.whiteColor());

  panel.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.1294117647, 0.1294117647, 0.1294117647, 1)); // Set the panel's title and title bar appearance
  // panel.title = "Agoda Content Generator";

  panel.titlebarAppearsTransparent = true; // Center and focus the panel

  panel.center();
  panel.makeKeyAndOrderFront(null);
  panel.setLevel(NSFloatingWindowLevel); // Make the plugin's code stick around (since it's a floating panel)

  COScript.currentCOScript().setShouldKeepAround_(true); // Hide the Minimize and Zoom button

  panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  panel.standardWindowButton(NSWindowZoomButton).setHidden(true); // Create the blurred background 
  // var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight));
  // vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight));
  // vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow);
  // Create the WebView with a request to a Web page in Contents/Resources/

  var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44));
  var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("webView-300-test1.html"));
  webView.mainFrame().loadRequest(request); // Prevent it from drawing a white background

  webView.setDrawsBackground(false); // Access the Web page's JavaScript environment

  var windowObject = webView.windowScriptObject(); // Create the delegate

  var delegate = new mocha_js_delegate__WEBPACK_IMPORTED_MODULE_0___default.a({
    // Listen for URL changes
    "webView:didChangeLocationWithinPageForFrame:": function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
      // Extract the URL hash (without #) by executing JavaScript in the Web page
      var hash = windowObject.evaluateWebScript("window.location.hash.substring(1)");
      var data = JSON.parse(hash); //call action control

      actionControl(context, data);
    },
    "webView:didFinishLoadForFrame:": function webViewDidFinishLoadForFrame(webView, webFrame) {
      var selection = context.selection;

      if (selection.length == 1) {
        var layer = selection[0];
        var layerClass = layer.class();

        if (layerClass == "MSTextLayer") {
          var text = layer.stringValue();
          windowObject.evaluateWebScript("updateWordCount('" + text + "')");
        } else {
          var text = "$$$NotTextLayer$$$";
          windowObject.evaluateWebScript("updateWordCount('" + text + "')");
        }
      } else {
        var text = "$$$NotTextLayer$$$";
        windowObject.evaluateWebScript("updateWordCount('" + text + "')");
      }

      var randomisation = preferences.randomisation;

      if (randomisation) {
        windowObject.evaluateWebScript("updateRandomisationBox('true')");
      } else {
        windowObject.evaluateWebScript("updateRandomisationBox('false')");
      }
    }
  }); // Set the delegate on the WebView

  webView.setFrameLoadDelegate_(delegate.getClassInstance()); // Add blurred effect
  // panel.contentView().addSubview(vibrancy); 
  // Add web view

  panel.contentView().addSubview(webView); // After creating the panel, store a reference to it

  threadDictionary[identifier] = panel;
  var closeButton = panel.standardWindowButton(NSWindowCloseButton); // Assign a function to the Close button

  closeButton.setCOSJSTargetFunction(function (sender) {
    panel.close(); // Remove the reference to the panel

    threadDictionary.removeObjectForKey(identifier); // Stop the plugin

    COScript.currentCOScript().setShouldKeepAround_(false);
  });
} //===============================================================================================//
// On Selection Change Function =================================================================//
//===============================================================================================//

function onSelectionChange(context) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var identifier = IDENTITY; // Check if there's a panel opened or not

  if (threadDictionary[identifier]) {
    var panel = threadDictionary[identifier]; // Access the panel from the reference and the WebView

    var webView = panel.contentView().subviews()[0];
    var windowObject = webView.windowScriptObject(); // Get the current selection and update the CSS preview accordingly

    var selection;

    if (option == 2) {
      selection = context.document.selectedLayers().layers();
    } else {
      selection = context.actionContext.document.selectedLayers().layers();
    }

    if (selection.length == 1) {
      var layer = selection[0];
      var layerClass = layer.class();

      if (layerClass == "MSTextLayer") {
        var text = layer.stringValue();
        windowObject.evaluateWebScript("updateWordCount('" + text + "')");
      } else {
        var text = "$$$NotTextLayer$$$";
        windowObject.evaluateWebScript("updateWordCount('" + text + "')");
      }
    } else {
      var text = "$$$NotTextLayer$$$";
      windowObject.evaluateWebScript("updateWordCount('" + text + "')");
    }
  }
} //===============================================================================================//
// Command Receivers ============================================================================//
//===============================================================================================//
//Address

function commandTextAddressShort(context) {
  commandHandler(context, "address", "short");
}
function commandTextAddressMedium(context) {
  commandHandler(context, "address", "medium");
}
function commandTextAddressLong(context) {
  commandHandler(context, "address", "long");
} //Airport

function commandTextAirportShort(context) {
  commandHandler(context, "airports", "short");
}
function commandTextAirportMedium(context) {
  commandHandler(context, "airports", "medium");
}
function commandTextAirportLong(context) {
  commandHandler(context, "airports", "long");
} //City

function commandTextCityShort(context) {
  commandHandler(context, "cities", "short");
}
function commandTextCityMedium(context) {
  commandHandler(context, "cities", "medium");
}
function commandTextCityLong(context) {
  commandHandler(context, "cities", "long");
} //Country

function commandTextCountryShort(context) {
  commandHandler(context, "country", "short");
}
function commandTextCountryMedium(context) {
  commandHandler(context, "country", "medium");
}
function commandTextCountryLong(context) {
  commandHandler(context, "country", "long");
} // Property

function commandTextPropertyShort(context) {
  commandHandler(context, "property-name", "short");
}
function commandTextPropertyMedium(context) {
  commandHandler(context, "property-name", "medium");
}
function commandTextPropertyLong(context) {
  commandHandler(context, "property-name", "long");
} // Weather

function commandTextWeatherShort(context) {
  commandHandler(context, "weather", "short");
}
function commandTextWeatherMedium(context) {
  commandHandler(context, "weather", "medium");
}
function commandTextWeatherLong(context) {
  commandHandler(context, "weather", "long");
} //Currency

function commandTextCurrencyShort(context) {
  commandHandler(context, "currency", "short");
}
function commandTextCurrencyMedium(context) {
  commandHandler(context, "currency", "medium");
}
function commandTextCurrencyLong(context) {
  commandHandler(context, "currency", "long");
} //Timestamp

function commandTextTimestampShort(context) {
  commandHandler(context, "timestamp", "short");
}
function commandTextTimestampMedium(context) {
  commandHandler(context, "timestamp", "medium");
}
function commandTextTimestampLong(context) {
  commandHandler(context, "timestamp", "long");
} //Name

function commandTextNameShort(context) {
  commandHandler(context, "names", "short");
}
function commandTextNameMedium(context) {
  commandHandler(context, "names", "medium");
}
function commandTextNameLong(context) {
  commandHandler(context, "names", "long");
} //Property - Image

function commandImagePropertyHero(context) {
  commandHandler(context, "images", "property");
}
function commandImagePropertyRoom(context) {
  commandHandler(context, "images", "room");
}
function commandImagePropertyFacilities(context) {
  commandHandler(context, "images", "facilities");
} //===============================================================================================//
// Core Functions ===============================================================================//
//===============================================================================================//

function commandHandler(context, action, subAction) {
  fetchData(function (data) {
    var targetArray;

    try {
      if (data.data[action][subAction]) {
        targetArray = data.data[action][subAction];
      }
    } catch (e) {
      targetArray = null;
    }

    var randomisation = preferences.randomisation;
    var data = {
      "action": action,
      "sub-action": subAction,
      "data": targetArray,
      "randomisation": randomisation,
      "date": new Date().getTime()
    };
    actionControl(context, data);
  });
}

function fetchData(callback) {
  sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1___default()("https://github.agodadev.io/pages/pwanpen/Agoda-data/data.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    if (typeof callback === "function") {
      callback(data);
    } else {
      return false;
    }
  }).catch(function (e) {
    return log(e);
  });
}

function fetchImage(url, ingnoreCache) {
  var request = ingnoreCache ? NSURLRequest.requestWithURL_cachePolicy_timeoutInterval(NSURL.URLWithString(url), NSURLRequestReloadIgnoringLocalCacheData, 60) : NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var responsePtr = MOPointer.alloc().init();
  var errorPtr = MOPointer.alloc().init();
  var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr);

  if (errorPtr.value() != null) {
    print(errorPtr.value());
    return null;
  }

  var response = responsePtr.value();

  if (response.statusCode() != 200) {
    return null;
  }

  var mimeType = response.allHeaderFields()["Content-Type"];

  if (!mimeType || !mimeType.hasPrefix("image/")) {
    return null;
  }

  return NSImage.alloc().initWithData(data);
}

function actionControl(context, action) {
  log(action);

  switch (action.action) {
    case "currency":
      textCurrency(context, action);
      break;

    case "images":
      fillImage(context, action);
      break;

    case "setRamdomisationPref":
      setRamdomisationPref(action);
      break;

    case "translate":
      translateRegular(context, action);
      break;

    case "crossout":
      generateCrossoutRate(context, action);

    default:
      textFromData(context, action);
      break;
  }
}

function fillImage(context, action) {
  var layerData = getLayerWithFillStyle(context);
  var targetArray = action.data.slice(0);
  var randomisation = action.randomisation;
  var ranNum = getRandom(0, targetArray.length - 1);
  var errorImage = 0;

  if (layerData) {
    UI.message(Messaging.downloading);
    setTimeout(function () {
      for (var i = 0; i < layerData.layers.length; i++) {
        var layer = layerData.layers[i];
        var layerClass = layer.class();

        if (randomisation) {
          ranNum = getRandom(0, targetArray.length - 1);
        }

        var url = encodeURI(targetArray[ranNum]);
        var image = fetchImage(url);

        if (randomisation) {
          targetArray.splice(ranNum, 1);
        }

        if (targetArray.length == 0) {
          targetArray = action.data.slice(0);
        } // log("image-url: "+url)


        if (image) {
          switch (layerClass) {
            default:
              var fill = layer.style().firstEnabledFill();
              fill.fillType = FillType.Pattern;
              fill.patternFillType = PatternFillType.Fill;
              fill.image = MSImageData.alloc().initWithImage(image);
              break;
            // default:
            // 	log('This layer is not in any categories')
            // 	break;

            case MSSymbolInstance:
              var masterKey = layer.symbolMaster();
              var overridePoint = layerData.symbols[masterKey];
              var imageData = MSImageData.alloc().initWithImage(image);
              layer.setValue_forOverridePoint_(imageData, overridePoint);
              break;
          }
        } else {
          errorImage++;
        }
      }

      if (errorImage > 0) {
        UI.alert(Alert.title, Alert.imageUrlBroken);
      }

      UI.message(Messaging.complete);
    }, 500);
  }
}

function textFromData(context, action) {
  var layerData = getSelectedTextLayer(context);
  var targetArray = action.data.slice(0);
  var randomisation = action.randomisation;
  var ranNum = getRandom(0, targetArray.length - 1); // log(targetArray)

  if (layerData) {
    for (var i = 0; i < layerData.layers.length; i++) {
      var layer = layerData.layers[i];

      if (randomisation) {
        ranNum = getRandom(0, targetArray.length - 1);
      }

      var text = decodeURIComponent(targetArray[ranNum]);
      var layerClass = layer.class();

      switch (layerClass) {
        case MSTextLayer:
          layer.stringValue = text; // layer.name = text

          break;

        case MSSymbolInstance:
          var masterKey = layer.symbolMaster();
          var overridePoint = layerData.symbols[masterKey];
          layer.setValue_forOverridePoint_(text, overridePoint);
          break;

        default:
          log('This layer is not in any categories');
          break;
      }

      if (randomisation) {
        targetArray.splice(ranNum, 1);
      }

      if (targetArray.length == 0) {
        targetArray = action.data.slice(0);
      }

      onSelectionChange(context, 2);
    }
  }
}

function textCurrency(context, action) {
  log(context);
  var layerData = getSelectedTextLayer(context);
  var randomisation = action.randomisation;
  var getCurrency;

  switch (action['sub-action']) {
    case "short":
      getCurrency = function getCurrency() {
        var number = getRandom(1, 9999).toLocaleString('en');
        var text = "$" + number;
        return text;
      };

      break;

    case "medium":
      getCurrency = function getCurrency() {
        var number = getRandom(999, 999999).toLocaleString('en');
        var text = "SGD" + number;
        return text;
      };

      break;

    case "long":
      getCurrency = function getCurrency() {
        var number = getRandom(999999, 99999999).toLocaleString('en');
        var text = "VND" + number;
        return text;
      };

      break;
  }

  if (layerData) {
    var text = getCurrency();

    for (var i = 0; i < layerData.layers.length; i++) {
      var layer = layerData.layers[i];

      if (randomisation) {
        text = getCurrency();
      }

      var layerClass = layer.class();

      switch (layerClass) {
        case MSTextLayer:
          layer.stringValue = text; // layer.name = text

          break;

        case MSSymbolInstance:
          var masterKey = layer.symbolMaster();
          var overridePoint = layerData.symbols[masterKey];
          layer.setValue_forOverridePoint_(text, overridePoint);
          break;

        default:
          log('This layer is not in any categories');
          break;
      }

      onSelectionChange(context, 2);
    }
  }
}

function getSelectedTextLayer(context) {
  var selectedLayers = context.document.selectedLayers().layers();
  var selectedCount = selectedLayers.count(); // var selectedTextLayers = [];

  var selectedTextLayers = {
    layers: [],
    symbols: {},
    groups: []
  };

  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    var layerClass = layer.class();

    switch (layerClass) {
      case MSTextLayer:
        selectedTextLayers.layers.push(layer);
        break;

      default:
        log('This layer is not in any categories');
        break;

      case MSSymbolInstance:
        selectedTextLayers.layers.push(layer);
        var masterKey = layer.symbolMaster();

        if (!selectedTextLayers.symbols.hasOwnProperty(masterKey)) {
          var targetPoint = getOverridePoint(layer, "stringValue");
          selectedTextLayers.symbols[masterKey] = targetPoint;
        }

        break;
    } // if (layerClass == "MSTextLayer") selectedTextLayers.push(layer)

  }

  var layerCount = countSelectedLayers(selectedTextLayers);

  if (layerCount == 0) {
    UI.alert(Alert.title, Alert.selectText);
    return false;
  } else {
    return selectedTextLayers;
  }
}

function getLayerWithFillStyle(context) {
  var layers = context.document.selectedLayers().layers();
  var count = layers.count();
  var selectedTextLayers = {
    layers: [],
    symbols: {},
    groups: []
  };

  for (var i = 0; i < count; i++) {
    var layer = layers[i];
    var layerClass = layer.class();

    switch (layerClass) {
      default:
        if (layer && layer.style().firstEnabledFill()) {
          selectedTextLayers.layers.push(layer);
        }

        break;
      // default:
      // 	log('This layer is not in any categories')
      // 	break;

      case MSSymbolInstance:
        selectedTextLayers.layers.push(layer);
        var masterKey = layer.symbolMaster();

        if (!selectedTextLayers.symbols.hasOwnProperty(masterKey)) {
          var targetPoint = getOverridePoint(layer, "image");
          selectedTextLayers.symbols[masterKey] = targetPoint;
        }

        break;
    }
  }

  var layerCount = countSelectedLayers(selectedTextLayers);

  if (layerCount == 0) {
    UI.alert(Alert.title, Alert.selectLayerWithFill);
    return false;
  } else {
    return selectedTextLayers;
  }
}

function countSelectedLayers(data) {
  var layers = data.layers.length;
  var groups = data.groups.length;
  var symbols = Object.keys(data.symbols).length;
  return layers + groups + symbols;
}

function getOverridePoint(layer, type) {
  var overrideData = {
    overridePoints: [],
    overrideTitles: [],
    layer: layer
  };
  layer.overridePoints().forEach(function (overridePoint) {
    if (overridePoint.property() == type) {
      log(overridePoint.layerName());
      overrideData.overridePoints.push(overridePoint);
      overrideData.overrideTitles.push(overridePoint.layerName());
    }
  });
  overrideData.overrideTitles = renameArray(overrideData.overrideTitles);
  var selection = {
    overridePoint: null,
    overrideTitle: null
  };

  if (overrideData.overridePoints.length == 1) {
    selection.overridePoint = overrideData.overridePoints[0];
  } else {
    selection = modalSelectLayer(overrideData);
  }

  return selection.overridePoint;
}

function renameArray(arr) {
  var count = {};
  arr.forEach(function (x, i) {
    if (arr.indexOf(x) !== i) {
      var c = x in count ? count[x] = count[x] + 1 : count[x] = 1;
      var j = c + 1;
      var k = x + '(' + j + ')';

      while (arr.indexOf(k) !== -1) {
        k = x + '(' + ++j + ')';
      }

      arr[i] = k;
    }
  });
  return arr;
}

function modalSelectLayer(overrideData) {
  var modal = COSAlertWindow.new();
  var masterName = overrideData.layer.symbolMaster().name();
  modal.setMessageText("Select target layer in symbol named: " + masterName);
  modal.addButtonWithTitle("Ok");
  modal.addButtonWithTitle("Cancel");
  var viewWidth = 300;
  var viewHeight = 100;
  var dropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 130, 22));
  overrideData.overrideTitles.forEach(function (title) {
    dropdown.addItemWithTitle_(title);
  });
  modal.addAccessoryView(dropdown);
  var response = modal.runModal();
  var selection = {
    overridePoint: null,
    overrideTitle: null
  };

  if (response == "1000") {
    var index = dropdown.indexOfSelectedItem();
    selection.overridePoint = overrideData.overridePoints[index]; // selection.overrideTitle = overrideData.overrideTitles[index]
  }

  return selection;
}

function getRandom(min, max) {
  // return Math.round( Math.random() * (max - min) + min )
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // !Deprecated
// function sendAlert(message){
// 	var alert = COSAlertWindow.new()
// 	alert.setMessageText(message)
// 	alert.addButtonWithTitle("Ok")
// 	alert.runModal()
// }
// !Deprecated
// function sendMessage(context, message) {
// 	var doc = context.document
// 	doc.showMessage(message)
// }


function setRamdomisationPref(action) {
  var randomisation = action.randomisation;
  sketch_module_user_preferences__WEBPACK_IMPORTED_MODULE_2___default.a.setUserPreferences(IDENTITY, {
    randomisation: randomisation
  });
} //--------------------------
// Translation API
//--------------------------


function yandexTranslate(layer, targetLang, callback) {
  var lang = targetLang;
  var text = layer.stringValue();
  var keyUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180724T104428Z.25a7e0c10662522d.de42fcb23f4704fef576f4cb3e9fcd0ce8bfed12";
  var langPara = "&lang=" + lang;
  var textPara = "&text=" + text;
  var encodeUrl = encodeURI(keyUrl + langPara + textPara);
  sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1___default()(encodeUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    callback(data, layer);
  }).catch(function (e) {
    return log(e);
  });
}

function googleTranslate(layer, targetLang, callback) {
  var lang = targetLang;
  var text = layer.stringValue();
  var keyUrl = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCAFZ1a5t1jobpcxV6gmqOrIJ4evftdqXU";
  var langPara = "&target=" + lang;
  var textPara = "&q=" + text;
  var encodeUrl = encodeURI(keyUrl + langPara + textPara);
  sketch_polyfill_fetch__WEBPACK_IMPORTED_MODULE_1___default()(encodeUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    callback(data, layer);
  }).catch(function (e) {
    return log(e);
  });
}

function translateRegular(context, data) {
  var layerData = getSelectedTextLayer(context);

  if (layerData) {
    for (var i = 0; i < layerData.layers.length; i++) {
      var layer = layerData.layers[i];
      var layerClass = layer.class();

      switch (layerClass) {
        case MSTextLayer:
          // var targetLang
          var targetLang = data.data;
          googleTranslate(layer, targetLang, function (response, element) {
            // if (response.code == 200) {
            // 	var text = response.text[0]
            // 	element.stringValue = text
            // }
            if (response.hasOwnProperty("data")) {
              var text = response.data.translations[0].translatedText;
              element.stringValue = text;
            }
          });
          break;

        case MSSymbolInstance:
          break;

        default:
          log('This layer is not in any categories');
          break;
      }

      onSelectionChange(context, 2);
    }
  }
}

function generateCrossoutRate(context, action) {
  var sketch = __webpack_require__(/*! sketch */ "sketch");

  var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;

  if (selectedCount == 1) {
    var originalInput = action.data.original;
    var discountInput = action.data.discount;
    var original = selectedLayers.layers[0];
    var newText = new Text({
      text: 'New rate',
      style: original.style,
      parent: original.parent
    });
    var saveOriginX = original.frame.x;
    var saveOriginY = original.frame.y;
    var saveOriginHeight = original.frame.height;
    var newYOffset = saveOriginY + saveOriginHeight + 12;
    newText.frame.offset(saveOriginX, newYOffset);
    var discount = originalInput * (discountInput / 100);
    var newRate = Math.round(originalInput - discount);
    original.text = parseInt(originalInput).toLocaleString('en');
    newText.text = parseInt(newRate).toLocaleString('en');
    log(originalInput.toLocaleString('en')); // original.style.textStrikethrough = 'single'

    var saveOriginWidth = original.frame.width;
    var path = NSBezierPath.bezierPath();
    path.moveToPoint(NSMakePoint(saveOriginX + saveOriginWidth, saveOriginY + 8));
    path.lineToPoint(NSMakePoint(saveOriginX, saveOriginY + saveOriginHeight - 8));
    var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
    var border = shape.style().addStylePartOfType(1);
    border.color = MSColor.colorWithRGBADictionary({
      r: 0.8,
      g: 0.1,
      b: 0.1,
      a: 1
    });
    6;
    border.thickness = 2;
    context.document.currentPage().currentArtboard().addLayers([shape]);
  } else {
    sendAlert('Select a text layer');
  }
} // *experimental text generator
// var Text = require('sketch/dom').Text;
// console.log('This is an example Sketch script.')
// var sketch = require('sketch')
// var document = sketch.getSelectedDocument()
// var selectedLayers = document.selectedLayers
// var selectedCount = selectedLayers.length
// // var text = new Text({
// //   text: "hello",
// //   parent: document.pages[0].layers[0]
// // })
// // console.log(selectedLayers.layers[0].style)
// var saveStyle = selectedLayers.layers[0].style
// var newText = new Text({
//   text: 'New rate',
//   style: saveStyle,
//   parent: selectedLayers.layers[0].parent
// })
// selectedLayers.layers[0].style.textStrikethrough = 'single'
// var saveFrameY = selectedLayers.layers[0].frame.y
// var saveFrameX = selectedLayers.layers[0].frame.x
// var saveFrameHeight = selectedLayers.layers[0].frame.height
// var newOffset = saveFrameY+saveFrameHeight+12
// newText.frame.offset(saveFrameX, newOffset)
// console.log(selectedLayers.layers[0].text)
// *experimental line and path generator
// var path = NSBezierPath.bezierPath();
// path.moveToPoint(NSMakePoint(saveFrameX+saveFrameWidth, saveFrameY+8));
// path.lineToPoint(NSMakePoint(saveFrameX, (saveFrameY+saveFrameHeight)-8));
// var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
// var border = shape.style().addStylePartOfType(1);
// border.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});6
// border.thickness = 2;
// // selectedLayers.layers[0].parent.addLayers([shape]);
// // console.log(selectedLayers.layers[0].parent)
// context.document.currentPage().currentArtboard().addLayers([shape])
// log(context.document)
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"]))

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onStartup'] = __skpm_run.bind(this, 'onStartup');
that['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
that['onSupplyHotelName'] = __skpm_run.bind(this, 'onSupplyHotelName');
that['onSupplyAddress'] = __skpm_run.bind(this, 'onSupplyAddress');
that['onSupplyCountry'] = __skpm_run.bind(this, 'onSupplyCountry');
that['onSupplyHeroImage'] = __skpm_run.bind(this, 'onSupplyHeroImage');
that['onSupplyRoomImage'] = __skpm_run.bind(this, 'onSupplyRoomImage');
that['onSupplyFacilityImage'] = __skpm_run.bind(this, 'onSupplyFacilityImage');
that['onRun'] = __skpm_run.bind(this, 'default');
that['openPanel'] = __skpm_run.bind(this, 'openPanel');
that['onSelectionChange'] = __skpm_run.bind(this, 'onSelectionChange');
that['commandTextAddressShort'] = __skpm_run.bind(this, 'commandTextAddressShort');
that['commandTextAddressMedium'] = __skpm_run.bind(this, 'commandTextAddressMedium');
that['commandTextAddressLong'] = __skpm_run.bind(this, 'commandTextAddressLong');
that['commandTextAirportShort'] = __skpm_run.bind(this, 'commandTextAirportShort');
that['commandTextAirportMedium'] = __skpm_run.bind(this, 'commandTextAirportMedium');
that['commandTextAirportLong'] = __skpm_run.bind(this, 'commandTextAirportLong');
that['commandTextCityShort'] = __skpm_run.bind(this, 'commandTextCityShort');
that['commandTextCityMedium'] = __skpm_run.bind(this, 'commandTextCityMedium');
that['commandTextCityLong'] = __skpm_run.bind(this, 'commandTextCityLong');
that['commandTextCountryShort'] = __skpm_run.bind(this, 'commandTextCountryShort');
that['commandTextCountryMedium'] = __skpm_run.bind(this, 'commandTextCountryMedium');
that['commandTextCountryLong'] = __skpm_run.bind(this, 'commandTextCountryLong');
that['commandTextPropertyShort'] = __skpm_run.bind(this, 'commandTextPropertyShort');
that['commandTextPropertyMedium'] = __skpm_run.bind(this, 'commandTextPropertyMedium');
that['commandTextPropertyLong'] = __skpm_run.bind(this, 'commandTextPropertyLong');
that['commandTextWeatherShort'] = __skpm_run.bind(this, 'commandTextWeatherShort');
that['commandTextWeatherMedium'] = __skpm_run.bind(this, 'commandTextWeatherMedium');
that['commandTextWeatherLong'] = __skpm_run.bind(this, 'commandTextWeatherLong');
that['commandTextCurrencyShort'] = __skpm_run.bind(this, 'commandTextCurrencyShort');
that['commandTextCurrencyMedium'] = __skpm_run.bind(this, 'commandTextCurrencyMedium');
that['commandTextCurrencyLong'] = __skpm_run.bind(this, 'commandTextCurrencyLong');
that['commandTextTimestampShort'] = __skpm_run.bind(this, 'commandTextTimestampShort');
that['commandTextTimestampMedium'] = __skpm_run.bind(this, 'commandTextTimestampMedium');
that['commandTextTimestampLong'] = __skpm_run.bind(this, 'commandTextTimestampLong');
that['commandTextNameShort'] = __skpm_run.bind(this, 'commandTextNameShort');
that['commandTextNameMedium'] = __skpm_run.bind(this, 'commandTextNameMedium');
that['commandTextNameLong'] = __skpm_run.bind(this, 'commandTextNameLong');
that['commandImagePropertyHero'] = __skpm_run.bind(this, 'commandImagePropertyHero');
that['commandImagePropertyRoom'] = __skpm_run.bind(this, 'commandImagePropertyRoom');
that['commandImagePropertyFacilities'] = __skpm_run.bind(this, 'commandImagePropertyFacilities')

//# sourceMappingURL=command.js.map