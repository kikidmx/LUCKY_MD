const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUtrenpNbVJLK1V1U1QxODhXSlNYWWcrMlVFRFRiUXFYaEtGd3JpakUyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkZmYWNJK2RnNmluVmtvVGxhNk9nT2ZRQVMxNnA5TDRJWmY3TkI3dTFRRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlSHhQalRtS3FCNWZNeXMrSHVQczFwMCtzUDVYWTNseW9GV2FjZkJnd1dZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYamMzSXZjcnRZUW84TmtHamp3TnE2a1h4Z2h4S1NkY3plWGhCY1poRDN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGMzExYzVaWVVBaGViRGxjT0xiNnB2amFuNFhzL0JYZEJIeTNHWkpZR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtadFBxZU1BVW9WSmd3ZzdmRThESGkvdTk5VEVuU0pWNG5xd0RxNVZzVUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0pJdzcraDF4d3QvTksrb1U1dzBFMVlvMkdObFJ5anRqcHdJWVVrYWwyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUgrdkJYRHB2V3pwQXZuaHJJd29uQ1A5Ymo1SDR6ay9jVTQ0RUxWa3l6cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNyV3RxS2l1aXZWcUVzTGRqbitGelVCeXhiZjAxUDVtejM1dmt4Q0d4ZDVqUGF0bXpEeDhjekl4aUFqd3RIMXNncWpleWlOblk4QklpQmpjbWdlNGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJFVWhiSWdmd1pQcGh1M2MzTU9CRm1PZnpqZS9lTHc1NVJtSDIxVG5YU3dBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5c2F4clBKLVF2cW9KaTkyWktBdmhRIiwicGhvbmVJZCI6IjRjNzAwZjM0LTk1N2MtNGMzZS04ZTk4LTc2YWUzNGExMjI1ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVZUhSWDRDS1lxNXYySEE4bHVLaFBoR05nY1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVZ3L2pBdFRjSVVVa2JoL21nS3M2WE5kU0xVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVBOFZRTUhXIiwibWUiOnsiaWQiOiI0MDczMTE4NjQwMjoxNUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJraWtpIHJlZ2VsZSBwZSBwc2loaWMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wvNit1Y0JFSXJKOXJzR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImUvVk91bDhyd2p1Uzh5Um1mdmNqZ2RoRjN6cDdxUEFySnd6Z29WMERHMzA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpnMG05VTVwMDVGLzBoSHJOeWY1VlhmL1lpNmZxQTBxOUhWYnN2ekpUeWhSdnBVSjlLZkhneWF6aUNwT2NzcXFIbFJXaHVLUDd4eThtdFQ1dXRYUERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJlRFFyR3ZON2JubndDS0VOUTJKaElNOVVxMlNxTmsxVE1qbTd1U0FYRENxT1hEaERHcWVSMkJZNUpDQWw5UTV0S0JsTU1qQXI0RkVzTXNIMnZkbEhoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQwNzMxMTg2NDAyOjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh2MVRycGZLOEk3a3ZNa1puNzNJNEhZUmQ4NmU2andLeWNNNEtGZEF4dDkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYyODczODMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDhaIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "kiki dmx",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "07311846402",              
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


                  
