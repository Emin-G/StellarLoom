let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const embeded = require("../util/embed.js");
const cleaner = require("../functions/cleaner.js");

module.exports = {
	data: new SlashCommandBuilder()
	        .setName("셔플")
		.setDescription("재생목록에 담긴 영상의 재생 순서를 섞어요."),
        
	async execute(interaction) {

                if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 중인 노래가 없습니다!", "셔플 할 재생목록이 없습니다.");
                if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

                let shuffled = Object.keys(playlist[interaction.guild.id]);
                shuffled = shuffled.sort(() => Math.random() - 0.5);
        
                console.log(shuffled);
        
                let unter = 1;

                let temp_playlist = new Map();
                temp_playlist[0] = playlist[interaction.guild.id][0];
        
                for (let row of shuffled) {
                    if (row == 0) continue;
                    temp_playlist[unter] = playlist[interaction.guild.id][row];
                    unter++;
                }
        
                console.log(temp_playlist);
        
                playlist[interaction.guild.id] = temp_playlist;

                let res = "";

                for (let unter in playlist[interaction.guild.id]) {
                    res += "**`" + (parseInt(unter) + 1) + "`** | " + playlist[interaction.guild.id][unter].title + "\n";
                }
        
                const plistemb = new EmbedBuilder()
                .setColor("#bced28")
                .setTitle(":twisted_rightwards_arrows:  **|**  인생을 셔플했습니다!")
                .setDescription(res)
                .setThumbnail("https://img.youtube.com/vi/" + playlist[interaction.guild.id][0].id + "/mqdefault.jpg")
                return interaction.reply({ embeds: [plistemb] });
	}
}