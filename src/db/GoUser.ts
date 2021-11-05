import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "discord.js";

@Entity()
export class GoUser extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  item: number[];

  @Column()
  balance: number;
}


export async function getUser(user: User) : Promise<GoUser | undefined> {
    return await GoUser.findOne({where: {id: user.id}})
}

export async function createUser(user: User) {

    if(await getUser(user)) {
        return
    }

    const newUser = GoUser.create({
        id: user.id,
        balance: 0,
        item: []
    })

    return await newUser.save()

}

export const upsert = async (user: User) => {
  const goUser = await getUser(user);
  if (goUser) {
    return goUser;
  } else {

    return await createUser(user);

  }
};
