import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import CommandsListComponent from "../../components/CommandsList";
import Link from "next/link";
import Head from "next/head";
import NavbarProvider from "../../components/NavbarProvider";
import { getUrqlState } from "../../utils/getUrqlState";
import {
  GetCategoriesQuery,
  GetCategoriesDocument,
  GetCategoryCommandsDocument,
} from "../../generated/graphql";
import { client } from "../../utils/urqlClient";

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urqlState = await getUrqlState({
    queries: [
      {
        document: GetCategoryCommandsDocument,
        variables: { category: params?.category },
      },
    ],
  });
  return {
    props: {
      urqlState,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const queryResult = await client
    .query<GetCategoriesQuery>(GetCategoriesDocument)
    .toPromise();

  // Check if the query was successful
  if (!queryResult.data) {
    return { fallback: false, paths: [] };
  }

  const categoryNames = queryResult.data.getCategories.map(
    (category) => category.name
  );
  const paths = categoryNames.map((category) => ({
    params: {
      category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default CategoryPage;
