import axios from "axios";
import { Message, MessageSelectOptionData, MessageActionRow, MessageSelectMenu, SelectMenuInteraction, MessageButton, MessageEmbed } from "discord.js";
import { CategoryResponseType, Quiz } from "./quizTypes";

export const unescape = (str: string) => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rsquo;/g, '"')
    .replace(/&#039;/g, "'");
};

export const getCategories = async () => {
  const res = await axios.get("https://opentdb.com/api_category.php");
  const { trivia_categories }: CategoryResponseType = res.data;
  return trivia_categories;
};

export const quizDifficulties = ["easy", "medium", "hard"];

export const quizAmount = 10;

export const askCategory = async (msg: Message): Promise<string> => {
  const options: MessageSelectOptionData[] = [];
  const quizCategories = await getCategories();
  for (let category in quizCategories) {
    options.push({
      label: quizCategories[category].name,
      value: quizCategories[category].id.toString(),
    });
  }

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setPlaceholder("Category")
      .addOptions(options)
      .setCustomId("category")
  );

  const menu = await msg.channel.send({
    content: "Select a Category",
    components: [row],
  });

  const interactionCollector = menu.createMessageComponentCollector();

  return new Promise<string>((resolve, _reject) => {
    interactionCollector.on("collect", (interaction: SelectMenuInteraction) => {
      const category = interaction.values[0] as string;
      row.components.forEach((c) => c.setDisabled(true));
      interaction.update({
        content: `You selected ${
          quizCategories.find((c) => c.id === parseInt(category))?.name
        }`,
        components: [row],
      });
      resolve(category);
    });
  });
};

export const askDifficulty = async (msg: Message) => {
  const options: MessageSelectOptionData[] = [];
  for (let difficulty in quizDifficulties) {
    options.push({
      label: quizDifficulties[difficulty],
      value: quizDifficulties[difficulty],
    });
  }

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setPlaceholder("Difficulty")
      .addOptions(options)
      .setCustomId("difficulty")
  );

  const menu = await msg.channel.send({
    content: "Select a Difficulty",
    components: [row],
  });

  const interactionCollector = menu.createMessageComponentCollector();

  return new Promise<string>((resolve, _reject) => {
    interactionCollector.on("collect", (interaction: SelectMenuInteraction) => {
      const difficulty = interaction.values[0];
      row.components.forEach((c) => c.setDisabled(true));
      interaction.update({
        content: `You selected ${difficulty}`,
        components: [row],
      });
      resolve(difficulty);
    });
  });
};

export const askQuestion = async (msg: Message, quiz: Quiz): Promise<boolean> => {
  const options: MessageButton[] = [];
  for (let answer of quiz.incorrect_answers) {
    options.push(
      new MessageButton()
        .setCustomId(answer)
        .setLabel(answer)
        .setStyle("PRIMARY")
    );
  }

  options.push(
    new MessageButton()
      .setCustomId(quiz.correct_answer)
      .setLabel(quiz.correct_answer)
      .setStyle("PRIMARY")
  );

  // shuffle the options randomly
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const row = new MessageActionRow().addComponents(options);

  const embed = new MessageEmbed().setTitle(quiz.question);

  const menu = await msg.channel.send({
    embeds: [embed],
    components: [row],
  });

  const interactionCollector = menu.createMessageComponentCollector();

  return new Promise<boolean>((resolve, _reject) => {
    interactionCollector.on("collect", (interaction) => {
      const { customId: answer } = interaction;
      const correct = answer === quiz.correct_answer;
      const userAnswer = correct ? "Correct" : "Incorrect";
      const embedColor = correct ? "GREEN" : "RED";

      const embed = new MessageEmbed()
        .setTitle(userAnswer)
        .addField("Your Answer", answer)
        .addField("Correct Answer", quiz.correct_answer)
        .setDescription(quiz.question)
        .setColor(embedColor);

      row.components.forEach((c) => c.setDisabled(true));

      interaction.update({
        embeds: [embed],
        components: [row],
      });

      resolve(correct);
    });
  });
};