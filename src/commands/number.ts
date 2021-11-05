import axios from "axios";
import { Command } from "../types";

const cmd: Command = {
  name: "number",
  description: "Get a fact of a number",
  execute: async (msg, args) => {
    if (!args[0]) {
      msg.channel.send("Please provide a number");
      return;
    }
    const num = args[0];
    if (isNaN(Number(num))) {
      msg.reply(`${num} is not a number`);
      return;
    }

    const res = await axios.get(`http://numbersapi.com/${num}`);
    msg.reply(res.data);
  },
};

module.exports = cmd;
