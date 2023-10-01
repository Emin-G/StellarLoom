let { connection, playlist, volume, station } = require("../lib/val.js");

const { GatewayDispatchEvents } = require("discord.js");

const { Manager, Rest } = require("lavacord");
require("dotenv").config();

let manager;

const skiper = require("../functions/skiper.js");
const cleaner = require("../functions/cleaner.js");

async function connectLava (bot) { 

    const nodes = [
        { id: "1", host: "127.0.0.1", port: process.env.LAVA_PORT, password: process.env.LAVA_PASS }
    ];

    manager = new Manager(nodes, {
        user: bot.user.id,
        send: (packet) => {
            console.log(packet);
            bot.guilds.cache.get(packet.d.guild_id).shard.send(packet);
        }
    });

    bot.ws
    .on(GatewayDispatchEvents.VoiceServerUpdate, (data) => {
        console.log(data);
        manager.voiceServerUpdate(data);
    })
    .on(GatewayDispatchEvents.VoiceStateUpdate, (data) => {
        console.log(data);
        manager.voiceStateUpdate(data);
    })
    .on(GatewayDispatchEvents.GuildCreate, (data) => {
        for (const state of data.voice_states ?? []) manager.voiceStateUpdate({ ...state, guild_id: data.id });
    });

    console.log(manager);

    await manager.connect();
    console.log("[Stellar] Manager Is Ready!");

    manager.on("disconnect", () => {
        console.log("[Stellar] Manager Disconnected.");
    });

    manager.on("reconnecting", () => {
        console.log("[Stellar] Reconnecting Manager...");
    });

    // The error event, which you should handle otherwise your application will crash when an error is emitted
    manager.on("error", (error, node) => {
        console.log("[Stellar] Error On Stellar Manager...");
        console.log(error);
        console.log(node);
    });
    
}

async function getURL (src, callback) {

    search(src, (res) => {
        console.log(res);
        if (res.loadType === "NO_MATCHES") return callback(null);
        if (res.loadType === "LOAD_FAILED") return callback(null);

        res = res.tracks;
    
        let data = new Map();
    
        for (let o in res) {
            data[o] = new Map();
            data[o]["id"] = res[o].info.identifier;
            data[o]["title"] = res[o].info.title;
            data[o]["data"] = res[o].track;
        }
        
        return callback(data);
    });

}

async function searchYT (src, callback) {

    search("ytsearch:" + src, (res) => {
        console.log(res);
        if (res.loadType === "NO_MATCHES") return callback(null);
        if (res.loadType === "LOAD_FAILED") return callback(null);

        res = res.tracks;

        let data = new Map();
    
        for (let o in res) {
            if (o > 9) break;
            data[o] = new Map();
            data[o]["id"] = res[o].info.identifier;
            data[o]["title"] = res[o].info.title;
            data[o]["data"] = res[o].track;
        }
        
        return callback(data);
    });
}

async function search (src, callback) {
    console.log(manager);
    const node = manager.idealNodes[0];

    let res = await Rest.load(node, src)
    .catch(err => {
        console.error(err);
        return callback(null);
    });

    console.log(res);
    return callback(res);
}

async function joinVoiceChannel (interaction) {
    connection[interaction.guild.id] = await manager.join({
        guild: interaction.guild.id,
        channel: interaction.member.voice.channel.id,
        node: "1"
    });

    connection[interaction.guild.id].once("error", (error) => {
        console.error(error);
        return cleaner.clearResource(interaction);
    });
}

async function leaveVoiceChannel (interaction) {
    await manager.leave(interaction.guild.id);
}

async function playTrack (interaction, track) {
    console.log(track);
    await connection[interaction.guild.id].play(track);

    console.log("A");

    console.log(connection[interaction.guild.id]);

    setTimeout(() => {
        connection[interaction.guild.id].once("end", (data) => {
            console.log(data);
            if (data.type === "TrackEndEvent" && data.reason === "REPLACED") return;

            if (data.reason === "cleanup") return;

            return skiper.skipTrack(interaction, 0, "TrackEND");
        });
    }, 1000);
}

module.exports = {
    connectLava: connectLava,
    getURL: getURL,
    searchYT: searchYT,
    joinVoiceChannel: joinVoiceChannel,
    leaveVoiceChannel: leaveVoiceChannel,
    playTrack: playTrack
}