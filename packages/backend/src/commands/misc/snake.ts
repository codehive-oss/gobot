import {Command} from "../../utils/commandTypes";
import {Message} from "discord.js";
import {SnakeGame} from "../../utils/snake";

const cmd : Command = {
    name: "snake",
    description: "Snake",
    category: "misc",
    execute(msg: Message, args: string[]) {
        new SnakeGame().start(msg)
    }
}

module.exports = cmd