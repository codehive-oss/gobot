import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TempPenalty extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: string;

  @Column()
  guildID: string;

  @Column()
  reason: string;

  @Column({ type: "timestamptz" })
  expiresAt: Date;

  @Column()
  type: "Mute" | "Warning";
}
