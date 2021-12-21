import { NextPage } from "next";
import Link from "next/link";
import NavbarProvider from "../../components/NavbarProvider";
import { useGetCategoriesQuery } from "../../generated/graphql";
import Head from "next/head";
import { withUrql } from "../../utils/withUrql";

interface CommandsPageProps {}

const CommandsPage: NextPage<CommandsPageProps> = () => {
  const [categories] = useGetCategoriesQuery();

  return (
    <NavbarProvider>
      <Head>
        <title>Commands | GoBot</title>
      </Head>
      <div className="text-center">
        <h1 className="text-5xl">Commands</h1>
        <br />
        <div>
          <h2 className="text-2xl">Categories</h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {categories.data?.getCategories.map((category, i) => (
              <Link href={`/commands/${category.name}`} passHref key={i}>
                <a className="cursor-pointer">
                  <div className="bg-zinc-800 hover:bg-slate-800 rounded-lg p-2">
                    <h3 className="text-xl">{category.name}</h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </NavbarProvider>
  );
};

export default withUrql(CommandsPage, { ssr: true });
