let handler = async (m, { conn, usedPrefix, command}) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = './assets/tohidstudy.jpg'
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let lkr = `╭━━⊱•📚 *TOHID-AI STUDYMENU* 📚•⊱━━╮
│✫ ${usedPrefix}ϙᴜʀᴀɴᴍᴇɴᴜ
│✫ ${usedPrefix}sᴜʀᴀʜ 36  
│✫ ${usedPrefix}ɢᴘᴛ
│✫ ${usedPrefix}ᴛᴏʜɪᴅᴀɪ    
│✫ ${usedPrefix}ʙɪɴɢ  
│✫ ${usedPrefix}ʙᴀʀᴅ 
│✫ ${usedPrefix}ϙᴜᴏᴛᴇ  
│✫ ${usedPrefix}ᴀɪsᴇᴀʀᴄʜ 
│✫ ${usedPrefix}ᴅᴇғɪɴᴇ
│✫ ${usedPrefix}ᴇʟᴇᴍᴇɴᴛ
╰━━━━━━━━━━━━━━━━━━━━╯`
conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] })
m.react(done)
}
handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['study', 'sd', 'studymenu'] 

export default handler
