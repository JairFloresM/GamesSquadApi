require('dotenv').config();

const ALGOLIA_APP_ID = process.env.ANGO_APPLICATION_ID;
const ALGOLIA_API_KEY = process.env.ANGO_APP_API_KEY;
const NOMBRE_DEL_INDICE = process.env.ANGO_INDEX_NAME;


const algoliasearch = require('algoliasearch');
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(NOMBRE_DEL_INDICE);



module.exports = index;