import { useGetCategoryCommandsQuery } from "../generated/graphql";
import Link from "next/link";

interface CommnadsListComponentProps {
  category: string;
}

const CommandsListComponent: React.FC<CommnadsListComponentProps> = ({
  category,
}) => {
  const commands = useGetCategoryCommandsQuery({
    variables: { category },
  })[0];

  return (
    <div>
      <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {commands.data?.getCategoryCommands.map((command, i) => {
          return (
            <Link
              href={`/commands/${category}/${command.name}`}
              passHref
              key={command.name}
            >
              <a className="p-4 bg-slate-800 hover:bg-slate-600 rounded">
                <li>
                  <h2 className="text-2xl">{command.name}</h2>
                  <p>{command.description}</p>
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CommandsListComponent;
