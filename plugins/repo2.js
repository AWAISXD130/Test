const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Awais-star-a11y/AWAIS-MD-V3';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `_*BOT NAME 📛:*_\n> ${repoData.name}\n\n_*OWNER NAME 👑:*_\n> ${repoData.owner.login}\n\n_*STARS ✨:*_\n> ${repoData.stargazers_count}\n\n_*FORKS 🔌:*_\n> ${repoData.forks_count}\n\n_*GITHUB LINK 🖇️:*_\n> ${repoData.html_url}\n\n_*DESCRIPTION:*_\n> ${repoData.description || '_*SIMPLE AND STABLE BOT FOR WHATSAPP 🔥*_'}\n\n_*DON'T FORGET STAR AND FORK ✨*_\n\n> *⚡ᴀᴡᴀɪs ᴍᴅ*`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/rgt6ss.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363369260614615@newsletter',
                    newsletterName: 'ᴀᴡᴀɪs ᴍᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/p9kkka.mp4' },
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363369260614615@newsletter',
                    newsletterName: 'ᴀᴡᴀɪs ᴍᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
