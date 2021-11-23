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

export type Category = {
  __typename?: 'Category';
  description: Scalars['String'];
  name: Scalars['String'];
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

export type GuildData = {
  __typename?: 'GuildData';
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GuildDataPayload = {
  __typename?: 'GuildDataPayload';
  goServer: GoServer;
  guildData: GuildData;
};

export type Mutation = {
  __typename?: 'Mutation';
  setAnime: GoServer;
  setNSFW: GoServer;
  setPrefix: GoServer;
  updateServer: Scalars['Boolean'];
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


export type MutationUpdateServerArgs = {
  serverID: Scalars['String'];
  updateServerInput: UpdateServerInput;
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategoryCommands: Array<Command>;
  getCommands: Array<Command>;
  getGuildDataPayloadFromID: GuildDataPayload;
  getUserData: UserData;
  getUserGuilds: Array<GuildData>;
  logoutUser: Scalars['Boolean'];
};


export type QueryGetCategoryCommandsArgs = {
  category: Scalars['String'];
};


export type QueryGetGuildDataPayloadFromIdArgs = {
  serverID: Scalars['String'];
};

export type UpdateServerInput = {
  anime: Scalars['Boolean'];
  nsfw: Scalars['Boolean'];
  prefix: Scalars['String'];
};

export type UserData = {
  __typename?: 'UserData';
  avatar: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', name: string, description: string }> };

export type GetCategoryCommandsQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetCategoryCommandsQuery = { __typename?: 'Query', getCategoryCommands: Array<{ __typename?: 'Command', name: string, description: string, aliases?: Array<string> | null | undefined, usage?: string | null | undefined, category?: string | null | undefined }> };

export type GetCommandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommandsQuery = { __typename?: 'Query', getCommands: Array<{ __typename?: 'Command', name: string, description: string, aliases?: Array<string> | null | undefined, usage?: string | null | undefined, category?: string | null | undefined }> };

export type GetGuildDataPaylaodFromIdQueryVariables = Exact<{
  serverID: Scalars['String'];
}>;


export type GetGuildDataPaylaodFromIdQuery = { __typename?: 'Query', getGuildDataPayloadFromID: { __typename?: 'GuildDataPayload', guildData: { __typename?: 'GuildData', icon?: string | null | undefined, name: string }, goServer: { __typename?: 'GoServer', prefix: string, nsfw: boolean, anime: boolean } } };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', getUserData: { __typename?: 'UserData', id: string, username: string, avatar: string } };

export type GetUserGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGuildsQuery = { __typename?: 'Query', getUserGuilds: Array<{ __typename?: 'GuildData', id: string, icon?: string | null | undefined, name: string }> };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser: boolean };

export type UpdateServerMutationVariables = Exact<{
  serverID: Scalars['String'];
  serverInput: UpdateServerInput;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer: boolean };


export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    name
    description
  }
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
export const GetGuildDataPaylaodFromIdDocument = gql`
    query GetGuildDataPaylaodFromID($serverID: String!) {
  getGuildDataPayloadFromID(serverID: $serverID) {
    guildData {
      icon
      name
    }
    goServer {
      prefix
      nsfw
      anime
    }
  }
}
    `;

export function useGetGuildDataPaylaodFromIdQuery(options: Omit<Urql.UseQueryArgs<GetGuildDataPaylaodFromIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGuildDataPaylaodFromIdQuery>({ query: GetGuildDataPaylaodFromIdDocument, ...options });
};
export const GetUserDataDocument = gql`
    query GetUserData {
  getUserData {
    id
    username
    avatar
  }
}
    `;

export function useGetUserDataQuery(options: Omit<Urql.UseQueryArgs<GetUserDataQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserDataQuery>({ query: GetUserDataDocument, ...options });
};
export const GetUserGuildsDocument = gql`
    query GetUserGuilds {
  getUserGuilds {
    id
    icon
    name
  }
}
    `;

export function useGetUserGuildsQuery(options: Omit<Urql.UseQueryArgs<GetUserGuildsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserGuildsQuery>({ query: GetUserGuildsDocument, ...options });
};
export const LogoutUserDocument = gql`
    query LogoutUser {
  logoutUser
}
    `;

export function useLogoutUserQuery(options: Omit<Urql.UseQueryArgs<LogoutUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LogoutUserQuery>({ query: LogoutUserDocument, ...options });
};
export const UpdateServerDocument = gql`
    mutation UpdateServer($serverID: String!, $serverInput: UpdateServerInput!) {
  updateServer(serverID: $serverID, updateServerInput: $serverInput)
}
    `;

export function useUpdateServerMutation() {
  return Urql.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument);
};