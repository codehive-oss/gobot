import {
  DMChannel,
  PartialDMChannel,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";

export type Channel =
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | TextChannel
  | ThreadChannel;
