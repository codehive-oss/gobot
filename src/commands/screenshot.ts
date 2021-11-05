import axios from "axios";
import { MessageEmbed } from "discord.js";
import { Command } from "src/types";

const cmd : Command =  {
    name: "screenshot",
    description: "screenshots the given webpage",
    execute: async (msg, args) => {
            if(!args[0]) { 
            msg.reply("Please provide a website!")
        }
        const url:string = args[0];
        msg.reply({
            embeds: [new MessageEmbed().setImage((await axios.get(`https://api.screensoap.com/screenshot?url=${url}`)).data.file.url)]
        })
        
    }
}

module.exports = cmd

