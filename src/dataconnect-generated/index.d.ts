import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  movieListItem_insert: MovieListItem_Key;
}

export interface AddMovieToListVariables {
  movieListId: UUIDString;
  movieId: UUIDString;
  note?: string | null;
  position: number;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
}

export interface GetMoviesByGenreData {
  movies: ({
    id: UUIDString;
    title: string;
    year: number;
    summary?: string | null;
  } & Movie_Key)[];
}

export interface GetMoviesByGenreVariables {
  genre: string;
}

export interface GetPublicMovieListsData {
  movieLists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    user: {
      id: UUIDString;
      displayName: string;
      photoUrl?: string | null;
    } & User_Key;
  } & MovieList_Key)[];
}

export interface MovieListItem_Key {
  id: UUIDString;
  __typename?: 'MovieListItem_Key';
}

export interface MovieList_Key {
  id: UUIDString;
  __typename?: 'MovieList_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

interface GetPublicMovieListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicMovieListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicMovieListsData, undefined>;
  operationName: string;
}
export const getPublicMovieListsRef: GetPublicMovieListsRef;

export function getPublicMovieLists(): QueryPromise<GetPublicMovieListsData, undefined>;
export function getPublicMovieLists(dc: DataConnect): QueryPromise<GetPublicMovieListsData, undefined>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetMoviesByGenreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMoviesByGenreVariables): QueryRef<GetMoviesByGenreData, GetMoviesByGenreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMoviesByGenreVariables): QueryRef<GetMoviesByGenreData, GetMoviesByGenreVariables>;
  operationName: string;
}
export const getMoviesByGenreRef: GetMoviesByGenreRef;

export function getMoviesByGenre(vars: GetMoviesByGenreVariables): QueryPromise<GetMoviesByGenreData, GetMoviesByGenreVariables>;
export function getMoviesByGenre(dc: DataConnect, vars: GetMoviesByGenreVariables): QueryPromise<GetMoviesByGenreData, GetMoviesByGenreVariables>;

