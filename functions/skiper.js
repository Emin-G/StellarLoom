async function skipTrack (interaction, trackID, reason) {

    let { connection, playlist, volume, station } = require("../lib/val.js");

    const cleaner = require("../functions/cleaner.js");
    const handler = require("../functions/handler.js");

    //Repeat Handler
    if (station[interaction.guild.id] === "REPEAT" && reason === "TrackEND") {
        const last_trackID = Object.keys(playlist[interaction.guild.id]).length;
        playlist[interaction.guild.id][last_trackID] = playlist[interaction.guild.id][0];
    }
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

async function bulkSkipTrack (interaction, trackID) {

    let { connection, playlist, volume, station } = require("../lib/val.js");

    const cleaner = require("../functions/cleaner.js");
    const handler = require("../functions/handler.js");

    console.log(trackID);

    const tempTrackID = trackID[0];

    while (trackID[0] < trackID[1] + 1) {
        delete playlist[interaction.guild.id][trackID[0]];
        trackID[0]++;
    }

    let temp_list = playlist[interaction.guild.id];
    playlist[interaction.guild.id] = new Map();

    let unter = 0;
    for (let o in temp_list) {
        playlist[interaction.guild.id][unter] = temp_list[o];
        unter++;
    }

    console.log(playlist[interaction.guild.id]);

    if (!playlist[interaction.guild.id][0]) return cleaner.clearResource(interaction);

    if (tempTrackID == 0) return handler.playTrack(interaction);

}

module.exports = {
    skipTrack: skipTrack,
    bulkSkipTrack: bulkSkipTrack
}