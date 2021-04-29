const { AuthenticationError, UserInputError } = require("apollo-server");
const Project = require("../../models/Project");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPekerjaans(_, { projectId }, context) {
      const { username } = checkAuth(context);

      const project = await Project.findById(projectId);
      if (project) {
        if (project.username === username) {
          const pekerjaan = project.pekerjaans;
          return pekerjaan;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("project not found");
      }
    },
    async getPekerjaan(_, { projectId, pekerjaanId }, context) {
      const { username } = checkAuth(context);

      const project = await Project.findById(projectId);
      if (project) {
        if (project.username === username) {
          const pekerjaanIndex = project.pekerjaans.findIndex(
            (p) => p.id === pekerjaanId
          );
          return project.pekerjaans[pekerjaanIndex];
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("project not found");
      }
    },
  },

  Mutation: {
    async createPekerjaan(_, { projectId, nama, pj, startAt, endAt }, context) {
      const { username } = checkAuth(context);

      const project = await Project.findById(projectId);
      if (project) {
        project.pekerjaans.unshift({
          nama,
          pj,
          startAt,
          endAt,
          progres: "0",
          username,
          createdAt: new Date().toISOString(),
        });
        await project.save();
        return project;
      } else throw new UserInputError("project not found");
    },

    async deletePekerjaan(_, { projectId, pekerjaanId }, context) {
      const { username } = checkAuth(context);
      const project = await Project.findById(projectId);

      if (project) {
        const pekerjaanIndex = project.pekerjaans.findIndex(
          (p) => p.id === pekerjaanId
        );
        if (project.pekerjaans[pekerjaanIndex].username === username) {
          project.pekerjaans.splice(pekerjaanIndex, 1);
          await project.save();
          return project;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("project not found");
      }
    },
  },
};
