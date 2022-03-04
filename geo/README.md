### getRideDistance: Gets a ride Object with latitudes, longitudes and returns the total distance in km.

# Install

```
$ npm install @sardounis/geo
```
or
```
$ yarn add @sardounis/geo
```

# Usage

## getDestination

```
const { getRideDistance } = require("@sardounis/geo");

rideDetails = {
	"1553975075880": {
	  "accuracy": 15.080751419067383,
	  "heading": 52.33772277832031,
	  "latitude": 37.963367633154164,
	  "longitude": 23.722526298787404,
	  "speed": 6.180961608886719
	},
	"1553975130608": {
	  "accuracy": 4.900000095367432,
	  "heading": 130.42340087890625,
	  "latitude": 37.964163783535504,
	  "longitude": 23.723863186483126,
	  "speed": 0
	},
	"1553975187680": {
	  "accuracy": 4.900000095367432,
	  "heading": 80.70649719238281,
	  "latitude": 37.96529748280323,
	  "longitude": 23.725764682563828
	}
}

rideDetailsWrongKeys = {
	"1553975075880": {
	  "accuracy": 15.080751419067383,
	  "heading": 52.33772277832031,
	  "speed": 6.180961608886719
	},
	"1553975130608": {
	  "accuracy": 4.900000095367432,
	  "heading": 130.42340087890625,
	  "Latitude": 37.964163783535504, // needs to be in lowercase
	  "wrongLongitude": 23.723863186483126,
	  "speed": 0
	}
}

rideDetailsWrongValues = {
	"1553975075880": {
	  "accuracy": 15.080751419067383,
	  "heading": 52.33772277832031,
	  "latitude": "notNumber",
	  "longitude": 23.722526298787404,
	  "speed": 6.180961608886719
	},
	"1553975130608": {
	  "accuracy": 4.900000095367432,
	  "heading": "130.42340087890625", // string, not a number
	  "latitude": 37.964163783535504,
	  "longitude": 23.723863186483126,
	  "speed": 0
	}
}

result = getRideDistance(rideDetails);
console.log(result);
// => {
      distanceSingleKm: 0,
      distanceDoubleKm: 0.3558715732059,
      distanceTotalKm: 0.3558715732059
    }
// result values are in km

result = getRideDistance(123);
console.log(result);
// => 0

result = getRideDistance(rideDetailsWrongKeys);
console.log(result);
// => Wrong key name of input. There are no latitude, longitude as keys.

result = getRideDistance(rideDetailsWrongValues);
console.log(result);
// => Wrong values of keys latitude, longitude. Their values need to be numbers.
```
