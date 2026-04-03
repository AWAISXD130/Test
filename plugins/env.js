const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["setting", "allvar"],
    desc: "Settings of bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Define the settings message with the correct boolean checks
        let envSettings = `╭━━━〔 _*AWAIS-MD*_ 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ _*ENV SETTINGS*_
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔 _*ON / OFF*_ 〕━━┈⊷
┇๏ _*.autostatusview:*_ ${isEnabled(config.AUTO_READ_STATUS) ? "on ✅" : "off ❌"}
┇๏ _*.status-reply:*_ ${isEnabled(config.AUTO_STATUS_REPLY) ? "on ✅" : "off ❌"}
┇๏ _*.auto-reply:*_ ${isEnabled(config.AUTO_REPLY) ? "on ✅" : "off ❌"}
┇๏ _*.auto-sticker:*_ ${isEnabled(config.AUTO_STICKER) ? "on ✅" : "off ❌"}
┇๏ _*.auto-voice:*_ ${isEnabled(config.AUTO_VOICE) ? "on ✅" : "off ❌"}
┇๏ _*.owner-react:*_ ${isEnabled(config.OWNER_REACT) ? "on ✅" : "off ❌"}
┇๏ _*.heart-react:*_ ${isEnabled(config.HEART_REACT) ? "on ✅" : "off ❌"}
┇๏ _*.auto-react:*_ ${isEnabled(config.AUTO_REACT) ? "on ✅" : "off ❌"}
┇๏ _*.anti-link:*_ ${isEnabled(config.ANTI_LINK) ? "on ✅" : "off ❌"}
┇๏ _*.anti-bad:*_ ${isEnabled(config.ANTI_BAD) ? "on ✅" : "off ❌"}
┇๏ _*.auto-typing:*_ ${isEnabled(config.AUTO_TYPING) ? "on ✅" : "off ❌"}
┇๏ _*.auto-recording:*_ ${isEnabled(config.FAKE_RECORDING) ? "on ✅" : "off ❌"}
┇๏ _*.always-online:*_ ${isEnabled(config.ALWAYS_ONLINE) ? "on ✅" : "off ❌"}
┇๏ _*.current-status:*_ ${isEnabled(config.CURRENT_STATUS) ? "on ✅" : "off ❌"}
┇๏ _*.read-message:*_ ${isEnabled(config.READ_MESSAGE) ? "on ✅" : "off ❌"}
╰━━━━━━━━━━━━──┈⊷
> ${config.CAPTION}`;

        // Send message with an image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/c38d6l.jpg' }, // Image URL
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363369260614615@newsletter',
                        newsletterName: "AWAIS MD",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send an audio file
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/4ahhnk.mp4' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`Error: ${error.message}`);
    }
});
