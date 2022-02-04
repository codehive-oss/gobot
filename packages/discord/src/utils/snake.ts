// import { Message, MessageReaction, User } from "discord.js";

// const Discord = require("discord.js");

// const WIDTH = 15;
// const HEIGHT = 10;
// const gameBoard: any[] = [];
// const apple = { x: 1, y: 1 };

// export class SnakeGame {
//   private snake: { x: number; y: number }[];
//   private snakeLength: number;
//   private gameEmbed: Message;
//   private score: number;
//   private inGame: boolean;

//   constructor() {
//     this.snake = [{ x: 5, y: 5 }];
//     this.snakeLength = 1;
//     this.score = 1;
//     this.inGame = false;
//     for (let y = 0; y < HEIGHT; y++) {
//       for (let x = 0; x < WIDTH; x++) {
//         gameBoard[y * WIDTH + x] = "◾";
//       }
//     }
//   }

//   gameBoardToString() {
//     let str = "";
//     for (let y = 0; y < HEIGHT; y++) {
//       for (let x = 0; x < WIDTH; x++) {
//         if (x == apple.x && y == apple.y) {
//           str += "🍎";
//           continue;
//         }

//         let flag = true;
//         for (let s = 0; s < this.snake.length; s++) {
//           if (x == this.snake[s].x && y == this.snake[s].y) {
//             str += "🟩";
//             flag = false;
//           }
//         }

//         if (flag) str += gameBoard[y * WIDTH + x];
//       }
//       str += "\n";
//     }
//     return str;
//   }

//   isLocInSnake(pos: { x: number; y: number }) {
//     return this.snake.find((sPos) => sPos.x == pos.x && sPos.y == pos.y);
//   }

//   newAppleLoc() {
//     let newApplePos = { x: 0, y: 0 };
//     do {
//       newApplePos = { x: Math.random() * WIDTH, y: Math.random() * HEIGHT };
//     } while (this.isLocInSnake(newApplePos));

//     apple.x = newApplePos.x;
//     apple.y = newApplePos.y;
//   }

//   start(message: Message) {
//     if (this.inGame) return;

//     this.inGame = true;
//     this.score = 1;
//     this.snakeLength = 1;
//     this.snake = [{ x: 5, y: 5 }];
//     this.newAppleLoc();
//     const embed = new Discord.MessageEmbed()
//       .setTitle("Click the Reactions to control the game!")
//       .setDescription(this.gameBoardToString())
//       .setTimestamp();

//     message.channel
//       .send({ content: "Hey", embeds: [embed] })
//       .then(async (emessage) => {
//         this.gameEmbed = emessage;
//         await this.gameEmbed.react("⬅️");
//         await this.gameEmbed.react("⬆️");
//         await this.gameEmbed.react("⬇️");
//         await this.gameEmbed.react("➡️");
//         await this.gameEmbed.react("❌");

//         this.waitForReaction();
//       });
//   }

//   async step() {
//     if (apple.x == this.snake[0].x && apple.y == this.snake[0].y) {
//       this.score += 1;
//       this.snakeLength++;
//       this.newAppleLoc();

//       for (let s = 0; s < this.snake.length; s++) {
//         if (apple.x == this.snake[s].x && apple.y == this.snake[s].y) {
//           this.newAppleLoc();
//         }
//       }
//     }

//     const editEmbed = new Discord.MessageEmbed()
//       .setTitle("Snake")
//       .setDescription(this.gameBoardToString())
//       .setTimestamp();
//     await this.gameEmbed.edit(editEmbed);

//     this.waitForReaction();
//   }

//   async gameOver() {
//     this.inGame = false;
//     const editEmbed = new Discord.MessageEmbed()
//       .setTitle("Snake")
//       .setDescription(`Game Over!\nScore: ${this.score}`)
//       .setTimestamp();
//     await this.gameEmbed.edit(editEmbed);

//     await this.gameEmbed.reactions.removeAll();
//   }

//   filter = (reaction: MessageReaction, user: User) => {
//     return (
//       ["⬅️", "⬆️", "⬇️", "➡️"].includes(reaction.emoji.name!) &&
//       user.id !== this.gameEmbed.author.id
//     );
//   };

//   waitForReaction() {
//     this.gameEmbed
//       .awaitReactions({
//         filter: this.filter,
//         max: 1,
//         time: 60000,
//         errors: ["time"],
//       })
//       .then(async (collected) => {
//         const reaction = collected.first();

//         const snakeHead = this.snake[0];
//         const nextPos = { x: snakeHead.x, y: snakeHead.y };
//         if (reaction!.emoji.name === "⬅️") {
//           let nextX = snakeHead.x - 1;
//           if (nextX < 0) nextX = WIDTH - 1;
//           nextPos.x = nextX;
//         } else if (reaction!.emoji.name === "⬆️") {
//           let nextY = snakeHead.y - 1;
//           if (nextY < 0) nextY = HEIGHT - 1;
//           nextPos.y = nextY;
//         } else if (reaction!.emoji.name === "⬇️") {
//           const nextY = snakeHead.y + 1;
//           if (nextY >= HEIGHT) nextPos.y = nextY;
//         } else if (reaction!.emoji.name === "➡️") {
//           const nextX = snakeHead.x + 1;
//           if (nextX >= WIDTH) nextPos.x = nextX;
//         }

//         reaction!.users
//           .remove(
//             reaction!.users.cache
//               .filter((user) => user.id !== this.gameEmbed.author.id)
//               .first()!.id,
//           )
//           .then(async () => {
//             if (this.isLocInSnake(nextPos)) {
//               await this.gameOver();
//             } else {
//               this.snake.unshift(nextPos);
//               if (this.snake.length > this.snakeLength) this.snake.pop();

//               await this.step();
//             }
//           });
//       })
//       .catch(async (error) => {
//         console.error(error);
//         await this.gameOver();
//       });
//   }
// }
