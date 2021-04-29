const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const costumersResolvers = require("./costumers");
const workersResolvers = require("./workers");
const projectsResolvers = require("./projects");
const pekerjaansResolvers = require("./pekerjaans");
const materialsResolvers = require("./materials");
const toolsResolvers = require("./tools");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...costumersResolvers.Query,
    ...workersResolvers.Query,
    ...projectsResolvers.Query,
    ...pekerjaansResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...costumersResolvers.Mutation,
    ...workersResolvers.Mutation,
    ...projectsResolvers.Mutation,
    ...pekerjaansResolvers.Mutation,
    ...materialsResolvers.Mutation,
    ...toolsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
