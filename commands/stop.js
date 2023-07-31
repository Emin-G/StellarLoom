let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const embeded = require("../util/embed.js");
const cleaner = require("../functions/cleaner.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("중지")
		.setDescription("재생을 멈추고 통화방에서 나가요. 재생 목록, 반복을 비롯한 모든 설정을 초기화 해요."),
    
	async execute(interaction) {

                if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "스킵 할 노래가 없습니다.");
                if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

                await cleaner.clearResource(interaction);

                const stemb = new EmbedBuilder()
                .setColor("#e60e56")
                .setTitle(":stop_button:  **|**  노래 재생을 멈췄습니다!")
                return interaction.reply({ embeds: [stemb] });

	}
}