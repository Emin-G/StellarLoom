let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const embeded = require("../util/embed.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("재생목록")
		.setDescription("재생 목록과 트랙 번호를 볼 수 있어요."),
    
	async execute(interaction) {

        if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "재생 목록을 찾지 못했습니다...");
        if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

        let res = "";

        for (let unter in playlist[interaction.guild.id]) {
            res += "**`" + (parseInt(unter) + 1) + "`** | " + playlist[interaction.guild.id][unter].title + "\n";
        }

        const plistemb = new EmbedBuilder()
        .setColor("#bced28")
        .setTitle(":bookmark:  **|**  재생 목록")
        .setDescription(res)
        .setThumbnail("https://img.youtube.com/vi/" + playlist[interaction.guild.id][0].id + "/mqdefault.jpg")
        return interaction.reply({ embeds: [plistemb] });

	}
}