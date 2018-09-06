/* tslint:disable */

/* Helper types */
export type Date = any;
/* Relay common types */
export interface Node {
  id: string;
}
/* Root Query type */
export interface Query {
  node?: Node | null /* Relay signatures */;
  user?: User | null /* Model signatures */;
  users?: UserConnection | null;
}
/* Base User type */
export interface User extends Node {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserConnection {
  pageInfo?: PageInfo | null;
  edges?: UserEdge[] | null;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}
/* User Queries */
export interface UserEdge {
  node: User;
  cursor: string;
}
/* Root Mutation type */
export interface Mutation {
  introduceUser?: IntroduceUserPayload | null;
}

export interface IntroduceUserPayload {
  user: User;
  clientMutationId: string;
}

export interface IntroduceUserInput {
  userInput: UserInput;
  clientMutationId: string;
}
/* User Mutations */
export interface UserInput {
  firstName: string;
  lastName: string;
}

export interface ConnectionArgs {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}
export interface NodeQueryArgs {
  id: string;
}
export interface UserQueryArgs {
  id: string;
}
export interface UsersQueryArgs {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
export interface IntroduceUserMutationArgs {
  input?: IntroduceUserInput | null;
}
