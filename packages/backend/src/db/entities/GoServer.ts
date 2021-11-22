import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class GoServer extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ default: "go " })
  prefix: string;

  @Field()
  @Column({ default: false })
  nsfw: boolean;

  @Field()
  @Column({ default: false })
  anime: boolean;
}

export const getServer = async (
  serverid: string
): Promise<GoServer | undefined> => {
  return await GoServer.findOne({ where: { id: serverid } });
};

export const toGoServer = async (serverid: string) => {
  let goServer = await getServer(serverid);
  if (goServer) {
    return goServer;
  }

  goServer = GoServer.create({
    id: serverid,
  });

  await goServer.save();
  return goServer;
};

export const createServers = async (serverids: string[]) => {
  const servers = await GoServer.find({ where: { id: serverids } });
  const serversToCreate = serverids.filter(
    (id) => !servers.some((s) => s.id === id)
  );
  const serversToSave = GoServer.create(serversToCreate.map((id) => ({ id })));
  await GoServer.save(serversToSave);
  
  return serversToSave.length;
};

export const setPrefix = async (server: GoServer, prefix: string) => {
  server.prefix = prefix;
  await server.save();
};

export const setAnime = async (server: GoServer, anime: boolean) => {
  server.anime = anime;
  await server.save();
};

export const setNSFW = async (server: GoServer, nsfw: boolean) => {
  server.nsfw = nsfw;
  await server.save();
};
