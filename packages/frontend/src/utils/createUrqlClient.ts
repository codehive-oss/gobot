import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { backendUrl, __prod__ } from "../utils/constants";
import { cacheExchange } from "@urql/exchange-graphcache";
import { isServerSide } from "./isServerSide";

const ssr = ssrExchange({
  isClient: !isServerSide,
});

const cache = cacheExchange({
  updates: {},
});

export const createUrqlClient = () =>
  createClient({
    url: `${backendUrl}/graphql`,
    exchanges: [dedupExchange, cache, ssr, fetchExchange],
  });
