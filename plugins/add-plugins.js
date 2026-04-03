const fs = require('fs')
const path = require('path')
const { cmd } = require('../command')

const pluginDir = path.join(__dirname, "../plugins/")

// INSTALL PLUGIN
cmd({
    pattern: "plugin",
    desc: "Install new plugin",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, isOwner, reply, q}) => {
try{

if (!isOwner) return reply("*Owner only command*")

if (!q) return reply("*Usage:*\n.plugin filename.js\n<code>")

// multiline support
let [fileName, ...codeParts] = q.split("\n")
let code = codeParts.join("\n")

if (!fileName.endsWith(".js")) {
    return reply("*File name must end with .js*")
}

if (!code) return reply("*Plugin code missing*")

let filePath = path.join(pluginDir, fileName)

// write file
fs.writeFileSync(filePath, code)

// reload
delete require.cache[require.resolve(filePath)]
require(filePath)

reply(`✅ *Plugin Installed!*\n📁 ${fileName}`)

}catch(e){
console.log(e)
reply(`❌ Error:\n${e}`)
}
})


// DELETE PLUGIN
cmd({
    pattern: "delplugin",
    desc: "Delete plugin",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, isOwner, reply, args}) => {
try{

if (!isOwner) return reply("*Owner only command*")

let fileName = args[0]
if (!fileName) return reply("*Usage:* .delplugin filename.js")

let filePath = path.join(pluginDir, fileName)

if (!fs.existsSync(filePath)) {
    return reply("*Plugin not found*")
}

// delete file
fs.unlinkSync(filePath)

reply(`🗑️ *Plugin Deleted!*\n📁 ${fileName}`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})


// LIST PLUGINS
cmd({
    pattern: "pluginlist",
    desc: "Show all plugins",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{reply}) => {
try{

let files = fs.readdirSync(pluginDir)

if (files.length === 0) return reply("*No plugins installed*")

let list = files.map(f => `📁 ${f}`).join("\n")

reply(`📦 *Plugin List:*\n\n${list}`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})


// RELOAD PLUGINS
cmd({
    pattern: "reload",
    desc: "Reload all plugins",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, isOwner, reply}) => {
try{

if (!isOwner) return reply("*Owner only command*")

let files = fs.readdirSync(pluginDir)

for (let file of files) {
    let filePath = path.join(pluginDir, file)
    delete require.cache[require.resolve(filePath)]
    require(filePath)
}

reply("🔄 *All plugins reloaded!*")

}catch(e){
console.log(e)
reply(`${e}`)
}
})
