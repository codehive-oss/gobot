import { Guild } from "../../generated/graphql";
import Image from "next/image";

interface GuildListComponentProps {
  guilds: Guild[];
}

const GuildListComponent: React.FC<GuildListComponentProps> = ({ guilds }) => {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-3">
        {guilds.map((guild) => (
          <li className="bg-gray-900 rounded p-8" key={guild.id}>
            <div className="flex justify-between">
              <p className="text-2xl">{guild.name}</p>
              {guild.icon && (
                <Image
                  className="rounded-full"
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  width={64}
                  height={64}
                  alt="Guild Image"
                />
              )}
            </div>
            {/* <p>ID: {guild.id}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuildListComponent;
