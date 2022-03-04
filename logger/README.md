# Install

```
$ npm install @sardounis/logger
```
or
```
$ yarn add @sardounis/logger
```

# Usage


```
const {myLogger, setOptions} = require('@sardounis/logger');

module.exports = handler;

const myOpts =  setOptions('logs/combined.log')
let elkLogger = myLogger(myOpts);
elkLogger.error('Error message',"ms-callnow");

```

Note: the first argument for setOptions is the file that info/error logs are stored. The second is only for the errors. 