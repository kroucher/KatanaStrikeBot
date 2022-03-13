module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity(`Katana Vaults`, { type: "WATCHING" });

    let handler = require("../botCommands/command-handler");
    if (handler.default) handler = handler.default;

    handler(client);

    console.log(`[CONNECTED] Bazinga! Logged in as ${client.user.tag}`);
  },
};
