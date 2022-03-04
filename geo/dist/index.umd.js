(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["geo"] = factory();
	else
		root["geo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/getRideDistance.js":
/*!********************************!*\
  !*** ./src/getRideDistance.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**
 * Returns the linear distance between two points in Kms
 *
 * @param {Number} lat1
 * @param {Number} lng1
 * @param {Number} lat2
 * @param {Number} lng2
 * @returns {Number}
 */
var getDistanceFromLatLonInKm = function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLng = deg2rad(lng2 - lng1);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
};

/**
 * Helper function that converts degrees to rads
 *
 * @param {Number} deg
 * @returns {Number}
 */
var deg2rad = function deg2rad(deg) {
	return deg * (Math.PI / 180);
};

/**
 * Returns the ride's total distance
 * by summing all the distances between timestamps
 *
 * @param {Object} rideDetails
 * @returns {Array}
 */
var getRideDistance = function getRideDistance(rideDetails) {
	if (!rideDetails || (typeof rideDetails === "undefined" ? "undefined" : _typeof(rideDetails)) !== 'object') throw new TypeError("Argument 'rideDetails' for getRideDistance must be an object");

	var coordinatesSingle = [];
	var coordinatesDouble = [];

	var currentLatLng = [];
	var prevLatLng = [];
	var distanceSingleKm = 0;
	var distanceDoubleKm = 0;

	for (var key in rideDetails) {
		if (!rideDetails[key].latitude) throw Error("Argument 'latitude' must exist");
		if (!rideDetails[key].longitude) throw Error("Argument 'longitude' must exist");
		if (typeof rideDetails[key].latitude !== 'number') throw new TypeError("Value of 'latitude' in rideDetails must be a number");
		if (typeof rideDetails[key].longitude !== 'number') throw new TypeError("Value of 'longitude' in rideDetails must be a number");
		if (!(rideDetails[key].longitude >= -180 && rideDetails[key].longitude <= 180) || !(rideDetails[key].latitude >= -90 && rideDetails[key].latitude <= 90)) {
			throw Error('Wrong coordinates in rideDetails');
		}

		var currentHour = new Date(parseInt(key)).getHours();

		currentLatLng.push(rideDetails[key].latitude, rideDetails[key].longitude);

		// get current lat/lng
		if (currentHour >= 5 && currentHour < 24) {
			coordinatesDouble.push(currentLatLng);
			// check if there are previous rides to compare and compute the speed for every timestamp
			if (prevLatLng[0] && prevLatLng[1]) {
				distanceSingleKm += getDistanceFromLatLonInKm(currentLatLng[0], currentLatLng[1], prevLatLng[0], prevLatLng[1]);
			}
		} else {
			coordinatesSingle.push(currentLatLng);
			if (prevLatLng[0] && prevLatLng[1]) {
				distanceDoubleKm += getDistanceFromLatLonInKm(currentLatLng[0], currentLatLng[1], prevLatLng[0], prevLatLng[1]);
			}
		}

		// get the previous coordinates
		prevLatLng = currentLatLng;
		currentLatLng = [];
	}

	var distances = {
		distanceSingleKm: distanceSingleKm,
		distanceDoubleKm: distanceDoubleKm,
		distanceTotalKm: distanceSingleKm + distanceDoubleKm
	};

	return distances;
};

module.exports = {
	getRideDistance: getRideDistance,
	getDistanceFromLatLonInKm: getDistanceFromLatLonInKm
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! ./getRideDistance */ "./src/getRideDistance.js"),
    getRideDistance = _require.getRideDistance,
    getDistanceFromLatLonInKm = _require.getDistanceFromLatLonInKm;

module.exports = { getRideDistance: getRideDistance, getDistanceFromLatLonInKm: getDistanceFromLatLonInKm };

/***/ })

/******/ });
});
//# sourceMappingURL=index.umd.js.map