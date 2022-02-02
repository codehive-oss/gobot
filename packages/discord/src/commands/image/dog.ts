import { Command } from "../../utils/Command";
import axios from "axios";

const DogAPIEndpoint = "https://dog.ceo/api/breeds/image/random";

interface DogAPIResponse {
  message: string;
  status: string;
}

export default new Command({
  name: "dog",
  description: "Sends a Picture of a Dog",
  usage: "dog",
  category: "image",
  async execute(msg) {
    const resp = await axios.get(DogAPIEndpoint);
    const data: DogAPIResponse = resp.data;

    await msg.reply(data.message);
  },
});
