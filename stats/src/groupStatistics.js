const moment = require('moment');
const resolutions = {
	YEAR: 'year',
	MONTH: 'month',
	WEEK: 'week',
	DAY: 'day',
	HOUR: 'hour',
};

const KPI = {
	GMV: 'revenueSum',
	RIDES_COMPLETED: 'CompletedCounter',
	RIDES_CANCELLED: 'CancelledCounter',
};

/**
 * This function returns the number of days a given month has
 * @param {Number} month a number that represents the month e.g 1 for January
 * @param {Number} year a number that represents the year e.g 2019
 */
const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

/**
 * This function initialize the given result object if doesn't exist with the given missingvalue
 * @param {Object} args , object that includes all the keys, result object and kpi
 */
const initializer = (result, yearKey, monthKey, dayKey, hourKey, kpi, missingvalue) => {

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
const addKPIBasedOnResolution = (kpi, rides, result, yearKey, monthKey, dayKey, hourKey, isoWeekKey, resolution) => {

	const validYear = rides[yearKey];

	if (validYear) {
		const validMonth = rides[yearKey][monthKey];
		if (validMonth) {
			const validDay = rides[yearKey][monthKey][dayKey];
			if (validDay) {
				const validHour = rides[yearKey][monthKey][dayKey][hourKey];
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
const calculateKpi = (rides, year, month, day, hour, result, kpi, resolution, missingValue) => {
	//const { rides, year, month, day, hour, result, kpi, resolution } = args;
	const yearKey = `y${year}`;
	const monthKey = `m${month}`;
	const dayKey = `d${day}`;
	const hourKey = `h${hour}`;

	let isoWeekKey = moment(`${year}-${month}-${day}`, 'YYYYMMDD').isoWeek();
	isoWeekKey = `IsoWeek${isoWeekKey}`;

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
const parseDays = (statsObject, year, month, dayStart, dayEnd, hourStart, hourEnd, result, kpi, resolution, missingValue) => {
	
	for (let day = dayStart; day <= dayEnd; day += 1) {
		// if it's the final day take only the hours we want
		if (dayStart === dayEnd) {
			for (let hour = hourStart; hour <= hourEnd; hour += 1) {
				calculateKpi(statsObject, year, month, day, hour, result, kpi, resolution, missingValue);
			}
		} else if (day === dayEnd) {
			for (let hour = 0; hour <= hourEnd; hour += 1) {
				calculateKpi(statsObject, year, month, day, hour, result, kpi, resolution, missingValue);
			}
		} else if (day === dayStart) {
			for (let hour = hourStart; hour <= 23; hour += 1) {
				calculateKpi(statsObject, year, month, day, hour, result, kpi, resolution, missingValue);
			}
		} else {
			for (let hour = 0; hour <= 23; hour += 1) {
				calculateKpi(statsObject, year, month, day, hour, result, kpi, resolution, missingValue);
			}
		}
	}
};

const checkIfValidTimestamps = (startTimestamp, endTimestamp) => {
	const invalidStartTimestamp = (new Date(startTimestamp)).getTime() < 0;
	const invalidEndTimestamp = (new Date(endTimestamp)).getTime() < 0 ;

	if (!startTimestamp || !endTimestamp) throw Error('startimg or ending timestamps are null/undefined!!');

	if (startTimestamp > endTimestamp) {
		throw Error('Invalid Interval! Starting timestamp is later than ending Timestamp!!');
	}

	if (typeof (startTimestamp) !== 'number' || typeof (endTimestamp) !== 'number' || invalidEndTimestamp || invalidStartTimestamp) {
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
const groupStatistics = (args, missingValue = 0) => {
	let { statsObject, startTimestamp, endTimestamp, kpi, resolution } = args;

	if (!statsObject || typeof (statsObject) !== 'object') throw new TypeError("Argument 'statsObject' for groupStatistics must be an object");

	if (!kpi || Object.values(KPI).indexOf(kpi) === -1) throw Error("Argument 'kpi' for groupStatistics must be one of the predefined!!");

	if (!resolution || Object.values(resolutions).indexOf(resolution) === -1) throw Error("Argument 'kpi' for groupStatistics must be one of the predefined!!");

	checkIfValidTimestamps(startTimestamp, endTimestamp);

	const monthEnd = moment(endTimestamp).month() + 1;
	const dayEnd = moment(endTimestamp).date();
	const yearEnd = moment(endTimestamp).year();
	const hourEnd = moment(endTimestamp).hour();
	const monthStart = moment(startTimestamp).month() + 1;
	const dayStart = moment(startTimestamp).date();
	const yearStart = moment(startTimestamp).year();
	const hourStart = moment(startTimestamp).hour();
	const result = {};

	for (let year = yearStart; year <= yearEnd; year += 1) {
		if (yearStart === yearEnd) {
			for (let month = monthStart; month <= monthEnd; month += 1) {
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
			for (let month = monthStart; month <= 12; month += 1) {
				if (month === monthStart) {
					parseDays(statsObject, year, month, dayStart, daysInMonth(month, year), hourStart, 23, result, kpi, resolution, missingValue);
				} else {
					parseDays(statsObject, year, month, 1, daysInMonth(month, year), 0, 23, result, kpi, resolution, missingValue);
				}
			}
		} else if (yearEnd === year) {
			for (let month = 1; month <= monthEnd; month += 1) {
				if (month === monthEnd) {
					parseDays(statsObject, year, month, 1, dayEnd, 0, hourEnd, result, kpi, resolution, missingValue);
				} else {
					parseDays(statsObject, year, month, 1, daysInMonth(month, year), 0, 23, result, kpi, resolution, missingValue);
				}
			}
		} else {
			for (let month = 1; month <= 12; month += 1) {
				parseDays(statsObject, year, month, 1, daysInMonth(month, year), 0, 23, result, kpi, resolution, missingValue);
			}
		}
	}
	return result;
};

/**
 * This function gets us inputs two weeks (propably in row) and returns their first and last days.
 * returns: an array called WeekOnWeek(WoW) with the first and last days of the two given inputs
 */
const getStartAndEndTimestampsOfIsoWeek = (isoweek) => {
	week.push(
		moment()
			.week(isoweek)
			.startOf('isoWeek'),
	);
	// last day of first week's input
	week.push(
		moment()
			.week(isoweek)
			.endOf('isoWeek')
			.format('YYYY-MM-DD HH:mm'),
	);

	return week;
};

module.exports = {
	groupStatistics, resolutions, KPI,
};
