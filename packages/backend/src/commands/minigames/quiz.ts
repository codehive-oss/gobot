// Using quiz api https://opentdb.com/api_config.php
// https://opentdb.com/api_category.php
import { Command } from "@utils/commandTypes";
import {
  Message,
  MessageEmbed,
} from "discord.js";
import axios from "axios";
import { QuizResponseType } from "@utils/minigames/quiz/quizTypes";
import { askCategory, askDifficulty, askQuestion, quizAmount, unescape } from "@utils/minigames/quiz/quizUtils";


export default new Command({
  name: "quiz",
  description: "Play a quiz",
  usage: "quiz",
  category: "minigames",
  execute: async (msg: Message, _args: string[]) => {
    // Make the user select a difficulty and category
    const category = await askCategory(msg);
    const difficulty = await askDifficulty(msg);

    const url = `https://opentdb.com/api.php?amount=${quizAmount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await axios.get<QuizResponseType>(url);
    let quiz = response.data.results;

    //
    quiz.forEach((q) => {
      q.correct_answer = unescape(q.correct_answer);
      q.question = unescape(q.question);
      q.incorrect_answers.forEach((i) => (i = unescape(i)));
    });

    let correctAnswers = 0;
    // Ask the user a question
    for (let i = 0; i < quiz.length; i++) {
      const question = quiz[i];
      const correct = await askQuestion(msg, question);
      if (correct) {
        correctAnswers++;
      }
    }

    const embed = new MessageEmbed()
      .setTitle("Quiz Results")
      .setDescription(`You got ${correctAnswers} out of ${quizAmount} correct!`)
      .setColor("GREEN");

    msg.channel.send({ embeds: [embed] });
  },
});
