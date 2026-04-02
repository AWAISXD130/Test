conn.ev.on("group-participants.update", async (update) => {
  try {

    if (config.ANTI_PROTECTION === true) {

      const { id, participants, action, author } = update
      if (!id || !participants) return
      if (action !== "promote" && action !== "demote") return

      const metadata = await conn.groupMetadata(id)

      // 🤖 BOT ADMIN CHECK
      const botAdmin = metadata.participants.find(
        p =>
          p.id === conn.user.id &&
          (p.admin === "admin" || p.admin === "superadmin")
      )

      if (!botAdmin) return

      for (let user of participants) {

        // 🟢 PROMOTE
        if (action === "promote") {
          await conn.sendMessage(id, {
            text:
`🛡️ *ANTI-PROTECTION*

👑 *New Admin Promoted*
@${user.split("@")[0]}

👤 *Promoted By*
@${author.split("@")[0]}`,
            mentions: [user, author]
          })
        }

        // 🔴 DEMOTE
        if (action === "demote") {
          await conn.sendMessage(id, {
            text:
`🛡️ *ANTI-PROTECTION*

⚠️ *Admin Demoted*
@${user.split("@")[0]}

👤 *Demoted By*
@${author.split("@")[0]}`,
            mentions: [user, author]
          })
        }
      }
    }

  } catch (err) {
    console.log("ANTI_PROTECTION ERROR:", err)
  }
})
