import { NextPage } from "next";
import Link from "next/link";
import NavbarProvider from "../../components/NavbarProvider";
import {
  GetCategoriesDocument,
  useGetCategoriesQuery,
} from "../../generated/graphql";
import Head from "next/head";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { SSRData, withUrqlClient } from "next-urql";
import { staticRender } from "../../utils/staticRender";

interface CommandsPageProps {}

const CommandsPage: React.FC<CommandsPageProps> = () => {
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
          <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {categories.data?.getCategories.map((category, i) => (
              <li key={i}>
                <Link href={`/commands/${category.name}`} passHref>
                  <a className="cursor-pointer">
                    <div className="bg-zinc-800 hover:bg-slate-800 rounded-lg p-2">
                      <h3 className="text-xl">{category.name}</h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NavbarProvider>
  );
};

export const getStaticProps = async () => {
  return await staticRender({ queries: [GetCategoriesDocument] });
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CommandsPage);
