import { DocumentNode } from "graphql";
import { client, ssrCache } from "./urqlClient";

interface GraphqlInput {
  document: DocumentNode;
  variables?: { [key: string]: any };
}
interface GetUrqlStateOptions {
  queries?: [GraphqlInput];
  mutations?: [GraphqlInput];
}

export const getUrqlState = async ({
  queries,
  mutations,
}: GetUrqlStateOptions) => {

  const graphqlPromises = [];
  if (queries) {
    for (const query of queries) {
      if (query) {
        graphqlPromises.push(
          client.query(query.document, query.variables).toPromise()
        );
      }
    }

    if (mutations) {
      for (const mutation of mutations) {
        graphqlPromises.push(
          client.mutation(mutation.document, mutation.variables).toPromise()
        );
      }
    }

    await Promise.all(graphqlPromises);

    return ssrCache.extractData();
  }
};
