const config = require('../config')
const { cmd } = require('../command')

// Command ON/OFF
cmd({
    pattern: "antimod",
    desc: "Enable/Disable AntiMod",
    category: "group",
    filename: __filename
},
async(conn, mek, m,{from, args, isGroup, isAdmins, reply}) => {
try{

if (!isGroup) return reply("*Group only command*")
if (!isAdmins) return reply("*Admin only command*")

let input = args[0]?.toLowerCase()

if (!input || (input !== "on" && input !== "off")) {
    return reply("*Usage:* .antimod on / off")
}

// save in global db (simple)
if (!global.db) global.db = {}
if (!global.db.antimod) global.db.antimod = {}

global.db.antimod[from] = input === "on"

return reply(
    input === "on"
    ? "🛡️ *AntiMod Enabled!*"
    : "❌ *AntiMod Disabled!*"
)

}catch(e){
console.log(e)
reply(`${e}`)
}
})


// Anti-Demote Event
cmd({
    on: "group-participants.update"
},
async(conn, mek, m,{from, isBotAdmins}) => {
try{

if (!global.db?.antimod?.[from]) return
if (!isBotAdmins) return

let data = mek

if (data.action !== "demote") return

let actor = data.author
let users = data.participants

// Reverse
await conn.groupParticipantsUpdate(from, users, "promote")

// Punish actor
if (actor) {
    await conn.groupParticipantsUpdate(from, [actor], "demote")
}

await conn.sendMessage(from,{
text: `🚨 *ANTI DEMOTE*

👤 @${actor.split('@')[0]} demoted
⚡ Action reverse + actor demoted`,
mentions: [actor, ...users]
})

}catch(e){
console.log(e)
}
})


// Anti-Promote Event
cmd({
    on: "group-participants.update"
},
async(conn, mek, m,{from, isBotAdmins}) => {
try{

if (!global.db?.antimod?.[from]) return
if (!isBotAdmins) return

let data = mek

if (data.action !== "promote") return

let actor = data.author
let users = data.participants

// Reverse
await conn.groupParticipantsUpdate(from, users, "demote")

// Punish actor
if (actor) {
    await conn.groupParticipantsUpdate(from, [actor], "demote")
}

await conn.sendMessage(from,{
text: `🚨 *ANTI PROMOTE*

👤 @${actor.split('@')[0]} promoted
⚡ Action reverse + actor demoted`,
mentions: [actor, ...users]
})

}catch(e){
console.log(e)
}
})
