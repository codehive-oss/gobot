import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ReactionRoleMessage extends BaseEntity {
    @PrimaryColumn()
    messageid: string;

    @Column()
    roleid: string;

    @Column()
    emoji: string;
}

export const getReactionRoleMessage = async (messageid: string) => {
    return await ReactionRoleMessage.findOne({where: {messageid: messageid}})
}

export const createReactionRoleMessage = async (messageid: string, roleid: string, emoji: string) => {
    const msg = await ReactionRoleMessage.create({messageid: messageid, roleid: roleid, emoji: emoji})
    await msg.save()
    return msg
}