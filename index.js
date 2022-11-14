require('dotenv').config()
const app = require('../backend/src/app');
require('../backend/src/database');

async function  main(){
     await app.listen(app.get('port'))
    console.log('server on port', app.get('port'))
}
main();