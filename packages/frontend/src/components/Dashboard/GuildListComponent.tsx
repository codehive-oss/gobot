import { Guild } from "../../generated/graphql";
import Image from "next/image";
import Link from "next/link";

interface GuildListComponentProps {
  guilds: Guild[];
}

const GuildListComponent: React.FC<GuildListComponentProps> = ({ guilds }) => {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-3">
        {guilds.map((guild) => (
          <Link passHref href={`dashboard/${guild.id}`} key={guild.id}>
            <li className="btn bg-gray-900 rounded p-8">
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
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GuildListComponent;
