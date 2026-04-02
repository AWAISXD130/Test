const fs = require('fs');
const path = require('path');
const config = require('../config')
const {cmd , commands} = require('../command')

//auto_voice
cmd({
  on: "body"
},
async (conn, mek, m, { from, body, isOwner }) => {
    try {
        const filePath = path.join(__dirname, '../my_data/autovoice.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const text in data) {
            if (body.toLowerCase() === text.toLowerCase()) {

                if (config.AUTO_VOICE === 'true') {

                    await conn.sendPresenceUpdate('recording', from);

                    await conn.sendMessage(
                        from,
                        {
                            audio: { url: data[text] },
                            mimetype: 'audio/mpeg',
                            ptt: false,   // voice channel off — if you want ON, change to: true
                            contextInfo: { 
                                mentionedJid: [m.sender],
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363369260614615@newsletter',
                                    newsletterName: 'AWAIS-MD',
                                    serverMessageId: 143
                                }
                            }
                        },
                        { quoted: mek }
                    );
                }
            }
        }
    } catch (error) {
        console.error("AUTO VOICE ERROR:", error);
        await conn.sendMessage(from, { text: "Jaan koi error aagya, dubara try karo ❤️" });
    }
});

//auto sticker 
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../my_data/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            
            if (config.AUTO_STICKER === 'true') {
                //if (isOwner) return;        
                await conn.sendMessage(from,{sticker: { url : data[text]},package: 'AWAIS XD'},{ quoted: mek })   
            
            }
        }
    }                
});

//auto reply 
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../my_data/autoreply.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            
            if (config.AUTO_REPLY === 'true') {
                //if (isOwner) return;        
                await m.reply(data[text])
            
            }
        }
    }                
});


//fake recording
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.FAKE_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );
//always offline