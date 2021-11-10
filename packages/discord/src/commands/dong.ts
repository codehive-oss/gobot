import {Command} from "../utils/types";
import {Message, User} from "discord.js";

const cmd: Command = {
    aliases: ["dong"],
    name: "dongsize",
    description: "magnum schlong",
    async execute(msg: Message, _args: string[]) {
        const target = msg.mentions.users.first()
        if(!target) {

            await msg.reply(dong(msg.author))

        }else {

            await msg.reply(`${msg.author.username}'s Dong: \n ${dong(msg.author)}\n ${target.username}'s Dong: \n ${dong(target)}\n`)
        }

    }
};

function dong(user: User) : string {
    let random = Math.round(Math.random() * 100);
    if(user.id==="347130390181445633") {
        random = 100
    }
    let dong = "8";
    for (let i = 0; i < random; i++) {
        dong += "=";
    }
    return dong + "D " + random + "cm"
}

module.exports = cmd;
