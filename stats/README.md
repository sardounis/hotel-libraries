# Install

```
$ npm install @sardounis/stats
```
or
```
$ yarn add @sardounis/stats
```

# Usage

```
const getStats = require("@sardounis/stats");

const validMockedData = {
	y2018: {
		m2: {
			d12: {
				h15: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					revenueSum: 258.47,
				},
				h16: {
					CancelledCounter: 4,
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
			d13: {
				h10: {
					CancelledCounter: 3,
					CompletedCounter: 2,
					revenueSum: 8.47,
				},
				h17: {
					CancelledCounter: 1,
				},
			},
			d14: {
				h18: {
					CancelledCounter: 9,
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
			d15: {
				h12: {
					CancelledCounter: 2,
				},
				h13: {
					UnfulfilledCounter: 1,
				},
				h14: {
					CancelledCounter: 2,
				},
				h15: {
					CancelledCounter: 7,
					CompletedCounter: 11,
					revenueSum: 57.76,
				},
				h16: {
					CancelledCounter: 5,
					CompletedCounter: 7,
					UnfulfilledCounter: 5,
					revenueSum: 500020.81,
				},
				h17: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					UnfulfilledCounter: 3,
					revenueSum: 10.41,
				},
				h7: {
					CancelledCounter: 8,
				},
				h8: {
					CancelledCounter: 7,
				},
				h9: {
					CancelledCounter: 2,
				},
			},
			d18: {
				h14: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					UnfulfilledCounter: 10,
					revenueSum: 12.94,
				},
				h15: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					UnfulfilledCounter: 1,
					revenueSum: 14.94,
				},
				h17: {
					CancelledCounter: 4,
					UnfulfilledCounter: 1,
				},
			},
			d19: {
				h14: {
					CancelledCounter: 3,
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
			d25: {
				h16: {
					CancelledCounter: 4,
					CompletedCounter: 1,
					revenueSum: 6,
				},
			},
			d27: {
				h13: {
					CancelledCounter: 1,
				},
				h14: {
					CancelledCounter: 1,
				},
			},
			d28: {
				h16: {
					CancelledCounter: 1,
				},
				h17: {
					CompletedCounter: 2,
					revenueSum: 6.94,
				},
			},
			d7: {
				h11: {
					CancelledCounter: 2,
					CompletedCounter: 9,
					revenueSum: 336.41,
				},
				h12: {
					CancelledCounter: 1,
					CompletedCounter: 5,
					revenueSum: 50,
				},
				h13: {
					CompletedCounter: 5,
					revenueSum: 50,
				},
				h14: {
					CompletedCounter: 9,
					revenueSum: 90,
				},
				h15: {
					CancelledCounter: 2,
					CompletedCounter: 4,
					revenueSum: 40,
				},
				h16: {
					CompletedCounter: 2,
					revenueSum: 20,
				},
			},
			d8: {
				h11: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					revenueSum: 10.41,
				},
				h12: {
					CompletedCounter: 1,
					revenueSum: 6,
				},
				h15: {
					CompletedCounter: 4,
					revenueSum: 70.41,
				},
				h16: {
					CancelledCounter: 4,
				},
				h18: {
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
		},
		m3: {
			d12: {
				h15: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					revenueSum: 258.47,
				},
				h16: {
					CancelledCounter: 4,
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
			d13: {
				h10: {
					CancelledCounter: 3,
					CompletedCounter: 2,
					revenueSum: 8.47,
				},
			},
		},
	},
	y2019: {
		m3: {
			d12: {
				h15: {
					CancelledCounter: 1,
					CompletedCounter: 3,
					revenueSum: 258.47,
				},
				h16: {
					CancelledCounter: 4,
					CompletedCounter: 1,
					revenueSum: 3.47,
				},
			},
			d13: {
				h10: {
					CancelledCounter: 3,
					CompletedCounter: 2,
					revenueSum: 8.47,
				},
			},
		},
	},
};
const startingDate = new Date('2018-02-10T15:45:00');
const endingDate = new Date('2018-02-12T15:45:00');
```

In order to run you need to have an object like this:
```
const args = {
	statsObject:validMockedData, 
	startTimestamp:startingDate, 
	endTimestamp:endingDate, 
	kpi:KPI.GMV, 
	resolution:resolutions.HOUR
}

let result = groupStatistics(args);
console.log(result);
//y2018: {
//		m2: {
//			d12: {
//				h15: {
//					revenueSum: 258.47,
//				},
//			},
//		},
//	}

```
### Data used to groupStatistics function

Kpi options are one of the following values:
* GMV
* RIDES_COMPLETED
* RIDES_CANCELLED

Resolution options are one of the following values:
* YEAR
* MONTH
* WEEK
* DAY
* HOUR