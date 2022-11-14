require('dotenv').config()
const app = require('./src/app');
require('./src/app');

async function  main(){
     await app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
}
main();