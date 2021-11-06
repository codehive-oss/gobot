import axios from "axios";
import { Command } from "../utils/types";

const cmd: Command = {
  aliases: ["numberfact"],
  name: "number",
  description: "Get a fact of a number",
  execute: async (msg, args) => {
    if (!args[0]) {
      msg.channel.send("Please provide a number");
      return;
    }
    const num = args[0];

    // Checks if string is not an integer
    var er = /^-?[0-9]+$/;
    if (!er.test(num)) {
      msg.reply(`${num} is not an integer`);
      return;
    }

    const res = await axios.get(`http://numbersapi.com/${num}`);
    msg.reply(res.data);
  }
};

module.exports = cmd;
