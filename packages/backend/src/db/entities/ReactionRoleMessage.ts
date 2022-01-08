import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReactionRoleMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  messageID: string;

  @Column()
  roleID: string;

  @Column()
  emojiID: string;

  static getReactionRoleMessage = async (messageID: string) => {
    return await ReactionRoleMessage.find({
      where: { messageID: messageID },
    });
  };
}
