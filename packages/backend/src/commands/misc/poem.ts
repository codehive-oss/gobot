import { Command } from "@utils/commandTypes/Command";
import axios from "axios";
import { MessageEmbed, TextChannel } from "discord.js";
import Pagination from "@utils/Pagination";

const poemAPI = "https://poetrydb.org";

interface Poem {
  title: string;
  author: string;
  lines: string[];
  linecount: number;
}

const linesOnPage = 10;

const getPoemPart = (body: string[], index: number) : string => {
  const start = index * linesOnPage;
  const end = start + linesOnPage;
  return body.slice(start, end).join("\n");
}

export default new Command({
  name: "poem",
  description: "Sends a poem",
  usage: "poem",
  category: "misc",
  async execute(message) {
    const res = await axios.get(`${poemAPI}/random`);
    const [poem]: Poem[] = res.data;

    const pageNum = Math.ceil(poem.linecount / linesOnPage);

    const embds = [];
    for(let i = 0; i < pageNum; i++) {
      const poemPart = getPoemPart(poem.lines, i);
      const embd = new MessageEmbed()
        .setTitle(poem.title)
        .setAuthor(poem.author)
        .setDescription(poemPart)
        .setFooter(`Page ${i + 1}/${pageNum}`);
      embds.push(embd);
    }
    new Pagination(message.channel as TextChannel, embds).paginate();
  },
});
