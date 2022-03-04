//NOTE: To run the tests comment presets
// "presets": [
//     "es2015",
//     "stage-2"
// ]
const fs = require('fs');

const { myLogger, setOptions} = require('../winston');

describe('Storing logs in file', ()=>{

    it('should store logs to combined file', (done) => {
        const myOpts =  setOptions('logs/combined.log','logs/error.log')
        let elkLogger = myLogger(myOpts);
        const msg = 'logging 2';
    
        elkLogger.error(msg,"ms-callnow");
        const log = JSON.stringify({"service":"user-service","level":"error","message":msg});
        console.log('log', log);
    
        setTimeout(()=>{
            var contents = fs.readFileSync('./logs/combined.log', 'utf8');
            console.log('contents', contents);
            expect(contents.trim()).toEqual(log);
            done();
        },1000)
     
    })


    it('should store error logs to both error and combined files', (done) => {
        const myOpts =  setOptions('logs/combined.log','logs/error.log')
        let elkLogger = myLogger(myOpts);
        const msg = 'logging 2';
    
        elkLogger.error(msg,"ms-callnow");
        const log = JSON.stringify({"service":"user-service","level":"error","message":msg});
    
        setTimeout(() => {
            var contents = fs.readFileSync('./logs/combined.log', 'utf8');
            var errorContents = fs.readFileSync('./logs/error.log', 'utf8');
            expect(contents.trim()).toEqual(log);
            expect(errorContents.trim()).toEqual(log);
            done();
        },1000)
    
    })

    
    afterEach(()=> {
        filenameCombined = './logs/combined.log';
        filenameError = './logs/error.log';
        fs.truncateSync(filenameCombined, 0)
        fs.truncateSync(filenameError, 0)
    })
})



    