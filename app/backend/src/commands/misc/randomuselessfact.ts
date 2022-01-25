import axios from "axios";
import { Command } from "@utils/commandTypes/Command";

const cmd = new Command({
  name: "randomuselessfact",
  description: "Get a random useless fact",
  aliases: ["ruf"],
  category: "misc",
  execute: async (msg, _args) => {
    const res = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    msg.reply(res.data.text);
  },
});

export default cmd;
