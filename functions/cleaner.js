let { connection, playlist, volume, station } = require("../lib/val.js");

async function clearResource (interaction) {
    const stellar = require("../lib/stellar.js");
    
    await stellar.leaveVoiceChannel(interaction);

    if (connection[interaction.guild.id]) delete connection[interaction.guild.id];
    if (playlist[interaction.guild.id]) delete playlist[interaction.guild.id];
    if (volume[interaction.guild.id]) delete volume[interaction.guild.id];
    if (station[interaction.guild.id]) delete station[interaction.guild.id];
}

module.exports = {
    clearResource: clearResource
}