const { AuthenticationError, UserInputError } = require("apollo-server");
const Project = require("../../models/Project");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    async createTool(
      _,
      { projectId, pekerjaanId, nama, jumlah, hargaSewa, totalHarga },
      context
    ) {
      const { username } = checkAuth(context);

      const project = await Project.findById(projectId);
      if (project) {
        const pekerjaanIndex = project.pekerjaans.findIndex(
          (p) => p.id === pekerjaanId
        );
        if (project.pekerjaans[pekerjaanIndex]) {
          project.pekerjaans[pekerjaanIndex].tools.unshift({
            nama,
            jumlah,
            hargaSewa,
            totalHarga,
            username,
            createdAt: new Date().toISOString(),
          });
          await project.save();
          return project;
        } else throw new UserInputError("pekerjaan not found");
      } else throw new UserInputError("project not found");
    },

    async deleteTool(_, { projectId, pekerjaanId, toolId }, context) {
      const { username } = checkAuth(context);
      const project = await Project.findById(projectId);

      if (project) {
        if (project.username === username) {
          const pekerjaanIndex = project.pekerjaans.findIndex(
            (p) => p.id === pekerjaanId
          );
          if (project.pekerjaans[pekerjaanIndex]) {
            const toolIndex = project.pekerjaans[
              pekerjaanIndex
            ].tools.findIndex((t) => t.id === toolId);
            if (project.pekerjaans[pekerjaanIndex].tools[toolIndex]) {
              project.pekerjaans[pekerjaanIndex].tools.splice(toolIndex, 1);
              await project.save();
              return project;
            } else {
              throw new UserInputError("alat not found");
            }
          } else {
            throw new UserInputError("pekerjaan not found");
          }
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("project not found");
      }
    },
  },
};
