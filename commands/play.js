let { connection, playlist, volume, station } = require("../lib/val.js");

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const stellar = require("../lib/stellar.js");

const embeded = require("../util/embed.js");
const adder = require("../functions/adder.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("재생")
		.setDescription("노래를 재생하거나 재생목록에 추가합니다.")
        .addStringOption((option) =>
            option.setName("옵션")
                .setDescription("유튜브 영상의 URL 또는 제목을 입력해주세요. 재생목록도 가능합니다.")),
    
	async execute(interaction) {

        if (!interaction.options.data[0]) {
            if (!connection[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  검색어가 입력되지 않았습니다.", "노래를 일시 중지, 재개 하려고 했던거라면.. 재생목록이 비어있답니다!");
            if (!playlist[interaction.guild.id]) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  재생 목록을 찾지 못했습니다!", "이것 참 심오하군요...");

            if (connection[interaction.guild.id].paused) {
                connection[interaction.guild.id].pause(false);
                
                const plemb = new EmbedBuilder()
                .setColor("#28edbc")
                .setTitle("::arrow_forward:  **|**  다시 재생합니다!")
                return interaction.reply({ embeds: [plemb] });
            }

            else {
                connection[interaction.guild.id].pause(true);

                const plemb = new EmbedBuilder()
                .setColor("#28edbc")
                .setTitle(":pause_button:  **|**  일시정지되었습니다!")
                return interaction.reply({ embeds: [plemb] });
            }
        }

        let val = interaction.options.data[0].value;

        //URL
        if (val.startsWith("http")) {

            stellar.getURL(val, (res) => {
                console.log(res);
                if (!res) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  URL이 올바르지 않습니다!", "URL이 올바른지 다시 한번 확인 해주세요!");
                
                const listemb = new EmbedBuilder()
                .setColor("#5d28ed")
                .setTitle(":crystal_ball:  **|**  URL을 불러오고 있어요.")
                interaction.reply({ embeds: [listemb] });
                interaction.deleteReply();

                //Check if Playlist
                if (!res[1]) return adder.addTrack(interaction, res[0]);
                else return adder.addTracks(interaction, res);
            });

        }
        //URL

        //Search
        else {

            console.log(val);
            stellar.searchYT(val, (res) => {
                console.log(res);
                if (!res) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  곡을 찾지 못했습니다...", "검색어를 변형하여 다시 한번 입력해보세요!");
                
                let desc_temp = "";
                for (let unter in res) {
                    desc_temp += "**`" + (parseInt(unter) + 1) + "`** | " + res[unter].title + "\n";
                }

                let src = new EmbedBuilder()
                .setColor("#5d28ed")
                .setAuthor({ name: "검색 결과", iconURL: interaction.user.displayAvatarURL() })
                .setDescription(desc_temp)
                .setFooter({ text: "트랙 번호만 입력하시거나 취소하시려면  `취소`  라고 입력해 주세요." })
                interaction.reply({ embeds: [src] }).then(() => {
                    interaction.channel.awaitMessages({
                        filter: m => m.author.id === interaction.user.id,
                        max: 1,
                        time: 30000,
                        errors: ["time"]
                    }).then((response) => {
                        response = response.first();
                        if (response.content === "취소") {
                            interaction.deleteReply();
                            response.delete();
                            return embeded.sendEmbed(interaction, ":triangular_flag_on_post:  **|**  곡 선택이 취소되었습니다!", "출입 도어가 닫힙니다.");
                        }
                        if (parseInt(response.content) > 0 && parseInt(response.content) < 11) {
                            interaction.deleteReply();
                            response.content = parseInt(response.content) - 1;
                            response.delete();
                            return adder.addTrack(interaction, res[response.content]);
                            
                        }
                        else {
                            interaction.deleteReply();
                            response.delete();
                            return embeded.sendEmbed(interaction, ":triangular_flag_on_post:  **|**  곡 선택이 취소되었습니다!", "올바르지 않은 수가 입력되었습니다. 1 ~ 10 안으로 선택 해주세요.");
                        }
                    }).catch((err) => {
                        console.log(err);
                        interaction.deleteReply();
                        return embeded.sendEmbed(interaction, ":triangular_flag_on_post:  **|**  곡 선택이 취소되었습니다!", "곡을 선택하는데 너무 오랜 시간이 걸렸습니다.");
                    });
                });
            });

        }
        //Search

	}
}