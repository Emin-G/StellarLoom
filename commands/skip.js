let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const stellar = require("../lib/stellar.js");

const embeded = require("../util/embed.js");
const skiper = require("../functions/skiper.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("스킵")
		.setDescription("재생중인 영상 혹은 특정 영상을 스킵해요.")
        .addStringOption((option) =>
            option.setName("옵션")
                .setDescription("공백 또는 트랙 번호를 입력해주세요. 옵션이 공백이면 현재 트랙을 스킵해요.")
                .setRequired(false)),
    
	async execute(interaction) {

        if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "스킵 할 노래가 없습니다.");
        if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

        let val;
        if (interaction.options.data[0]) val = parseInt(interaction.options.data[0].value) - 1;
        else val = 0;

        if (val > -1 && val < Object.keys(playlist[interaction.guild.id]).length) {

            let temp_track = { title: playlist[interaction.guild.id][val].title, id: playlist[interaction.guild.id][val].id };

            await skiper.skipTrack(interaction, ["FORCE", val]);
            
            const skiemb = new EmbedBuilder()
            .setColor("#28edbc")
            .setTitle(":track_next:  **|**  스킵되었습니다!")
            .setDescription("`" + temp_track.title + "`")
            .setThumbnail("https://img.youtube.com/vi/" + temp_track.id + "/mqdefault.jpg")
            return interaction.reply({ embeds: [skiemb] });

        }

        else return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  " + (val + 1) + "번 트랙을 찾지 못했습니다!", "!재생목록 에서 트랙 번호를 다시 한번 확인 해주세요!");

	}
}