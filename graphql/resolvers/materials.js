const { AuthenticationError, UserInputError } = require("apollo-server");
const Project = require("../../models/Project");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    async createMaterial(
      _,
      { projectId, pekerjaanId, nama, jenis, jumlah, satuan, harga },
      context
    ) {
      const { username } = checkAuth(context);

      const project = await Project.findById(projectId);
      if (project) {
        const pekerjaanIndex = project.pekerjaans.findIndex(
          (p) => p.id === pekerjaanId
        );
        if (project.pekerjaans[pekerjaanIndex]) {
          project.pekerjaans[pekerjaanIndex].materials.unshift({
            nama,
            jenis,
            jumlah,
            satuan,
            harga,
            totalHarga: parseInt(harga) * parseInt(jumlah),
            username,
            createdAt: new Date().toISOString(),
          });
          await project.save();
          return project;
        } else throw new UserInputError("pekerjaan not found");
      } else throw new UserInputError("project not found");
    },

    async deleteMaterial(_, { projectId, pekerjaanId, materialId }, context) {
      const { username } = checkAuth(context);
      const project = await Project.findById(projectId);

      if (project) {
        if (project.username === username) {
          const pekerjaanIndex = project.pekerjaans.findIndex(
            (p) => p.id === pekerjaanId
          );
          if (project.pekerjaans[pekerjaanIndex]) {
            const materialIndex = project.pekerjaans[
              pekerjaanIndex
            ].materials.findIndex((m) => m.id === materialId);
            if (project.pekerjaans[pekerjaanIndex].materials[materialIndex]) {
              project.pekerjaans[pekerjaanIndex].materials.splice(
                materialIndex,
                1
              );
              await project.save();
              return project;
            } else {
              throw new UserInputError("material not found");
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
