const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: 'mee',
  alias: ['Mee','Awais'],
  desc: 'Mention user and send voice note',
  category: 'fun',
  react: '🎙️'
}, async (conn, m, { reply }) => {
  const voiceClips = [
    "https://files.catbox.moe/mo95z3.mp3",
    "https://files.catbox.moe/cxdlys"
  ];

  const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
  const mentionedUser = m.sender;

  // 🧷 Mention user with text first
  await conn.sendMessage(m.chat, {
    text: `@${mentionedUser.split('@')[0]}`,
    mentions: [mentionedUser]
  });

  // 🎙️ Send Voice Note with Audio Type and Waveform + ExternalAdReply
  await conn.sendMessage(m.chat, {
    audio: { url: randomClip },
    mimetype: 'audio/mp4',
    ptt: false,
    waveform: [99, 0, 99, 0, 99],
    contextInfo: {
      forwardingScore: 55555,
      isForwarded: true,
      externalAdReply: {
        title: "𓆩𝑨𝑾𝑨𝑰𝑺𝑿𝑫𓆪",
        body: "𝐓𝝰̚𝐠͜͡𝗲 𝝪𝐨̚𝝻͜͡𝐫 𝐋𝝾̚𝝼͜͡𝗲 :🦚🍬⛱️🎗️💖",
        mediaType: 4,
        thumbnailUrl: "https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg",
        sourceUrl: "https://Wa.me/923182832887",
        showAdAttribution: true
      }
    },
    mentions: [mentionedUser]
  });
});
//CODES BY AWAISXD
