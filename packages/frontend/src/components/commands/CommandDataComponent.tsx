import React from "react";
import Link from "next/link";
import { useGetCommandFromNameQuery } from "../../generated/graphql";

interface CommandDataComponentProps {
  category: string;
  commandName: string;
}

const CommandDataComponent: React.FC<CommandDataComponentProps> = ({
  category,
  commandName,
}) => {
  const [commandQuery] = useGetCommandFromNameQuery({
    variables: { commandName },
  });

  return (
    <div>
      <h1 className="text-3xl">Command {commandName}</h1>
      {/* Show command information */}
      {(() => {
        if (!commandQuery.data?.getCommandFromName) {
          return <p>Loading...</p>;
        }
        const { description, usage, examples, tags } =
          commandQuery.data.getCommandFromName;
        return (
          <>
            <h2 className="text-xl">Description</h2>
            <p>{description}</p>

            {usage && (
              <>
                <h2 className="text-xl">Usage</h2>
                <p className="inline bg-slate-800">{usage}</p>
              </>
            )}

            {examples && (
              <>
                <h2 className="text-xl">Examples</h2>
                <ul>
                  {examples?.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </>
            )}

            <ul>
              {tags?.map((tag, i) => (
                <li key={i} className="bg-slate-800 p-1 rounded">
                  {tag}
                </li>
              ))}
            </ul>
          </>
        );
      })()}

      <br />
      <div className="p-2 rounded bg-slate-800 inline-block">
        <Link passHref href={`/commands/${category}`}>
          <a>Return to Categories</a>
        </Link>
      </div>
    </div>
  );
};

export default CommandDataComponent;
