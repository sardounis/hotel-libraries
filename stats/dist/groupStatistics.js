'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var moment = require('moment');
var resolutions = {
	YEAR: 'year',
	MONTH: 'month',
	WEEK: 'week',
	DAY: 'day',
	HOUR: 'hour'
};

var KPI = {
	GMV: 'revenueSum',
	RIDES_COMPLETED: 'CompletedCounter',
	RIDES_CANCELLED: 'CancelledCounter'
};

/**
 * This function returns the number of days a given month has
 * @param {Number} month a number that represents the month e.g 1 for January
 * @param {Number} year a number that represents the year e.g 2019
 */
var daysInMonth = function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
};

/**
 * This function initialize the given result object if doesn't exist with the given missingvalue
 * @param {Object} args , object that includes all the keys, result object and kpi
 */
var initializer = function initializer(result, yearKey, monthKey, dayKey, hourKey, kpi, missingvalue) {

	if (!result[yearKey]) {
		result[yearKey] = {};
	}
	if (!result[yearKey][monthKey] && monthKey != null) {
		result[yearKey][monthKey] = {};
	} else if (monthKey === null && !result[yearKey][kpi]) {
		result[yearKey][kpi] = missingvalue;
	}
	if (monthKey !== null) {
		if (!result[yearKey][monthKey][dayKey] && dayKey !== null) {
			result[yearKey][monthKey][dayKey] = {};
		} else if (dayKey === null && !result[yearKey][monthKey][kpi]) {
			result[yearKey][monthKey][kpi] = missingvalue;
		}

		if (dayKey != null) {
			if (!result[yearKey][monthKey][dayKey][hourKey] && hourKey !== null) {
				result[yearKey][monthKey][dayKey][hourKey] = {};
			} else if (hourKey === null && !result[yearKey][monthKey][dayKey][kpi]) {
				result[yearKey][monthKey][dayKey][kpi] = missingvalue;
			}
			if (hourKey !== null && !result[yearKey][monthKey][dayKey][hourKey][kpi]) {
				result[yearKey][monthKey][dayKey][hourKey][kpi] = missingvalue;
			}
		}
	}
};

/**
 * This function adds kpi data based on resolution.
 * @param {String} kpi e.g GMV, RIDES_COMPLETED, RIDES_CANCELLED
 * @param {Object} rides data of statistics as exist in firebase
 * @param {Object} result object that includes the kpis based on the resolution given in the inputs
 * @param {String} yearKey e.g y2019 as it is in firebase
 * @param {String} monthKey e.g m1
 * @param {String} dayKey e.g d1
 * @param {String} hourKey e.g h0
 */
var addKPIBasedOnResolution = function addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolution) {

	var validYear = rides[yearKey];

	if (validYear) {
		var validMonth = rides[yearKey][monthKey];
		if (validMonth) {
			var validDay = rides[yearKey][monthKey][dayKey];
			if (validDay) {
				var validHour = rides[yearKey][monthKey][dayKey][hourKey];
				if (validHour) {
					if (validHour[kpi]) {
						if (resolution === resolutions.YEAR) {
							result[yearKey][kpi] += validHour[kpi];
							result[yearKey][kpi] = parseFloat(result[yearKey][kpi].toFixed(2));
						} else if (resolution === resolutions.MONTH) {
							result[yearKey][monthKey][kpi] += validHour[kpi];
							result[yearKey][monthKey][kpi] = parseFloat(result[yearKey][monthKey][kpi].toFixed(2));
						} else if (resolution === resolutions.WEEK) {
							result[yearKey][isoWeekKey][kpi] += validHour[kpi];
							result[yearKey][isoWeekKey][kpi] = parseFloat(result[yearKey][isoWeekKey][kpi].toFixed(2));
						} else if (resolution === resolutions.DAY) {
							result[yearKey][monthKey][dayKey][kpi] += validHour[kpi];
							result[yearKey][monthKey][dayKey][kpi] = parseFloat(result[yearKey][monthKey][dayKey][kpi].toFixed(2));
						} else if (resolution === resolutions.HOUR) {
							result[yearKey][monthKey][dayKey][hourKey][kpi] = validHour[kpi];
							result[yearKey][monthKey][dayKey][hourKey][kpi] = parseFloat(result[yearKey][monthKey][dayKey][hourKey][kpi].toFixed(2));
						}
					}
				}
			}
		}
	}
};

/**
 * This function calculates a kpi (e.g GMV) based on a given resolution (e.g YEAR) and returns
 * an object in the form of result = { "2018": {"revenueSum" : 20}, "2019": {"revenueSum" : 10}}
 * @param {Object} rides data of statistics as exist in firebase
 * @param {Number} year e.g 2019
 * @param {Number} month e.g 1 that stands for January
 * @param {Number} day number from 1 to 31 depending on the month the day is referred to
 * @param {Number} hour number from 0 to 23 that represents an hour of the day
 * @param {Object} result object that includes the kpis based on the resolution given in the inputs
 * @param {String} kpi e.g GMV, RIDES_COMPLETED, RIDES_CANCELLED
 * @param {String} resolution e.g YEAR, MONTH, WEEK, DAY
 * @param {*} missingValue if data doesn't exist replace the missing value in result object
 * 							with missingvalues's
 */
var calculateKpi = function calculateKpi(rides, year, month, day, hour, result, kpi, resolution, missingValue) {
	//const { rides, year, month, day, hour, result, kpi, resolution } = args;
	var yearKey = 'y' + year;
	var monthKey = 'm' + month;
	var dayKey = 'd' + day;
	var hourKey = 'h' + hour;

	var isoWeekKey = moment(year + '-' + month + '-' + day, 'YYYYMMDD').isoWeek();
	isoWeekKey = 'IsoWeek' + isoWeekKey;

	switch (resolution) {
		case 'year':
			initializer(result, yearKey, null, null, null, kpi, missingValue);
			addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolutions.YEAR);
			break;
		case 'month':
			initializer(result, yearKey, monthKey, null, null, kpi, missingValue);
			addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolutions.MONTH);
			break;
		case 'day':
			initializer(result, yearKey, monthKey, dayKey, null, kpi, missingValue);
			addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolutions.DAY);
			break;
		case 'week':
			initializer(result, yearKey, isoWeekKey, null, null, kpi, missingValue);
			addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolutions.WEEK);
			break;
		case 'hour':
			initializer(result, yearKey, monthKey, dayKey, hourKey, kpi, missingValue);
			addKPIBasedOnResolution(kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolutions.HOUR);
			break;
		default:
			throw Error('Invalid resolution input!');
	}
	return result;
};

/**
 * This function parse days of a given month and returns the hours that are included to given data
 * @param {Object} statsObject data of statistics as exist in firebase
 * @param {Number} year e.g 2019
 * @param {Number} month e.g 1 that stands for January
 * @param {Number} dayStart number from 1 to 31 that is referred to the starting month's day
 * @param {Number} dayEnd number from 1 to 31 that is referred to the ending month's day
 * @param {Number} hourStart number from 0 to 23 that is referred to the starting day's hour
 * @param {Number} hourEnd number from 0 to 23 that is referred to the ending day's hour
 * @param {Object} result object that includes the kpis based on the resolution given in the inputs
 * @param {String} resolution e.g YEAR, MONTH, WEEK, DAY
 * @param {*} missingValue if data doesn't exist replace the missing value in result object
 * 							with missingvalues's
 */
var parseDays = function parseDays(statsObject, year, month, dayStart, dayEnd, hourStart, hourEnd, result, kpi, resolution, missingValue) {

	for (var day = dayStart; day <= dayEnd; day += 1) {
		// if it's the final day take only the hours we want
		if (dayStart === dayEnd) {
			for (var hour = hourStart; hour <= hourEnd; hour += 1) {
				calculateKpi(statsObject, year, month, day, hour, result, kpi, resolution, missingValue);
			}
		} else if (day === dayEnd) {
			for (var _hour = 0; _hour <= hourEnd; _hour += 1) {
				calculateKpi(statsObject, year, month, day, _hour, result, kpi, resolution, missingValue);
			}
		} else if (day === dayStart) {
			for (var _hour2 = hourStart; _hour2 <= 23; _hour2 += 1) {
				calculateKpi(statsObject, year, month, day, _hour2, result, kpi, resolution, missingValue);
			}
		} else {
			for (var _hour3 = 0; _hour3 <= 23; _hour3 += 1) {
				calculateKpi(statsObject, year, month, day, _hour3, result, kpi, resolution, missingValue);
			}
		}
	}
};

var checkIfValidTimestamps = function checkIfValidTimestamps(startTimestamp, endTimestamp) {
	var invalidStartTimestamp = new Date(startTimestamp).getTime() < 0;
	var invalidEndTimestamp = new Date(endTimestamp).getTime() < 0;

	if (!startTimestamp || !endTimestamp) throw Error('startimg or ending timestamps are null/undefined!!');

	if (startTimestamp > endTimestamp) {
		throw Error('Invalid Interval! Starting timestamp is later than ending Timestamp!!');
	}

	if (typeof startTimestamp !== 'number' || typeof endTimestamp !== 'number' || invalidEndTimestamp || invalidStartTimestamp) {
		throw Error("Arguments 'startTimestamp' and 'endTimestamp for groupStatistics must be a number");
	}
};

/**
 * This function gets an object referred to statistics, a starting and an ending timestamp, and
 * gets the hours between these two, and returns an object of kpis referred to these days
 * @param {Object} args includes the following:
 *  statsObject data of statistics as exist in firebase
 *  startTimestamp a timestamp that is referred to the starting day of kpis
 *  endTimstamp a timestamp that is referred to the starting day of kpis
 *  kpi e.g YEAR, MONTH, WEEK, DAY
 *  resolution object that includes the kpis based on the resolution given in the inputs
 *  missingValue if data doesn't exist replace the missing value in result object
 * 	with missingvalues's
 */
var groupStatistics = function groupStatistics(args) {
	var missingValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var statsObject = args.statsObject,
	    startTimestamp = args.startTimestamp,
	    endTimestamp = args.endTimestamp,
	    kpi = args.kpi,
	    resolution = args.resolution;


	if (!statsObject || (typeof statsObject === 'undefined' ? 'undefined' : _typeof(statsObject)) !== 'object') throw new TypeError("Argument 'statsObject' for groupStatistics must be an object");

	if (!kpi || Object.values(KPI).indexOf(kpi) === -1) throw Error("Argument 'kpi' for groupStatistics must be one of the predefined!!");

	if (!resolution || Object.values(resolutions).indexOf(resolution) === -1) throw Error("Argument 'kpi' for groupStatistics must be one of the predefined!!");

	checkIfValidTimestamps(startTimestamp, endTimestamp);

	var monthEnd = moment(endTimestamp).month() + 1;
	var dayEnd = moment(endTimestamp).date();
	var yearEnd = moment(endTimestamp).year();
	var hourEnd = moment(endTimestamp).hour();
	var monthStart = moment(startTimestamp).month() + 1;
	var dayStart = moment(startTimestamp).date();
	var yearStart = moment(startTimestamp).year();
	var hourStart = moment(startTimestamp).hour();
	var result = {};

	for (var year = yearStart; year <= yearEnd; year += 1) {
		if (yearStart === yearEnd) {
			for (var month = monthStart; month <= monthEnd; month += 1) {
				if (monthStart === monthEnd) {
					parseDays(statsObject, year, month, dayStart, dayEnd, hourStart, hourEnd, result, kpi, resolution, missingValue);
				} else if (monthStart < monthEnd) {
					if (month === monthStart) {
						parseDays(statsObject, year, month, dayStart, daysInMonth(month, year), hourStart, 23, result, kpi, resolution, missingValue);
					} else if (month === monthEnd) {
						parseDays(statsObject, year, month, 1, dayEnd, 0, hourEnd, result, kpi, resolution, missingValue);
					} else {
						parseDays(statsObject, year, month, 1, daysInMonth(month, year), 0, 23, result, kpi, resolution, missingValue);
					}
				}
			}
		} else if (year === yearStart) {
			for (var _month = monthStart; _month <= 12; _month += 1) {
				if (_month === monthStart) {
					parseDays(statsObject, year, _month, dayStart, daysInMonth(_month, year), hourStart, 23, result, kpi, resolution, missingValue);
				} else {
					parseDays(statsObject, year, _month, 1, daysInMonth(_month, year), 0, 23, result, kpi, resolution, missingValue);
				}
			}
		} else if (yearEnd === year) {
			for (var _month2 = 1; _month2 <= monthEnd; _month2 += 1) {
				if (_month2 === monthEnd) {
					parseDays(statsObject, year, _month2, 1, dayEnd, 0, hourEnd, result, kpi, resolution, missingValue);
				} else {
					parseDays(statsObject, year, _month2, 1, daysInMonth(_month2, year), 0, 23, result, kpi, resolution, missingValue);
				}
			}
		} else {
			for (var _month3 = 1; _month3 <= 12; _month3 += 1) {
				parseDays(statsObject, year, _month3, 1, daysInMonth(_month3, year), 0, 23, result, kpi, resolution, missingValue);
			}
		}
	}
	return result;
};

/**
 * This function gets us inputs two weeks (propably in row) and returns their first and last days.
 * returns: an array called WeekOnWeek(WoW) with the first and last days of the two given inputs
 */
var getStartAndEndTimestampsOfIsoWeek = function getStartAndEndTimestampsOfIsoWeek(isoweek) {
	week.push(moment().week(isoweek).startOf('isoWeek'));
	// last day of first week's input
	week.push(moment().week(isoweek).endOf('isoWeek').format('YYYY-MM-DD HH:mm'));

	return week;
};

module.exports = {
	groupStatistics: groupStatistics, resolutions: resolutions, KPI: KPI
};