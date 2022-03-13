const { MessageEmbed } = require("discord.js");
const getVaults = require("../utils/getVaults");
const getURL = require("../utils/getURL");

module.exports = async (client) => {
  const prefix = "!";
  const availableVaults = await getVaults();

  client.on("messageCreate", async (message) => {
    const now = Date.now();
    const utcdateNow = new Date(now);
    if (message.author.bot) return;

    console.log(
      `[MESSAGE] - ${utcdateNow} - ${message.author.username}: ${message.content}`
    );

    availableVaults.puts[0].forEach(async (putsVault) => {
      if (
        message.content.toUpperCase().startsWith(`${prefix}${putsVault}`) ||
        message.content.toUpperCase().startsWith(`${prefix}W${putsVault}`)
      ) {
        let vaultItem;
        let option;
        const messageObject = message.content.substring(1);
        const args = messageObject.split(/ +/);
        vaultItem = args[0].toUpperCase();
        if (vaultItem === "WLUNA") vaultItem = "LUNA";
        if (vaultItem === "WINJ") vaultItem = "INJ";
        if (args[1]) {
          option = args[1].toLowerCase();
          if (option === "call") return;
          if (vaultItem === "LUNA") putsVault = "WLUNA";
          if (vaultItem === "INJ") putsVault = "WINJ";
          const katanaURL = `https://app.katana.so/options/${option}/${putsVault}`;
          try {
            const results = await getURL(katanaURL);
            if (results !== null) {
              strikeResponse = results[1].text.split("\n")[1];
              priceResponse = results[0].text.split("\n")[1];
              expiryResponse = results[3].text.split("\n")[1].split(":");
              const embed = new MessageEmbed()
                .setTitle(`${putsVault.toUpperCase()} Put Vault`)
                .setThumbnail(results[4].logo)
                .setColor("#3BA55C")
                .setTimestamp(utcdateNow)
                .setDescription(
                  `\n \n**Strike Price**\n${strikeResponse}\n \n**Current Price**\n${priceResponse}\n \n**Expiry**\n${
                    expiryResponse[0]
                  } Hours, ${expiryResponse[1]} Minutes and ${
                    expiryResponse[2]
                  } Seconds.\n \n[${putsVault.toUpperCase()} Put Vault](https://app.katana.so/options/${option}/${putsVault})`
                );
              message.channel.send({
                content: ` `,
                embeds: [embed],
                reply: { messageReference: message.id },
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          ///
        }
      }
    });

    availableVaults.calls[0].forEach(async (callsVault) => {
      if (
        message.content.toUpperCase().startsWith(`${prefix}${callsVault}`) ||
        message.content.toUpperCase().startsWith(`${prefix}W${callsVault}`)
      ) {
        console.log(`found one, it is ${callsVault}`);
        let vaultItem;
        let option;
        const messageObject = message.content.substring(1);
        const args = messageObject.split(/ +/);
        vaultItem = args[0].toUpperCase();
        if (vaultItem === "WLUNA") vaultItem = "LUNA";
        if (vaultItem === "WINJ") vaultItem = "INJ";
        if (args[1]) {
          option = args[1].toLowerCase();
          if (option === "put") return;
          if (vaultItem === "LUNA") callsVault = "WLUNA";
          if (vaultItem === "INJ") callsVault = "WINJ";
          const katanaURL = `https://app.katana.so/options/${option}/${callsVault}`;
          console.log(katanaURL);
          try {
            const results = await getURL(katanaURL);
            if (results !== null) {
              strikeResponse = results[1].text.split("\n")[1];
              priceResponse = results[0].text.split("\n")[1];
              expiryResponse = results[3].text.split("\n")[1].split(":");
              const embed = new MessageEmbed()
                .setTitle(`${callsVault.toUpperCase()} Covered Call Vault`)
                .setThumbnail(results[4].logo)
                .setColor("#3BA55C")
                .setTimestamp(utcdateNow)
                .setDescription(
                  `\n \n**Strike Price**\n${strikeResponse}\n \n**Current Price**\n${priceResponse}\n \n**Expiry**\n${
                    expiryResponse[0]
                  } Hours, ${expiryResponse[1]} Minutes and ${
                    expiryResponse[2]
                  } Seconds.\n \n[${callsVault.toUpperCase()} Covered Call Vault](https://app.katana.so/options/${option}/${callsVault})`
                );
              message.channel.send({
                content: ` `,
                embeds: [embed],
                reply: { messageReference: message.id },
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          ///
        }
      }
    });
  });
};
