import {Message} from "discord.js";
import {client} from "../index";

export default  {
    name: "ping",
    despcription: "sends the bots latency",
    execute(message: Message) {
        message.reply(`\`${client.ws.ping}\`ms`)
    }

    
}