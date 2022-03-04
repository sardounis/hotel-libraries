"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
		distanceTotalKm: distanceSingleKm + distanceDoubleKm,
	};

	return distances;
};

module.exports = {
	getRideDistance: getRideDistance,
	getDistanceFromLatLonInKm: getDistanceFromLatLonInKm,
};