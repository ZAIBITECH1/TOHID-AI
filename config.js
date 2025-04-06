import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

const defaultOwner = '923116798238';


// Check for the OWNERS environment variable; if not found, use the default
const ownervb = process.env.OWNERS || process.env.OWNER_NUMBER || '923116798238' ; // put your number here

const ownerlist = ownervb.split(';');

global.owner = [];
for (let i = 0; i < ownerlist.length; i++) {
    global.owner.push([ownerlist[i], true]);
}
//
global.botname = process.env.BOTNAME || 'ZAIBI';
global.pairingNumber = process.env.BOT_NUMBER || '923116798238' ;  // put your number here
global.SESSION_ID = process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE9kSnN5cUxNTTlTanNSUzRybGFUS3BidURPQ2hMRnFzL0RTbmE3NEpFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWFzekxNNnE1YUVYZzNiUUt3eUJCTU9pdVorZE5adURmMmI4aFRQTDhDTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSGEwVnpRYUo1TWdhUmlYNm94SmRBcXYwS0pROW0xTWFiRDV4U3RTK1VvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3SURDUm9TMmhSNnFZYzJhNkZVdmNXaVV4elcrTHVrUDNreG1ONUdHQ3o0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMaGYwNkVWYnk2NFMyUThKaENPK0ZTRzFjZVlia0x0WEJUU2xnUVMrWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVXYXpwUDNNY0dGMExIQlAvdXRGUllhemhhWWhwOEpJamhwVlJxTHdRVjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZaSU5PRXVPdTJ3T09NbHBmTnVPRVFyZGlLUVptVjJGcmNRLzZBSlJtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmdOVUpsQXRDeHltUm5ZV1FtU05IZWthZGlveklLSDZMNUJ6MmR2ZnJTRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitzZnpobitkNDZKRXRhNDhmTUl1S2pyRUxGdXlDOU5Ea0ZTb2ZUVFhkeG9XYnRvU3NYb0tNVElmS2pMdSs5UHBESGgwcE42SlEvZExtNzJlbXlxZUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE4LCJhZHZTZWNyZXRLZXkiOiJNUXpHTmxhYW9BbGRnd0Y4S090SzdycUVWR2lrYmV2NlBSNzhRWGJTRStjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJTSFFaUU4xNiIsIm1lIjp7ImlkIjoiOTIzMTE2Nzk4MjM4OjEyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTIzNDQxODkwMTgyNDg6MTJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMS0psSkFFRUlTdHlMOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ2L1VBOTRFbFVrWGt2cHc3ZXVVd0k2RnFmcUIxRUkrbW1wK00zYjlOV1JrPSIsImFjY291bnRTaWduYXR1cmUiOiIzUDl1MVFUa1YxeVBWMXdMTHVTZ29QMlhLaWZrVE1uYm1MOWpubGIzM3Q4VE9wV3JkUGtkVzA5R25FLzVNbDF1cEt3SDdzRVVUcE5KdHZkWE5DbjJBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiM3lQRjJXYlY2RWNRN2ZCTzBiNll5UUlOcVR3ekJ6ZkxiTzVyMm5yMXhwaWswQWVjZG0vYkpqb2sxOEl0N2pyQmdwQU9XcUhVaXowTE5kVzIvVnVNQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMxMTY3OTgyMzg6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYi8xQVBlQkpWSkY1TDZjTzNybE1DT2hhbjZnZFJDUHBwcWZqTjIvVFZrWiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzOTE4NzM3LCJsYXN0UHJvcEhhc2giOiJQV2s1QiJ9' ;  // put your session id here

global.mods = []
global.prems = []
global.allowed = ['917849917350', '923116798238']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = [
  '29d4b59a4aa687ca',
  '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb',
  '5bd33b276d41d6b4',
  'HIRO',
  'kurrxd09',
  'ebb6251cc00f9c63',
]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.canal = 'https://whatsapp.com/channel/0029VaGyP933bbVC7G0x0i2T'


global.APIs = {
  // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz',
}
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`,
  'https://api.fgmods.xyz': 'm2XBbNvz',
}

// Sticker WM
global.premium = 'true'
global.packname = 'TOHID-AI'
global.author = 'Tohidkhan6332'
global.menuvid = 'https://i.imgur.com/2Sp3cqD.mp4'
global.igfg = ' Follow on Instagram\nhttps://www.instagram.com/Tohidkhan6332'
global.dygp = 'https://whatsapp.com/channel/0029VaGyP933bbVC7G0x0i2T'
global.fgsc = 'https://github.com/Tohidkhan6332/TOHID-AI'
global.fgyt = 'https://youtube.com/@Tohidkhan_6332'
global.fgpyp = 'https://GitHub.com/Tohidkhan6332'
global.fglog = 'https://i.imgur.com/WnKjrJt.jpeg'
global.thumb = fs.readFileSync('./assets/tohid.jpg')

global.wait = '⏳'
global.rwait = '⏳'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌'
global.xmoji = '🤩'

global.multiplier = 69
global.maxwarn = '3'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
