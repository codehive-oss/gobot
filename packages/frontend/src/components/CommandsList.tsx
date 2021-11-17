import {
  useGetCategoryCommandsQuery,
} from "../generated/graphql";

interface CommnadsListComponentProps {
  category: string;
}

const CommnadsListComponent: React.FC<CommnadsListComponentProps> = ({
  category,
}) => {
  const commands = useGetCategoryCommandsQuery({
    variables: { category },
  })[0];

  return (
    <div>
      <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {commands.data?.getCategoryCommands.map((command, i) => {
          return (
            <li className="p-4" key={i}>
              <h2 className="text-2xl">{command.name}</h2>
              <p>{command.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommnadsListComponent;
