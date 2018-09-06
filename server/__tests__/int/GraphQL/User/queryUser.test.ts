import { Server } from "http";
import * as http from "http";
import * as mongoose from "mongoose";
import * as request from "supertest";

// local
import App from "../../../../src/app";
import { graphQL as ql } from "../../../util";

// models
import { User } from "../../../../src/schema/types";

const server: Server = http.createServer(App);
let testUser: User | null = null;

describe("Query User", () => {
  beforeEach(() => {
    testUser = ql.testUserFactory();
  });

  afterEach((done) => {
    // Clean up the test database
    ql.clearDatabase(done);
  });

  it("should get newly created User by ID", async () => {
    function checkUserById(user: User): Promise<User> {
      const query: string = `
        query {
          user(id: "${user.id}") {
            firstName,
            lastName
          }
        }`;
      return ql.query(server, query, ql.resToUser);
    }
    const expectedResponse = {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    };
    // Create a user, then query based on its ID
    const createdUser: User = await ql.createTestUser(testUser);
    await expect(checkUserById(createdUser)).resolves.toEqual(expectedResponse);
  });

  it("should get newly created users", async () => {
    function checkUsers(): Promise<Array<User>> {
      const query: string = `
        query {
          users {
            edges {
              node {
                firstName,
                lastName
              }
            }
          }
        }`;
      return ql.query(server, query, ql.resToUsers);
    }
    const expectedResponse = [{
      firstName: testUser.firstName,
      lastName: testUser.lastName,
    }];
    // Create a user, then query all users
    const createdUser: User = await ql.createTestUser(testUser);
    await expect(checkUsers()).resolves.toEqual(expectedResponse);
  });
});
