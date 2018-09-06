import UserResolvers from "./User";

// Model Resolvers
const resolvers: [object] = [
  UserResolvers,
];

export default resolvers.reduce((reduced, obj) => {
  return Object.assign({}, reduced, obj);
}, {});
