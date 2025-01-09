const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZBSjI0WlZhLzFpbHAwcEE0ZW1DbE5vQkI4dGRCbjlpdThoZ09DQWVIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibDVGUzlQYXZmajlBL1JDN2cyNkg4Tkg1dFlTOGExdFdwc2lGNDFpRmZrdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRzNLR2FwUUdCeksrSjNRTHpEanpqRUF1RTJSakVXMjh5WTBHcVJ1bW5BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpV2hXNGVNRWJ4VWpYZzBlTkhPOEcyYzF5V1RXS2tFdlQ0ZTB0WDhhNkRnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCMVpHMXIxd1JTRUxYOHBLZEJqV0pUeUJxbEJrYitMZCtWVlFPR0FzbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9kZFBlUE5wN0VwNCtVTGFYVTZsOC9QYlorbmNSV0hZa1lLalZsS2JpV0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxNUlMxU3hsQWNBcmZBWGhaTC9vM25JUHp3RHovb0ZNQTIzem5yc3FWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibk11YUtRQzBUSmtQUnB4ZWRucG45bStuOWJzM080bGNySnRhVE81QVZoYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVTNlk0YXZvSXIvZDVLUUFOYTBJZ0owUWNkS1FWS3lIYkVYeWtKNEJVczJPaGV0cXpIRVErNm5mZDNuRG9ZK3VsWG1iVGt5bWh0U3VDdXQxR2o3TWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJURktQY3lONnA2UFFSZk5renJXT1EvRm85YmNnSDZWNUZWU0l3akpKMlJVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJwQUlJNmgtdVMyQ1hLX2NsUi1tRXJnIiwicGhvbmVJZCI6IjMwNzExZGI0LTRiZDItNDdkNC05OWZkLTE5YmQzOTI1NWUzYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3cytGRGNQVVR2UmVOd1BpY2VTTTE0M0N4eVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjJXYWFMajBoQlJTalN4OWhDZHRUSk5NdlFNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBYMjJOM01BIiwibWUiOnsiaWQiOiI0MDcyMTUzNDQ2NjozM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSSsraHBJQkVML0VnTHdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQ1BBeWNJWTJxdU9FcWpmNVRWaVNCM2sza21CQ3ByWENIMlA5TU9WMm5obz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiU1ZMZ2QvMllSbi9lNDVCSzBDbG1wdUlMaGpncW5wb2RaNFVZZ2c0NlR6NFU3Q3p5MlJjeHRTbmxuQjFySUFCZDJHMWI4c0xQcDNzeTNFS3FaR1JwREE9PSIsImRldmljZVNpZ25hdHVyZSI6IjhVOEtDMVFNOTBJcG1IWk1pZW5rLy9NbU95aTNROVgyMG5FWGR3b0o3Qzk4R1Nla0Z0SzhQL3JIcFczVWZWMlJCOFUwNGplMXZFY0RjVFdLeUNmR2lBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3MjE1MzQ0NjY6MzNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWp3TW5DR05xcmpoS28zK1UxWWtnZDVONUpnUXFhMXdoOWovVERsZHA0YSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjQ1MDYzNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMelQifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "kiki dmx",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0721534466",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'kiki_md',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
