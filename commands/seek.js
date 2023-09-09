let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const stellar = require("../lib/stellar.js");

const embeded = require("../util/embed.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("이동")
		.setDescription("현재 트랙을 특정 시간부터 재생해요.")
        .addStringOption((option) =>
            option.setName("옵션")
                .setDescription("이동 할 시간(위치)를 입력해주세요. 예를 들어 1 30 은 1분 30초 부터 재생합니다.")
                .setRequired(true)),
    
	async execute(interaction) {

        if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "이동 할 노래가 없습니다.");
        if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

        let target;

        if (interaction.options.data[0].value.search(" ") > -1) {
            target = interaction.options.data[0].value.split(" ");

            let temp_target = 0;
            for (let o in target) {
                temp_target += parseInt(target[o]) * (1000 * (60 ** ((Object.keys(target).length - o) - 1)));
            }

            target = temp_target;
        }

        else target = parseInt(interaction.options.data[0].value) * 1000;

        await stellar.seekTrack(interaction, target);

        const seekemb = new EmbedBuilder()
        .setColor("#28edbc")
        .setTitle(":fast_forward:  **|**  재생 시간을 옮겼습니다!")
        .setThumbnail("https://img.youtube.com/vi/" + playlist[interaction.guild.id][0].id + "/mqdefault.jpg")
        return interaction.reply({ embeds: [seekemb] });

	}
}