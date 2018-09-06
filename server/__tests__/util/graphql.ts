import { Server } from "http";
import * as request from "supertest";

// local
import * as Db from "../../src/db";

// models
import { UserModel } from "../../src/models";
import { User } from "../../src/schema/types";

// Different data interfaces depending on request
interface IDataResponse {
  body: {
    errors: any;
    data: object;
  };
}
interface IDataNode<T> { node: T; }
interface IDataEdges<T> { edges: Array<IDataNode<T>>; }

export function query<T>(
  server: Server,
  q: string,
  transformRes: (res: any) => T,
  variables?: object,
): Promise<T> {
  let body: object = { query: q };
  if (variables) {
    body = { query: q, variables };
  }
  return request(server)
    .post("/api/graphql")
    .set("content-type", "application/json")
    .send(body)
    .expect(200)
    .then((res: IDataResponse) => {
      return res.body.data;
    })
    .then(transformRes);
}

// Helper functions to transform query responses into desired data types.
export function resToUser(res: { user: User }): User {
  return res.user as User;
}
export function resToUsers(res: { users: IDataEdges<User> }): User[] {
  return res.users.edges.map((n: IDataNode<User>) => n.node) as User[];
}

// Helper function to clean database between each test
export async function clearDatabase(callback?: any): Promise<void> {
  await UserModel.remove({}).exec();
  return await callback();
}

// Helper static object factories to quickly add a User or Team or Game
// We return the model interfaces here because they don't have IDs
const fakeIdToOverwrite: string = "123";
export function testUserFactory(firstName?: string, lastName?: string): User {
  return {
    firstName: firstName || "testFirstName",
    id: fakeIdToOverwrite,
    lastName: lastName || "testLastName",
  } as User;
}
export async function createTestUser(user?: User): Promise<User> {
  if (!user) {
    user = testUserFactory();
  }
  return Db.createUser(user);
}
