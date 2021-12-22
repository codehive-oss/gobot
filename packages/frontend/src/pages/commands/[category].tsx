import { NextPage } from "next";
import { useRouter } from "next/router";
import CommandsListComponent from "../../components/CommandsList";
import Link from "next/link";
import Head from "next/head";
import NavbarProvider from "../../components/NavbarProvider";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface CategoryPageProps {}

const CategoryPage: NextPage<CategoryPageProps> = () => {
  const router = useRouter();
  const category = router.query.category as string;

  return (
    <NavbarProvider>
      <Head>
        <title>{category} | GoBot</title>
      </Head>
      <h1 className="text-3xl">{category} Commands</h1>
      <br />
      <CommandsListComponent category={category} />
      {/* Create a button that resets the selected category */}
      <br />
      <Link href="/commands" passHref>
        <a className="bg-slate-800 py-2 px-4 rounded">Back to all commands</a>
      </Link>
    </NavbarProvider>
  );
};

export default withUrqlClient(createUrqlClient, { staleWhileRevalidate: true })(CategoryPage);
