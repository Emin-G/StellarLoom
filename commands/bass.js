let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const embeded = require("../util/embed.js");

module.exports = {
	data: new SlashCommandBuilder()
	    .setName("베이스")
		.setDescription("BassBoost 모드를 켜거나 끕니다. 드가자아아아아아아아아아아아아아아아아아아아아아아아아아아아아악"),
    
	async execute(interaction) {

        if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "반복 할 재생목록이 없습니다.");
        if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

        if (!connection[interaction.guild.id].filtersApi) {
            connection[interaction.guild.id].filtersApi = "BASS";

            await connection[interaction.guild.id].filters({ equalizer: [ {band: 0, gain: 0.20}, {band: 1, gain: 0.20}, {band: 2, gain: 0.20}, {band: 3, gain: 0.10}, {band: 4, gain: 0.05}, {band: 5, gain: 0}, {band: 6, gain: -0.05}, {band: 7, gain: -0.05}, {band: 8, gain: -0.05}, {band: 9, gain: 0.05}, {band: 10, gain: 0.05}, {band: 11, gain: 0.05}, {band: 12, gain: 0}, {band: 13, gain: 0}, {band: 14, gain: 0} ] });
            
            let rpemb = new EmbedBuilder()
            .setColor("#28edbc")
            .setTitle(":rocket:  **|**  BassBoost 모드를 적용중입니다...")
            interaction.reply({ embeds: [rpemb] });

            setTimeout(() => {
                rpemb = new EmbedBuilder()
                .setColor("#28edbc")
                .setTitle(":rocket:  **|**  BassBoooooooost!")
                return interaction.editReply({ embeds: [rpemb] });
            }, 5000);
        }

        else if (connection[interaction.guild.id].filtersApi === "BASS") {
            connection[interaction.guild.id].filtersApi = false;

            await connection[interaction.guild.id].filters({});

            let rpemb = new EmbedBuilder()
            .setColor("#28edbc")
            .setTitle(":sailboat:  **|**  BassBoost 모드를 해제중입니다...")
            interaction.reply({ embeds: [rpemb] });

            setTimeout(() => {
            rpemb = new EmbedBuilder()
                .setColor("#28edbc")
                .setTitle(":sailboat:  **|**  BassNormal.")
                return interaction.editReply({ embeds: [rpemb] });
            }, 5000);
        }

        else return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  NightCore 기능이 켜져 있습니다.", "BassBoost 기능과 NightCore 모드는 동시에 사용할 수 없습니다.");
	
    }
}