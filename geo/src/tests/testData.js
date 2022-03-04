const rideDetails = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.963367633154164,
		'longitude': 23.722526298787404,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.964163783535504,
		'longitude': 23.723863186483126,
		'speed': 0,
	},
	'1553975187680': {
		'accuracy': 4.900000095367432,
		'heading': 80.70649719238281,
		'latitude': 37.96529748280323,
		'longitude': 23.725764682563828,
	},
};

const rideDetailsTwoPoints = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.963367633154164,
		'longitude': 23.722526298787404,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.964163783535504,
		'longitude': 23.723863186483126,
		'speed': 0,
	},
};

const rideDetailsWrongLatKey = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'wrongLatitude': 37.964163783535504, // needs to be latitude
		'longitude': 23.723863186483126,
		'speed': 0,
	},
};

const rideDetailsWrongLngKey = {
	'1553975075880': {
		'latitude': 37.964163783535504,
		'wrongLongitude': 23.723863186483126, // needs to be in longitude
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.964163783535504, 
		'longitude': 23.723863186483126,
		'speed': 0,
	},
};

const rideDetailsWrongLatValue = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 'notNumber', // string, not a number
		'longitude': 23.722526298787404,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.964163783535504,
		'longitude': 23.723863186483126,
		'speed': 0,
	},
};

const rideDetailsWrongLngValue = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.964163783535504,
		'longitude': 'notNumber', // string, not a numbe
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.964163783535504,
		'longitude': 23.723863186483126,
		'speed': 0,
	},
};

const rideDetailsNoCoordinates = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'speed': 0,
	},
};

const rideDetailsOneSetOfCoordinates = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.964163783535504,
		'longitude': 23.723863186483126,
		'speed': 6.180961608886719,
	},
};

const rideDetailsIdenticalCoordinates = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.963367633154164,
		'longitude': 23.722526298787404,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 37.963367633154164,
		'longitude': 23.722526298787404,
		'speed': 0,
	},
	'1553975187680': {
		'accuracy': 4.900000095367432,
		'heading': 80.70649719238281,
		'latitude': 37.963367633154164,
		'longitude': 23.722526298787404,
	},
};

const rideDetailsNegativeLatLong1 = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': -30.634973,
		'longitude': 122.872330,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': -30.634973,
		'longitude': -122.872330,
		'speed': 0,
	},
};

const rideDetailsNegativeLatLong2 = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 44.389061321549,
		'longitude': -115.658369144245,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 44.389061321549,
		'longitude': -115.659369144245,
		'speed': 0,
	},
};

const rideDetailsWrongLatLong = {
	'1553975075880': {
		'accuracy': 15.080751419067383,
		'heading': 52.33772277832031,
		'latitude': 37.963367633154164,
		'longitude': 220.723863186483126,
		'speed': 6.180961608886719,
	},
	'1553975130608': {
		'accuracy': 4.900000095367432,
		'heading': 130.42340087890625,
		'latitude': 101.964163783535504,
		'longitude': 220.723863186483126,
		'speed': 0,
	},
	'1553975187680': {
		'accuracy': 4.900000095367432,
		'heading': 80.70649719238281,
		'latitude': 37.96529748280323,
		'longitude': 23.725764682563828,
	},
};

const resultRootCoordinates = {	
	"distance": "0.9 km", 
	"duration": "4 mins", 
	"middleCoordinates": [ 23.72831, 37.99034, ],
	"root": [[23.7293, 37.99439,],
		[23.72919, 37.99389,],
		[23.72902, 37.99328,],
		[23.72877, 37.99221,],
		[23.72848, 37.99104,],
		[23.72831, 37.99034,],
		[23.72904, 37.99022,],
		[23.72949, 37.99016,],
		[23.72959, 37.99051,],
		[23.72976, 37.99114,],
		[23.73004, 37.99226,],
		[23.73013, 37.99261,],
		[23.73014, 37.99267,],
		[23.73022, 37.99266,],
		[23.7304, 37.99263,],],
};

const rideDetailsDayNight = {
	"1584739496000" : {
		"accuracy" : 4,
		"heading" : 81.4656982421875,
		"latitude" : 37.977439855510326,
		"longitude" : 23.7553023437444,
		"speed" : 0.008103194646537304,
	},
	"1584741596000" : {
		"accuracy" : 4,
		"heading" : 81.4656982421875,
		"latitude" : 37.97745224957963,
		"longitude" : 23.75530429501392,
		"speed" : 0.02159041166305542,
	},
	"1584748796000" : {
		"accuracy" : 4,
		"heading" : 81.4656982421875,
		"latitude" : 37.977477380387334,
		"longitude" : 23.75526751022354,
		"speed" : 0.010845820419490337,
	},
	"1584748916000" : {
		"accuracy" : 6,
		"heading" : 228.30133056640625,
		"latitude" : 37.97681379392834,
		"longitude" : 23.75444406019572,
		"speed" : 8.777235984802246,
	},
	"1584748976000" : {
		"accuracy" : 8,
		"heading" : 49.09385681152344,
		"latitude" : 37.976595594291254,
		"longitude" : 23.754234124799247,
		"speed" : 10.448753356933594,
	},
	"1584749036000" : {
		"accuracy" : 6,
		"heading" : 82.76677703857422,
		"latitude" : 37.98140855929269,
		"longitude" : 23.7591144608554,
		"speed" : 0,
	},
};


module.exports = {
	rideDetails,
	rideDetailsTwoPoints,
	rideDetailsWrongLatKey,
	rideDetailsWrongLngKey,
	rideDetailsWrongLatValue,
	rideDetailsWrongLngValue,
	rideDetailsNoCoordinates,
	rideDetailsOneSetOfCoordinates,
	rideDetailsIdenticalCoordinates,
	rideDetailsNegativeLatLong1,
	rideDetailsNegativeLatLong2,
	rideDetailsWrongLatLong,
	resultRootCoordinates,
	rideDetailsDayNight,
};