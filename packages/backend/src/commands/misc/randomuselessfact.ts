import axios from "axios";
import { Command } from "../../utils/types";

const cmd: Command = {
  name: "randomuselessfact",
  description: "Get a random useless fact",
  aliases: ["ruf"],
  category: "other",
  execute: async (msg, _args) => {
    const res = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    msg.reply(res.data.text);
  },
};

module.exports = cmd;
