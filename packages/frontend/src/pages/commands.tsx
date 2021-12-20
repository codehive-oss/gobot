import { NextPage } from "next";
import { useState } from "react";
import CommnadsListComponent from "../components/CommandsList";
import NavbarProvider from "../components/NavbarProvider";
import { useGetCategoriesQuery } from "../generated/graphql";
import Head from "next/head";
import { withUrql } from "../utils/withUrql";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  const [categories] = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <NavbarProvider>
      <Head>
        <title>
          {(selectedCategory ? selectedCategory : "Commands") + " | GoBot"}
        </title>
      </Head>
      <div className="text-center">
        <h1 className="text-5xl">Commands</h1>
        <br />
        {selectedCategory ? (
          <>
            <CommnadsListComponent category={selectedCategory} />
            {/* Create a button that resets the selected category */}
            <br />
            <button
              className="bg-gray-800 py-2 px-4 rounded"
              type="button"
              onClick={() => setSelectedCategory(undefined)}
            >
              Back to all commands
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-2xl">Categories</h2>
            <br />  
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {categories.data?.getCategories.map((category, i) => (
                <div
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="bg-zinc-800 hover:bg-slate-800 rounded-lg p-2">
                    <h3 className="text-xl">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </NavbarProvider>
  );
};

export default withUrql(CommandsPage, { ssr: true });
