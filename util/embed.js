const { EmbedBuilder } = require("discord.js");
let { connection, playlist, volume, station } = require("../lib/val.js");

function sendEmbed (interaction, title, sub) {
    const errembed = new EmbedBuilder()
    .setColor("#7d3640")
    .setTitle(title)
    .setDescription(sub)
    return interaction.channel.send({ embeds: [errembed] });
}

function replyEmbed (interaction, title, sub) {
    const errembed = new EmbedBuilder()
    .setColor("#7d3640")
    .setTitle(title)
    .setDescription(sub)
    return interaction.reply({ embeds: [errembed] });
}

module.exports = {
    sendEmbed: sendEmbed,
    replyEmbed: replyEmbed
}