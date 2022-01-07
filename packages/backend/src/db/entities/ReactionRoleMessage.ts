import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ReactionRoleMessage extends BaseEntity {
  @PrimaryColumn()
  messageID: string;

  @Column()
  roleID: string;

  @Column()
  emojiID: string;

  static getReactionRoleMessage = async (messageID: string) => {
    return await ReactionRoleMessage.findOne({
      where: { messageID: messageID },
    });
  };

  static createReactionRoleMessage = async (
    messageID: string,
    roleID: string,
    emojiID: string
  ) => {
    const msg = ReactionRoleMessage.create({
      messageID: messageID,
      roleID: roleID,
      emojiID: emojiID,
    });
    await msg.save();
    return msg;
  };
}
