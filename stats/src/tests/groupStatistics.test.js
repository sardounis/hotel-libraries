const { groupStatistics, resolutions, KPI } = require('../groupStatistics');
const {
	validMockedData, validFewData, mockedResultTest04HOUR, mockedResultTest04DAY, mockedResultTest04WEEK, mockedResultTest04MONTH,
	mockedResultTest04YEAR, mockedResultTest05DAY, mockedResultTest05WEEK, mockedResultTest05MONTH,
	mockedResultTest05YEAR, mockedResultTest1Hour, mockedResultTest1Day, mockedResultTest1Month,
	mockedResultTest1Week, mockedResultTest1Year, mockedResultTest2Hour, mockedResultTest2Day,
	mockedResultTest2Month, mockedResultTest2Week, mockedResultTest2Year, mockedResultTest3Hour,
	mockedResultTest3Day, mockedResultTest3Month, mockedResultTest3Year, mockedResultTest3Week,
} = require('./testData');

// valid
const validDate = new Date('2018-02-12T15:45:00').getTime();
const validSameDay = new Date('2018-02-12T16:45:00').getTime();
const validSameMonth = new Date('2018-02-14T10:45:00').getTime();
const validSameYear = new Date('2018-04-12T16:45:00').getTime();
const validDiffYear = new Date('2019-04-12T16:45:00').getTime();

// invalid
const negTimestamp = -validSameDay;
const invalidTypeOfTimestamp = 'invalid';
const notTimestamp = 12345;
const invalidKpi = 'kpi is wrong';
const invalidResolution = 'invalid';
const valid2018 = new Date('2018-02-12T15:45:00');
const valid2019 = new Date('2019-02-12T15:45:00');

//args for test 0
const undefinedGroupStats = {
	statsObject:undefined, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.DAY
}

const nullGroupStats = {
	statsObject:null, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.DAY
}

//args for test 1
const hourArgs1 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.HOUR
}
const dayArgs1 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.DAY
}
const weekArgs1 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.WEEK
}
const monthArgs1 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.MONTH
}
const yearArgs1 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.YEAR
}

//args for test 2
const hourArgs2 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameDay, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.HOUR
}
const dayArgs2 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameDay, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.DAY
}
const weekArgs2 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameDay, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.WEEK
}
const monthArgs2 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameDay, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.MONTH
}
const yearArgs2 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameDay, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}

//args for test 3
const hourArgs3 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameMonth, 
	kpi:KPI.RIDES_COMPLETED, 
	resolution:resolutions.HOUR
}
const dayArgs3 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameMonth, 
	kpi:KPI.RIDES_COMPLETED, 
	resolution:resolutions.DAY
}
const weekArgs3 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameMonth, 
	kpi:KPI.RIDES_COMPLETED, 
	resolution:resolutions.WEEK
}
const monthArgs3 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameMonth, 
	kpi:KPI.RIDES_COMPLETED, 
	resolution:resolutions.MONTH
}
const yearArgs3 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameMonth, 
	kpi:KPI.RIDES_COMPLETED, 
	resolution:resolutions.YEAR
}

//args for test 4
const hourArgs4 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameYear, 
	kpi:KPI.GMV, 
	resolution:resolutions.HOUR
}
const dayArgs4 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameYear, 
	kpi:KPI.GMV, 
	resolution:resolutions.DAY
}
const weekArgs4 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameYear, 
	kpi:KPI.GMV, 
	resolution:resolutions.WEEK
}
const monthArgs4 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameYear, 
	kpi:KPI.GMV, 
	resolution:resolutions.MONTH
}
const yearArgs4 = {
	statsObject:validMockedData, 
	startTimestamp:validDate, 
	endTimestamp:validSameYear, 
	kpi:KPI.GMV, 
	resolution:resolutions.YEAR
}

//args for test 5
const dayArgs5 = {
	statsObject:validFewData, 
	startTimestamp:validDate, 
	endTimestamp:validDiffYear, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.DAY
}
const weekArgs5 = {
	statsObject:validFewData, 
	startTimestamp:validDate, 
	endTimestamp:validDiffYear, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.WEEK
}
const monthArgs5 = {
	statsObject:validFewData, 
	startTimestamp:validDate, 
	endTimestamp:validDiffYear, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.MONTH
}
const yearArgs5 = {
	statsObject:validFewData, 
	startTimestamp:validDate, 
	endTimestamp:validDiffYear, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}

//args for test 6
const wrongDateOrderArgs = {
	statsObject:validMockedData, 
	startTimestamp:valid2019, 
	endTimestamp:valid2018, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}
//test 7
const wrongResolutionArgs = {
	statsObject:validMockedData, 
	startTimestamp:valid2019, 
	endTimestamp:valid2019, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:invalidResolution
}

const nullResolutionArgs = {
	statsObject:validMockedData, 
	startTimestamp:valid2019, 
	endTimestamp:valid2019, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:null
}

//test 8 
const wrongKpiArgs = {
	statsObject:validMockedData, 
	startTimestamp:valid2019, 
	endTimestamp:valid2019, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:invalidKpi
}

const nullKpiArgs = {
	statsObject:validMockedData, 
	startTimestamp:valid2019, 
	endTimestamp:valid2019, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:null
}

//test 9
const missingTimestampArgs1 = {
	statsObject:validFewData, 
	startTimestamp:null, 
	endTimestamp:validDiffYear, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}

const missingTimestampArgs2 = {
	statsObject:validFewData, 
	startTimestamp:validDiffYear, 
	endTimestamp:null, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}

const missingTimestampArgs3 = {
	statsObject:validFewData, 
	startTimestamp:null, 
	endTimestamp:null, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}

//test 10
const invalidTypeTimestampsArgs = {
	statsObject:validFewData, 
	startTimestamp:invalidTypeOfTimestamp, 
	endTimestamp:invalidTypeOfTimestamp, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}


const negTimestampsArgs = {
	statsObject:validFewData, 
	startTimestamp:negTimestamp, 
	endTimestamp:negTimestamp, 
	kpi:KPI.RIDES_CANCELLED, 
	resolution:resolutions.YEAR
}


// test are to check if getRideDistance function
describe('groupStats Test:', () => {
	test('test -0  groupStats is undefined or null should throw an error', () => {
		expect.assertions(2);
		expect(() => groupStatistics(undefinedGroupStats)).toThrow(Error);
		expect(() => groupStatistics(nullGroupStats, validDate, validDate, KPI.GMV, resolutions.DAY)).toThrow(Error);
	});


	test('test - 1: groupStats with valid data,same hour in start/end timestamps for every resolution', () => {
		expect.assertions(5);
		expect(groupStatistics(hourArgs1)).toEqual(mockedResultTest1Hour);
		expect(groupStatistics(dayArgs1)).toEqual(mockedResultTest1Day);
		expect(groupStatistics(monthArgs1)).toEqual(mockedResultTest1Month);
		expect(groupStatistics(weekArgs1)).toEqual(mockedResultTest1Week);
		expect(groupStatistics(yearArgs1)).toEqual(mockedResultTest1Year);
	});

	test('test - 2: groupStats with valid data,same day in start/end timestamps for every resolution', () => {
		expect.assertions(5);
		expect(groupStatistics(hourArgs2)).toEqual(mockedResultTest2Hour);
		expect(groupStatistics(dayArgs2)).toEqual(mockedResultTest2Day);
		expect(groupStatistics(monthArgs2)).toEqual(mockedResultTest2Month);
		expect(groupStatistics(weekArgs2)).toEqual(mockedResultTest2Week);
		expect(groupStatistics(yearArgs2)).toEqual(mockedResultTest2Year);
	});


	test('test - 3: groupStats with valid data,same month in start/end timestamps for every resolution', () => {
		expect.assertions(5);
		expect(groupStatistics(hourArgs3)).toEqual(mockedResultTest3Hour);
		expect(groupStatistics(dayArgs3)).toEqual(mockedResultTest3Day);
		expect(groupStatistics(monthArgs3)).toEqual(mockedResultTest3Month);
		expect(groupStatistics(weekArgs3)).toEqual(mockedResultTest3Week);
		expect(groupStatistics(yearArgs3)).toEqual(mockedResultTest3Year);
	});

	test('test - 4: groupStats from a given validMockedData with valid data,resolution and same year and diff months in start/end timestamps', () => {
		expect.assertions(5);
		expect(groupStatistics(hourArgs4)).toEqual(mockedResultTest04HOUR);
		expect(groupStatistics(dayArgs4)).toEqual(mockedResultTest04DAY);
		expect(groupStatistics(weekArgs4)).toEqual(mockedResultTest04WEEK);
		expect(groupStatistics(monthArgs4)).toEqual(mockedResultTest04MONTH);
		expect(groupStatistics(yearArgs4)).toEqual(mockedResultTest04YEAR);
	});

	test('test - 5: groupStats from a given validMockedData with valid data,resolution and diff year (previous and this year) in start/end timestamps', () => {
		expect.assertions(4);
		expect(groupStatistics(dayArgs5)).toEqual(mockedResultTest05DAY);
		expect(groupStatistics(weekArgs5)).toEqual(mockedResultTest05WEEK);
		expect(groupStatistics(monthArgs5)).toEqual(mockedResultTest05MONTH);
		expect(groupStatistics(yearArgs5)).toEqual(mockedResultTest05YEAR);
	});

	test('test -6 timestamps with wrong order should throw an error', () => {
		expect.assertions(1);
		expect(() => groupStatistics(wrongDateOrderArgs)).toThrow(Error);
	});

	test('test -7  ivalid resolution should throw an error', () => {
		expect.assertions(2);
		expect(() => groupStatistics(wrongResolutionArgs)).toThrow(Error);
		expect(() => groupStatistics(nullResolutionArgs)).toThrow(Error);
	});

	test('test -8  ivalid kpi should throw an error', () => {
		expect.assertions(2);
		expect(() => groupStatistics(nullKpiArgs)).toThrow(Error);
		expect(() => groupStatistics(wrongKpiArgs)).toThrow(Error);
	});

	test('test -9  missing starting/emding timestamps should throw an error', () => {
		expect.assertions(3);
		expect(() => groupStatistics(missingTimestampArgs1)).toThrow(Error);
		expect(() => groupStatistics(missingTimestampArgs2)).toThrow(Error);
		expect(() => groupStatistics(missingTimestampArgs3)).toThrow(Error);
	});


	test('test -10  invalid starting/ending type or negativetimestamps should throw an error', () => {
		expect.assertions(2);
		//invalidType
		expect(() => groupStatistics(invalidTypeTimestampsArgs)).toThrow(Error);
		//negative timestamp
		expect(() => groupStatistics(negTimestampsArgs)).toThrow(Error);
	});
});

