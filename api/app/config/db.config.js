const dbCred = require('../../../credDB.json');
let mong_cred = '';
let mong_cred_tail = '';

if (dbCred.USE_CRED) {
   mong_cred = `${dbCred.ADMIN_USER}:${dbCred.ADMIN_PASS}@`;
   mong_cred_tail = '?tls=true&authSource=admin';
}

module.exports = {
    jsonsets_url: `mongodb+srv://${mong_cred}${dbCred.DB_PATH}/jsonsets${mong_cred_tail}`
};