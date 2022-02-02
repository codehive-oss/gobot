"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = exports.askDifficulty = exports.askCategory = exports.quizAmount = exports.quizDifficulties = exports.getCategories = exports.unescape = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const unescape = (str) => {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&rsquo;/g, '"')
        .replace(/&#039;/g, "'");
};
exports.unescape = unescape;
const getCategories = async () => {
    const res = await axios_1.default.get("https://opentdb.com/api_category.php");
    const { trivia_categories } = res.data;
    return trivia_categories;
};
exports.getCategories = getCategories;
exports.quizDifficulties = ["easy", "medium", "hard"];
exports.quizAmount = 10;
const askCategory = async (msg) => {
    const options = [];
    const quizCategories = await (0, exports.getCategories)();
    for (let category in quizCategories) {
        options.push({
            label: quizCategories[category].name,
            value: quizCategories[category].id.toString(),
        });
    }
    const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
        .setPlaceholder("Category")
        .addOptions(options)
        .setCustomId("category"));
    const menu = await msg.channel.send({
        content: "Select a Category",
        components: [row],
    });
    const interactionCollector = menu.createMessageComponentCollector();
    return new Promise((resolve, _reject) => {
        interactionCollector.on("collect", (interaction) => {
            var _a;
            const category = interaction.values[0];
            row.components.forEach((c) => c.setDisabled(true));
            interaction.update({
                content: `You selected ${(_a = quizCategories.find((c) => c.id === parseInt(category))) === null || _a === void 0 ? void 0 : _a.name}`,
                components: [row],
            });
            resolve(category);
        });
    });
};
exports.askCategory = askCategory;
const askDifficulty = async (msg) => {
    const options = [];
    for (let difficulty in exports.quizDifficulties) {
        options.push({
            label: exports.quizDifficulties[difficulty],
            value: exports.quizDifficulties[difficulty],
        });
    }
    const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
        .setPlaceholder("Difficulty")
        .addOptions(options)
        .setCustomId("difficulty"));
    const menu = await msg.channel.send({
        content: "Select a Difficulty",
        components: [row],
    });
    const interactionCollector = menu.createMessageComponentCollector();
    return new Promise((resolve, _reject) => {
        interactionCollector.on("collect", (interaction) => {
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
exports.askDifficulty = askDifficulty;
const askQuestion = async (msg, quiz) => {
    const options = [];
    for (let answer of quiz.incorrect_answers) {
        options.push(new discord_js_1.MessageButton()
            .setCustomId(answer)
            .setLabel(answer)
            .setStyle("PRIMARY"));
    }
    options.push(new discord_js_1.MessageButton()
        .setCustomId(quiz.correct_answer)
        .setLabel(quiz.correct_answer)
        .setStyle("PRIMARY"));
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    const row = new discord_js_1.MessageActionRow().addComponents(options);
    const embed = new discord_js_1.MessageEmbed().setTitle(quiz.question);
    const menu = await msg.channel.send({
        embeds: [embed],
        components: [row],
    });
    const interactionCollector = menu.createMessageComponentCollector();
    return new Promise((resolve, _reject) => {
        interactionCollector.on("collect", (interaction) => {
            const { customId: answer } = interaction;
            const correct = answer === quiz.correct_answer;
            const userAnswer = correct ? "Correct" : "Incorrect";
            const embedColor = correct ? "GREEN" : "RED";
            const embed = new discord_js_1.MessageEmbed()
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
exports.askQuestion = askQuestion;
//# sourceMappingURL=quizUtils.js.map