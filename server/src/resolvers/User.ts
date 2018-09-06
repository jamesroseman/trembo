import * as Db from "../db";

// models
import {
  ConnectionArgs,
  IntroduceUserInput,
  IntroduceUserMutationArgs,
  IntroduceUserPayload,
  User,
  UserConnection,
  UserQueryArgs,
} from "../schema/types";

/* Root */

export default {
  introduceUser: (args: IntroduceUserMutationArgs) => introduceUser(args.input),
  user: (args: UserQueryArgs) => getUserById(args.id),
  users: (args: ConnectionArgs) => getUsers(args),
};

/* Query */

function getUserById(id: string): Promise<User> {
  return Db.readUserById(id);
}

function getUsers(args: ConnectionArgs): Promise<UserConnection> {
  return Db.readUsers(args);
}

/* Mutation */

function introduceUser(
  input: IntroduceUserInput,
): Promise<IntroduceUserPayload> {
    const { firstName, lastName } = input.userInput;
    const user: User = { firstName, lastName } as User;
    return Db
      .createUser(user)
      .then((createdUser: User) => ({
        clientMutationId: input.clientMutationId,
        user: createdUser,
      } as IntroduceUserPayload));
}
