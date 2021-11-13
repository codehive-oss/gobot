import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Command = {
  __typename?: 'Command';
  aliases?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  usage?: Maybe<Scalars['String']>;
};

export type GoServer = {
  __typename?: 'GoServer';
  anime: Scalars['Boolean'];
  id: Scalars['String'];
  nsfw: Scalars['Boolean'];
  prefix: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  setAnime: GoServer;
  setNSFW: GoServer;
  setPrefix: GoServer;
};


export type MutationSetAnimeArgs = {
  anime: Scalars['Boolean'];
  serverID: Scalars['String'];
};


export type MutationSetNsfwArgs = {
  nsfw: Scalars['Boolean'];
  serverID: Scalars['String'];
};


export type MutationSetPrefixArgs = {
  prefix: Scalars['String'];
  serverID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Scalars['String']>;
  getCategoryCommands: Array<Command>;
  getCommands: Array<Command>;
};


export type QueryGetCategoryCommandsArgs = {
  category: Scalars['String'];
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<string> };

export type GetCategoryCommandsQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetCategoryCommandsQuery = { __typename?: 'Query', getCategoryCommands: Array<{ __typename?: 'Command', name: string, description: string, aliases?: Array<string> | null | undefined, usage?: string | null | undefined, category?: string | null | undefined }> };

export type GetCommandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommandsQuery = { __typename?: 'Query', getCommands: Array<{ __typename?: 'Command', name: string, description: string, aliases?: Array<string> | null | undefined, usage?: string | null | undefined, category?: string | null | undefined }> };


export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories
}
    `;

export function useGetCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoriesQuery>({ query: GetCategoriesDocument, ...options });
};
export const GetCategoryCommandsDocument = gql`
    query GetCategoryCommands($category: String!) {
  getCategoryCommands(category: $category) {
    name
    description
    aliases
    usage
    category
  }
}
    `;

export function useGetCategoryCommandsQuery(options: Omit<Urql.UseQueryArgs<GetCategoryCommandsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoryCommandsQuery>({ query: GetCategoryCommandsDocument, ...options });
};
export const GetCommandsDocument = gql`
    query GetCommands {
  getCommands {
    name
    description
    aliases
    usage
    category
  }
}
    `;

export function useGetCommandsQuery(options: Omit<Urql.UseQueryArgs<GetCommandsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommandsQuery>({ query: GetCommandsDocument, ...options });
};