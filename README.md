# TReMBO
> Typescript RElay Mongoose Boilerplate

A turn-key boilerplate that works out of the box to build web applications with
a TypeScript GraphQL backend and a React/Relay front-end.

The application is pre-built with Users, which are objects with a `firstName` and `lastName` field.

## Installing / Getting started

Install all dependencies of the project.

```shell
npm i
```

Follow configuration steps below to configure TREMBO.

Both `NODE_ENV` and `DB_ADDR` environment variables must be set before the `start` command can be run on a TREMBO server.

`NODE_ENV` can be `dev`, `prod`, or `test`.

`DB_ADDR` must point to the address of an accessible and running instance of MongoDB (e.g. `mongodb://127.0.0.1:27017/trembo`).

```shell
npm build
DB_ADDR=... NODE_ENV=... npm start
```

There are also convenience scripts available to do this for you located at `scripts/`. As detailed in the configuration section, these need to be configured before they can be useful.

### Initial Configuration

*Note:* Yarn may need to be installed on your system to complete the following.

Getting a TREMBO configured for development is simple.

Replace the placeholder database names in the script with the path of the local test and local development database you're using. Note that you need an accessible running instance of MongoDB running in order to use TREMBO.

Your test and development database path can be the same (though this is not
recommended).

```shell
# scripts/runIntTestsLocally
...DB_ADDR='mongodb://127.0.0.1:27017/trembo-test'...
# scripts/runServerLocally
...DB_ADDR='mongodb://127.0.0.1:27017/trembo'...
# scripts/seedLocalDb
...DB_ADDR='mongodb://127.0.0.1:27017/trembo'...
```

Clean the project directory and make sure the project builds.

*Note*: The build command may need to be run more than once to work correctly.

```shell
npm run-script clean
npm run-script build
```

Run tests to ensure they pass.

```shell
scripts/runIntTestLocally
```

## Development

TREMBO ships with a `watch` command available for builds.

```shell
npm run-script build:be:watch
npm run-script build:fe:watch
```

While these are running, changes made to the backend or front-end code will trigger re-builds automatically.

Start the server:

```shell
scripts/runServerLocally
```

The codebase is split into sections:

```
app/                     <-- The React code lives here
scripts/                 <-- Convenience scripts for starting and testing code
server/                  <-- The TypeScript/GraphQL code lives here
```

### Backend development

The backend server is largely written in TypeScript, and can be found at `server/`.

This part of the project is organized as following:

```
__tests__/               <-- Tests, written in Jest by default, live here
  |_ int/                <-- Integration tests live here
    |_ GraphQL/          <-- GraphQL integration tests for testing queries,
                             mutations, etc.
  |_ util/               <-- A custom testing package to help test the project
src/
|_ controllers/          <-- All controllers, including the GraphQL controller
|_ db/                   <-- Define a set of necessary converters, operations,
                             and pagination methods for queries (see below).
  |_ connection.ts       <-- Defines Relay connection specific methods
  |_ seedDb.ts           <-- Script for seeding the database with data
  |_ seedData.ts         <-- Large data blob with seed data for the database
|_ models/               <-- Mongoose data models are defined here. By design,
                             they should look a lot like your GraphQL models.
|_ resolvers/            <-- Define methods the GraphQL schema will resolve to.
|_ schema/               <-- GraphQL schema segments and types.
  |_ Common.graphql      <-- Defines necessary GraphQL types for Relay.
  |_ types.ts            <-- An auto-generated Types file (from your schema).
|_ util/
  |_ graphql/            <-- Defines utility methods for GraphQL. For instance,
                             loading a .graphql into memory as a Schema.
app.ts                   <-- The entry point for the application.
logger.ts                <-- Logging helper object.
```

#### I want to add a new object!

TREMBO offers only `User` objects out of the box, which allows you to add and query User objects using the GraphQL endpoint. A `User` has only a `firstName` and `lastName` property out of the box.

The following changes must be made for new objects:

1. GraphQL Schema

Define a new GraphQL schema object in `schema/` (e.g. `schema/Object.graphql`).

Run `npm run-script build:be` to refresh the `types.ts` file.

Update the root Query and Mutation section of `Common.graphql`.

*Note:* Remember to update `index.ts` with the new object.

2. Mongoose MongoDB Model

Define a corresponding Mongoose MongoDB Document in `db/`.

*Note:* Remember to update `index.ts` with the new object.

3. Resolvers

Define a corresponding set of resolvers for GraphQL to resolve queries and mutations to methods. For the most part, you can look to `User.ts` as a direct influence here.

4. Optional: Tests

Write a new suite of GraphQL tests for your new Object in `__tests__/int/GraphQL/Object`.

*Note:* You can run `npm run-script test:watch` to facilitate test development.

## Contributing

If you'd like to contribute to this project, please first check the open issues.
Issues labelled "help wanted" should be perfect for first-time contributors. If you don't find an issue covering the contribution you'd like to make, feel free to create a new issue and follow the template.

Before submitting a code change, be sure to check for style changes and tests.

```shell
npm test
npm run lint
```

## Links

- Project homepage: https://github.com/jamesroseman/trembo/blob/master/README.md
- Repository: https://github.com/jamesroseman/trembo
- Issue tracker: https://github.com/jamesroseman/trembo/issues

## Used By

Feel free to submit a pull request to add to this list.

* [SSOLD](https://github.com/hapinetwork/ssold)

## Licensing

MIT
