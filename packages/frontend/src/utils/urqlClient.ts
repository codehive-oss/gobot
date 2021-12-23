import {
  dedupExchange,
  fetchExchange,
  cacheExchange,
  ssrExchange,
  createClient,
} from "urql";
import { backendUrl, __prod__ } from "./constants";
import { isServerSide } from "./isServerSide";
// TODO: Implement cacheExchange with graphcache
// https://formidable.com/open-source/urql/docs/graphcache/
// import { cacheExchange } from "@urql/exchange-graphcache";

export const ssrCache = ssrExchange({ isClient: !isServerSide() });
export const client = createClient({
  url: `${backendUrl}/graphql`,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});
