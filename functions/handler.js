async function playTrack (interaction) {
    let { connection, playlist, volume, station } = require("../lib/val.js");

    const { EmbedBuilder } = require("discord.js");

    const stellar = require("../lib/stellar.js");

    await stellar.playTrack(interaction, playlist[interaction.guild.id][0].data);

    //Noti off when repeating
    if (station[interaction.guild.id] === "REPEAT") return;

    let playemb = new EmbedBuilder()
    .setColor("#e60e56")
    .setImage("https://img.youtube.com/vi/" + playlist[interaction.guild.id][0].id + "/mqdefault.jpg");

    playemb.setTitle(":notes:  **|**  " + playlist[interaction.guild.id][0].title);
    return interaction.channel.send({ embeds: [playemb] });
}

module.exports = {
    playTrack: playTrack
}