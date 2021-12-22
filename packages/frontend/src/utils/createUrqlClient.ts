import { dedupExchange, fetchExchange, cacheExchange } from "urql";
import { backendUrl, __prod__ } from "./constants";
// TODO: Implement cacheExchange with graphcache
// https://formidable.com/open-source/urql/docs/graphcache/
// import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: `${backendUrl}/graphql`,
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
