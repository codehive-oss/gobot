import { dedupExchange, fetchExchange, cacheExchange } from "urql";
import { backendUrl, __prod__ } from "./constants";
// TODO: Implement cacheExchange with graphcache
// https://formidable.com/open-source/urql/docs/graphcache/
// import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient, WithUrqlClientOptions } from "next-urql";
import { NextPage } from "next";

export const withUrql = (page: NextPage, options?: WithUrqlClientOptions) =>
  withUrqlClient(
    (ssrExchange) => ({
      url: `${backendUrl}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
    }),
    options
  )(page);
