
import { BaseEntity,  Column,  Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DiscordServer extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  prefix: string;

  @Column()
  nsfw: boolean;

  @Column()
  anime: boolean;
}

