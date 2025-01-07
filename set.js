const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNBRm1zNWpSVUxOTjdydi9YWkhNT0JhMGVKNTF0WjNMVjlKWGdmQlVXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXhHVXFuVysrSHE4ZTg2bTROV3l1RU1BRkRhZWNLeVFMVHR4cFdsbGVEMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRHBqU3NiV1p2TWxRZTVTckJPdEtFaDBPOGQ0bEozM3JqTHNmUHNsSFdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTHRLSGN1TDZTWWhGK04xUUJwcVVIZFZlQ3YrdUlNNEVTYWhnQ1pLNWp3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitMTDVNeHQvODZhcjJtNzVMcEFnWWxETnZWOFhHNVNzOFE1SnJaMVhRMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ6UEYyZi9wT1U5SnEyUTRUbDJNbXVPTi9POEdULzFjVTZNdFczTWROakk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia082c3VJMXhnN3loTWZadlRLdUJWajhUdEpnUjlDd2NQcmFBVGt0REEwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXl0d3BGSnYvSlhjTFJzOW1MenFvQ2hFRkU4L0N6d0w2c0NyM0c4UExYOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpmUGh4ZzZjS2R2ZUkwYkVqLzNmZjcvR3JxYWszc2ZwL05CWjFhU3VsbzdTSk0zYU90emFzYTBGbUxTSlkxZ3MrUHlFYktDcnJ0ZEdlRUFRaklSUUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6IkhHSDR4a2FVSldkU0FxUVdTaUxhUmF0R2dEbTNzcU53b0xwbzkwaUE4ZU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFNRVVVejNlUUQ2TVNfY2p5bng5OGciLCJwaG9uZUlkIjoiZGM1ZmZmZGYtNzE4Mi00YjAyLTg4MmYtYmM2ZDJlNWU0OGNkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFoQ2hZM2p2TlJ0U1ZlaHRJZkw2VUVDd3ZnZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsblg0TytuTVJ1M0dhcG16cko1NG84TGgwQ289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1RRUEQ5WjYiLCJtZSI6eyJpZCI6IjQwNzU2NDY5MzI1OjE0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNakZqNllFRUpYVTlyc0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJUV1liRHRPbFNhM2duMVZBa2wrQ2IydVpLNVhLam14MzBmTVlQRlR5L2tnPSIsImFjY291bnRTaWduYXR1cmUiOiJWSEkvUUlnbmFKZ1hlTk9ReWVGUkIvZEliZTFFOTdOY093S0RoejQ3WDlCVk9NclBSNnIvcEk2WE1oZVBhSG11SmNQQjJDNFdvRjlEdUcwcG9xUzVEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ3BhYkczTEI3UlNtcDlOWCs1YzZFZktpTlNsb3BZTHcwTWcrS2NGQWVZYW5md2haNkp2cGg5bmZnUmNQSnM5R0YvUXBzelpEUUk4MG5Ic2JzZUNCQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc1NjQ2OTMyNToxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVMW1HdzdUcFVtdDRKOVZRSkpmZ205cm1TdVZ5bzVzZDlIekdEeFU4djVJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2Mjg4ODAyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURyciJ9 ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "boruto md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0756469325",              
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
    CHATBOT : process.env.PM_CHATBOT || 'no',
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


                  
