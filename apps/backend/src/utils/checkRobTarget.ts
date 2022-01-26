import { User } from "discord.js";

export const checkRobTarget = (target: User | undefined, user: User) => {
  // If no user is mentioned
  if (!target) {
    return "You need to mention someone to rob!";
  }

  // Check if the user is trying to rob themselves
  if (target.id === user.id) {
    return "You can't rob yourself!";
  }

  return null;
};
