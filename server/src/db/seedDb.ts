import {
  ConnectionArgs,
  User,
  UserConnection,
} from "../schema/types";
import { seedData } from "./seedData";

import { close, initialize } from "./index";
import { createUser, readUsers } from "./User";

// Constants
const AMOUNT_OF_USERS = 16;
const AMOUNT_OF_TEAMS = 8;
const AMOUNT_OF_GAMES = 200;
const WILL_WRITE_USERS: boolean = true;
const WILL_WRITE_TEAMS: boolean = true;
const WILL_WRITE_GAMES: boolean = true;

// Get the DB address
const dbAddr: string | null = process.env.DB_ADDR;
if (!dbAddr) {
  throw new Error("Application cannot be run without DB_ADDR set.");
} else {
  this.dbAddr = dbAddr;
}

console.log("Seeding DB data to: " + dbAddr);

const getRandomIndex = (len: number) => {
  return Math.floor(Math.random() * len);
};

async function readUsersFromDatabase() {
  return (await (await readUsers({})).edges).map((e) => e.node);
}

// Instantiate new users
const camelize = (toCamelize: string) => {
  return toCamelize.charAt(0) + toCamelize.slice(1).toLowerCase();
};

const { firstNames, lastNames } = seedData;
const usersToWrite: User[] = new Array(AMOUNT_OF_USERS)
  .fill(0)
  .map((_) => {
    const firstName: string =
      camelize(firstNames[getRandomIndex(firstNames.length)]);
    const lastName: string =
      camelize(lastNames[getRandomIndex(lastNames.length)]);
    return { firstName, lastName } as User;
  });

// Perform operations on database

async function readFromDatabase(readFn: any) {
  return (await (await readFn({})).edges).map((e: any) => e.node);
}

async function writeToDatabase(writeFn: any, toWrites: any[], shouldWrite: boolean) {
  if (shouldWrite) {
    return toWrites
      .reduce((p, x) => p.then(async (i: any) => await writeFn(x)), Promise.resolve())
      .catch((e: any) => console.error("Failed to write: " + e));
  } else {
    return;
  }
}

async function writeModelsToDb() {
  await initialize(dbAddr);
  // Users
  await writeToDatabase(createUser, usersToWrite, WILL_WRITE_USERS);
  const users: User[] = await readFromDatabase(readUsers);
  console.log(users.length + " users read from DB.");
  close();
}

writeModelsToDb();
