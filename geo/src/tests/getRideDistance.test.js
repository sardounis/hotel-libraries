/* eslint-disable no-undef */
const { getRideDistance, getDistanceFromLatLonInKm, } = require('../getRideDistance');
const { rideDetails, rideDetailsTwoPoints, rideDetailsWrongLatKey,
	rideDetailsWrongLngKey, rideDetailsWrongLatValue, rideDetailsWrongLngValue,
	rideDetailsNoCoordinates, rideDetailsOneSetOfCoordinates, rideDetailsIdenticalCoordinates,
	rideDetailsNegativeLatLong1, rideDetailsNegativeLatLong2, rideDetailsWrongLatLong, 
	rideDetailsDayNight, } = require('./testData');
		
// test are to check if getRideDistance function
describe('getRideDistance Test:', () => {
	test('test - 0: getRideDistance from a given ride, right input (Object in right format)', () => {
		expect.assertions(1);
		const firtsResult = getDistanceFromLatLonInKm(37.963367633154164, 23.722526298787404,
			37.964163783535504, 23.723863186483126);
		const secondResult = getDistanceFromLatLonInKm(37.964163783535504, 23.723863186483126,
			37.96529748280323, 23.725764682563828);
		const result = firtsResult + secondResult;
		expect(getRideDistance(rideDetails).distanceTotalKm).toBe(result);
	});

	test('test - 1: getRideDistance from a given ride, wrong input (number)', () => {
		expect.assertions(4);
		expect(() => getRideDistance(123)).toThrow(TypeError);
		expect(() => getRideDistance(null)).toThrow(TypeError);
		expect(() => getRideDistance(undefined)).toThrow(TypeError);
		expect(() => getRideDistance('123')).toThrow(TypeError);
	});

	test(`test - 2: getRideDistance from a given ride, wrong input 
		(Object in wrong format - not the expected keys)`, () => {
		expect.assertions(2);
		expect(() => getRideDistance(rideDetailsWrongLatKey)).toThrow(Error);
		expect(() => getRideDistance(rideDetailsWrongLngKey)).toThrow(Error);
	});

	test(`test - 3: getRideDistance from a given ride, wrong input 
		(Object in wrong format - not the expected values)`, () => {
		expect.assertions(2);
		expect(() => getRideDistance(rideDetailsWrongLatValue)).toThrow(TypeError);
		expect(() => getRideDistance(rideDetailsWrongLngValue)).toThrow(TypeError);
	});

	test('test - 4: getRideDistance from a given ride, wrong input (undefined)', () => {
		expect.assertions(1);
		expect(() => getRideDistance(undefined)).toThrow(Error);
	});

	test('test - 5: getRideDistance from a given ride, wrong input (no coordinates)', () => {
		expect.assertions(1);
		expect(() => getRideDistance(rideDetailsNoCoordinates)).toThrow(Error);
	});

	test('test - 6: getRideDistance from a given ride, wrong input (one set of coordinates)', () => {
		expect.assertions(1);
		expect(getRideDistance(rideDetailsOneSetOfCoordinates).distanceTotalKm).toBe(0);
	});

	test('test - 7: getRideDistance from a given ride, wrong input (identical coordinates)', () => {
		expect.assertions(1);
		expect(getRideDistance(rideDetailsIdenticalCoordinates).distanceTotalKm).toBe(0);
	});

	test('test - 8: getRideDistance from a given ride, wrong input (invalid coordinates)', () => {
		expect.assertions(1);
		expect(() => getRideDistance(rideDetailsWrongLatLong)).toThrow(Error);
	});

	test('test - 9: getRideDistance from a given ride, wrong input (negative coordinates)', () => {
		expect.assertions(2);
		expect(getRideDistance(rideDetailsNegativeLatLong1).distanceTotalKm).toBe(10290.999849479083);
		expect(getRideDistance(rideDetailsNegativeLatLong2).distanceTotalKm).toBe(0.07946058882625734);
	});

	test('test - 10: getRideDistance from a given ride, wrong input (no inputs)', () => {
		expect.assertions(1);
		expect(() => getRideDistance()).toThrow(Error);
	});

	test('test - 11: getRideDistance from a given ride, wrong input (undefined)', () => {
		expect.assertions(1);
		expect(() => getRideDistance(undefined)).toThrow(TypeError);
	});

	test(`test - 12: getRideDistance from a given ride, with two sets of coordinates should be
		straight line `, () => {
		expect.assertions(1);
		const distance = getDistanceFromLatLonInKm(37.964163783535504, 23.723863186483126,
			37.963367633154164, 23.722526298787404);
		expect(getRideDistance(rideDetailsTwoPoints).distanceTotalKm).toBe(distance);
	});

	test(`test - 13: getRideDistance from a given ride, with two sets of coordinates should be
		straight line `, () => {
		expect.assertions(1);

		const distanceSingleKm = getDistanceFromLatLonInKm(37.97745224957963, 23.75530429501392,
			37.977439855510326, 23.7553023437444);
	
		const distanceDoubleKm = 0.8230527872099798;
		const distanceTotalKm = distanceSingleKm + distanceDoubleKm;

		const distObj = {
			distanceTotalKm,
			distanceSingleKm,
			distanceDoubleKm,
		};
		expect(getRideDistance(rideDetailsDayNight)).toEqual(distObj);
	});
});
