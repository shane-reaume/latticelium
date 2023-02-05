const dbCred = require('../../../credDB.json');
let mong_cred = '';
let mong_cred_tail = '';

/**
 * preset for local testing without credentials.
 * you can modify this if you use credentials or have a staging env for example
 */
let jsonsets = 'mongodb://127.0.0.1:27017/jsonsets'

/**
 * when USE_CRED set to true in credDB.json you switch to your production database with credentials
 */
if (dbCred.USE_CRED) {
   mong_cred = `${dbCred.ADMIN_USER}:${dbCred.ADMIN_PASS}@`;
   mong_cred_tail = '?tls=true&authSource=admin';
   jsonsets = `mongodb+srv://${mong_cred}${dbCred.DB_PATH}/jsonsets${mong_cred_tail}`
}

module.exports = {
    jsonsets_url: jsonsets
};