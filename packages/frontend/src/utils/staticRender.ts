import { DocumentNode } from "graphql";
import { initUrqlClient } from "next-urql";
import { ssrExchange } from "urql";
import { createUrqlClient } from "./createUrqlClient";

interface StaticRenderOptions {
  queries?: [DocumentNode];
  mutations?: [DocumentNode];
}

export const staticRender = async ({
  queries,
  mutations,
}: StaticRenderOptions) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(createUrqlClient(ssrCache), false);

  if (!client) {
    throw new Error("Could not initialize urql client");
  }

  if (queries) {
    for (const query of queries) {
      await client.query(query).toPromise();
    }
  }

  if (mutations) {
    for (const mutation of mutations) {
      await client.mutation(mutation).toPromise();
    }
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
};
