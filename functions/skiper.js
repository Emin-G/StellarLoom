async function skipTrack (interaction, trackID) {
    let { connection, playlist, volume, station } = require("../lib/val.js");

    const cleaner = require("../functions/cleaner.js");
    const handler = require("../functions/handler.js");

    //Repeat Handler
    if (!trackID[0] && station[interaction.guild.id]) {
        const last_trackID = Object.keys(playlist[interaction.guild.id]).length;
        playlist[interaction.guild.id][last_trackID] = playlist[interaction.guild.id][trackID];
    }

    else if (trackID[0]) trackID = trackID[1];
    //Repeat Handler

    console.log(trackID);

    if (!playlist[interaction.guild.id][1]) return cleaner.clearResource(interaction);

    delete playlist[interaction.guild.id][trackID];

    let temp_list = playlist[interaction.guild.id];
    playlist[interaction.guild.id] = new Map();

    let unter = 0;
    for (let o in temp_list) {
        playlist[interaction.guild.id][unter] = temp_list[o];
        unter++;
    }

    console.log(playlist[interaction.guild.id]);

    if (trackID == 0) return handler.playTrack(interaction);

}

module.exports = {
    skipTrack: skipTrack
}