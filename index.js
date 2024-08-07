const { Client, EmbedBuilder, GatewayIntentBits, REST, Routes, Events, Collection } = require("discord.js");

//Version Check
const vm = require("./util/vm.js");
vm.chkVersion();
//Version Check

require("dotenv").config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => console.log("[StellarLoom] " + bot.user.tag + " 계정에 접속했습니다."));
bot.on("shardDisconnect", (event, id) => console.log("[StellarLoom] Shard " + id + " disconnected (" + event.code + "), trying to reconnect..."));
bot.on("shardReconnecting", (id) => console.log("[StellarLoom] Shard " + id + " reconnecting..."));
bot.on("ready", () => {
    bot.user.setPresence({
        status: "idle"
    });
});

//LavaLinkAlert
console.log("[StellarLoom] 노래 재생에 문제가 있거나 노래를 재생하는 도중 지속적으로 오류가 발생한다면 LavaLink.jar 을 업데이트 해보세요.");
//LavaLinkAlert

process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection : ", error);
});

//Stellar
const stellar = require("./lib/stellar.js");

bot.on("ready", () => {
    stellar.connectLava(bot);
});
//Stellar

//Coomand
bot.commands = new Collection();
const config = ["play", "skip", "playlist", "stop", "repeat", "shuffle", "seek"];
const commands = [];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

for (let o in config) {
    const command = require("./commands/" + config[o] + ".js");
    commands.push(command.data.toJSON());
    bot.commands.set(command.data.name, command);
}

async function regico () {
    console.log("[StellarLoom] " + commands.length + "개의 커맨드를 로드합니다...");

    try {
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log("[StellarLoom] " + data.length + "개의 커맨드를 적용했습니다.");
    }

    catch(error) {
        console.log("[StellarLoom] 커맨드를 불러오는 도중에 문제가 발생했습니다. ( " + error + " )");
    }
}

regico();
//Coomand

//Event
bot.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) {
		console.log("[StellarLoom] '" + interaction.commandName + "' 은(는) 존재하지 않은 명령어입니다.");
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
        const errtemb = new EmbedBuilder()
        .setColor("#7d3640")
        .setTitle(":triangular_flag_on_post:  **|**  콜라를 옮기다가 떨어뜨려버렸어요!...")
        return interaction.reply({ embeds: [errtemb] });
	}
});
//Event

bot.login(process.env.BOT_TOKEN);