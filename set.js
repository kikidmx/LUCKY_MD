const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZmTG9KQldhTXhmTzhzWlZmZTR3MmRwMTJpZ3dIa3FxTXRDWk10WVlFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFExYkJzYlZRb2lCOGZpanBxeU8yaDExeW5zQmFJdlhrdHZ0eVRWTVNsQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQUw5MUpWenhodXFBS2hJNGRDdE5Wc3VSdUdaam5ma09Zb2NVenJXczFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhWUorNlZmQXhGQ2ZVV2taNDNpWGhWaDBqcm1GWFlxL1JiaFladHErS3hVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHa1poYWJYM1JHK01IcG9GWnN0enhtYjZLU2RyQU45UkFidDdFc2xmSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF4VUdlbDU1MENGMld1N2NTUVgxZzQ3NVdZalhmZ1JldUlEQmZtY29Ud3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVArQ3dnVndlZTFMZHFkaW91OU9ROC9SV3g0SWFnMUsyci9MdFF6dmJIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUZBT1doS1ZaanVMeGpUekhoalNxRHd4cjR2VkRTVHNKZDJtRTVUVzZsbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN6eHRmbDlUV2k4VFVNY0FuVnF6OW44WndkdEpjRnMvaytIQTdJOGVYUHZkZXFXU3g5SVhYK2RRS0N0Rmo3T2lSN05lM29vRm9BU3ZoSVFyeExtU0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6Ilkza2hCZWo2cGxHRFduU0VXOXh2aDdnTWNnRlJUNnVJNzNtM0kvcVp5SEk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im9JY0tFWDZMVHlxak5UV2pQVmdXeFEiLCJwaG9uZUlkIjoiZjkyNzhhMTYtOTU1Mi00MjgzLTg0M2MtNWU2OGVhZWE1Y2QxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlyZ1praW53em11Nk5meEFENHA4cnhqcEM0dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRYWY0WkQzNlE2bkVySDNNMDBIYW5EK1BhRmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFRaNURBU1oiLCJtZSI6eyJpZCI6IjQwNzIxNTM0NDY2OjI4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJdStocElCRUxiUytyc0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDUEF5Y0lZMnF1T0VxamY1VFZpU0IzazNrbUJDcHJYQ0gyUDlNT1YybmhvPSIsImFjY291bnRTaWduYXR1cmUiOiJESW02bjlOTnBwL0FBNEljbVpKU1QvcmVVd3p3S2pPWGFPZzBhMjNGRTFXdmpDM2JDaHZMQVk0eS8xREpGNm82ZjRQQytZS3lURXAvVjhvUDVrZU5EQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWjJPRWVOeEkzanBVMlcwOVpjbTFDUGtrUHFHVHB5NTRUdjJkRmljUmNsRDRTOGdkOVV6VFNjSDBxSlpMZ3ZMcFROZnR6bnRRQ0F3WTQvOFRrOTkzQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDcyMTUzNDQ2NjoyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRandNbkNHTnFyamhLbzMrVTFZa2dkNU41SmdRcWExd2g5ai9URGxkcDRhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2MzU0MTE3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhCSCJ9',
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


                  
