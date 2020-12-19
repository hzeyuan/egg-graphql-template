type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Query = {
  __typename?: 'Query';
  q?: Maybe<Info>;
};


type QueryQArgs = {
  id?: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  m?: Maybe<Info>;
};


type MutationMArgs = {
  input?: Maybe<Minput>;
};

type Minput = {
  id?: Maybe<Scalars['String']>;
};

type Info = {
  __typename?: 'Info';
  id?: Maybe<Scalars['String']>;
};
