let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const embeded = require("../util/embed.js");
const cleaner = require("../functions/cleaner.js");

module.exports = {
	data: new SlashCommandBuilder()
	        .setName("반복")
		.setDescription("재생 목록을 무한으로 즐겨요."),
    
	async execute(interaction) {

                if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "반복 할 재생목록이 없습니다.");
                if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

                if (!station[interaction.guild.id]) {
                        station[interaction.guild.id] = "REPEAT";

                        const rpemb = new EmbedBuilder()
                        .setColor("#28edbc")
                        .setTitle(":repeat:  **|**  반복 기능이 활성화 되었습니다!")
                        .setDescription("반복 중에는 재생 알림이 표시되지 않습니다.")
                        return interaction.reply({ embeds: [rpemb] });
                }

                else if (station[interaction.guild.id] === "REPEAT") {
                        delete station[interaction.guild.id];

                        const rpemb = new EmbedBuilder()
                        .setColor("#28edbc")
                        .setTitle(":repeat:  **|**  반복 기능이 해제 되었습니다!")
                        return interaction.reply({ embeds: [rpemb] });
                }

                else return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  이미 스테이션 모드가 켜져있습니다.", "반복 모드와 스테이션 모드는 동시에 사용할 수 없습니다.");
	}
}