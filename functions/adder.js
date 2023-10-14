let { connection, playlist, volume, station } = require("../lib/val.js");

const stellar = require("../lib/stellar.js");

const embeded = require("../util/embed.js");
const handler = require("../functions/handler.js");

const { EmbedBuilder } = require("discord.js");

async function addTrack (interaction, track) {
    //ConnectVoiceChannel
    if (!interaction.member.voice.channel) return embeded.sendEmbed(interaction, ":triangular_flag_on_post:  **|**  통화방을 찾지 못했습니다.", "먼저 통화방에 들어가주시거나 권한을 확인해주세요.");
    if (!connection[interaction.guild.id]) await stellar.joinVoiceChannel(interaction);
    //ConnectVoiceChannel
    
    //Add Song
    let temp_index;

    if (!playlist[interaction.guild.id]) {
        playlist[interaction.guild.id] = new Map();
        temp_index = 0;
    }
    else temp_index = Object.keys(playlist[interaction.guild.id]).length;

    playlist[interaction.guild.id][temp_index] = track;

    console.log(playlist[interaction.guild.id]);
    //Add Song

    if (temp_index == 0) return handler.playTrack(interaction);

    else {
        const adderemb = new EmbedBuilder()
        .setColor("#28edbc")
        .setTitle(":white_check_mark:  **|**  재생목록에 추가했습니다!")
        .setDescription("`" + track.title + "`")
        .setThumbnail("https://img.youtube.com/vi/" + track.id + "/mqdefault.jpg")
        return interaction.channel.send({ embeds: [adderemb] });
    }
}

async function addTracks (interaction, tracks) {
    //ConnectVoiceChannel
    if (!interaction.member.voice.channel) return embeded.replyEmbed(interaction, ":triangular_flag_on_post:  **|**  통화방을 찾지 못했습니다.", "먼저 통화방에 들어가주시거나 권한을 확인해주세요.");
    if (!connection[interaction.guild.id]) await stellar.joinVoiceChannel(interaction);
    //ConnectVoiceChannel

    //Add Song
    let temp_index = { index: 0, handle: true };
    let temp_tracks = "";

    if (playlist[interaction.guild.id]) temp_index = { index: Object.keys(playlist[interaction.guild.id]).length, handle: false };
    else playlist[interaction.guild.id] = new Map();

    for (let o in tracks) {
        playlist[interaction.guild.id][temp_index.index] = tracks[o];
        temp_tracks += "**`" + (temp_index.index + 1) + "`** | " + tracks[o].title + "\n";
        temp_index.index++;
    }

    console.log(playlist[interaction.guild.id]);
    //Add Song

    const adderemb = new EmbedBuilder()
    .setColor("#28edbc")
    .setTitle(":white_check_mark:  **|**  재생목록에 추가했습니다!")
    .setDescription(temp_tracks)
    .setThumbnail("https://img.youtube.com/vi/" + tracks[0].id + "/mqdefault.jpg")
    interaction.channel.send({ embeds: [adderemb] });

    if (temp_index.handle) return handler.playTrack(interaction);
}

module.exports = {
    addTrack: addTrack,
    addTracks: addTracks
}