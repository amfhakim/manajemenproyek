const Project = require("../../models/Project");
const Costumer = require("../../models/Costumer");
const Worker = require("../../models/Worker");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("Apollo-server");
const { validateProjectInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getProjects() {
      try {
        const projects = await Project.find().sort({ createdAt: -1 });
        return projects;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getProject(_, { projectId }) {
      try {
        const project = await Project.findById(projectId);
        if (project) {
          return project;
        } else {
          throw new Error("Project not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createProject(
      _,
      {
        projectInput: {
          nama,
          alamat,
          namaCostumer,
          budget,
          startAt,
          endAt,
          namaWorkers,
        },
      },
      context
    ) {
      const user = checkAuth(context);

      //input tidak boleh kosong
      const { valid, errors } = validateProjectInput(
        nama,
        alamat,
        namaCostumer,
        budget,
        startAt,
        endAt
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //validate costumer, kalau belum terdaftar, daptar dulu coy
      const costumer = await Costumer.findOne({ nama: namaCostumer });
      if (!costumer) {
        throw new UserInputError("costumer belum terdaftar", {
          errors: {
            costumer: "costumer belum terdaftar",
          },
        });
      }

      //validate workers (belon bisa else wkwk)
      const workers = await Worker.find();
      const workerIds = await [];
      for (i = 0; i < namaWorkers.length; i++) {
        workers.map((wr) => {
          if (namaWorkers[i] === wr.nama) {
            workerIds.push(wr.id);
          }
        });
      }

      //membuat project
      const newProject = new Project({
        nama,
        alamat,
        namaCostumer,
        budget,
        startAt,
        endAt,
        progres: "0",
        namaWorkers,
        workers: workerIds,
        costumer: costumer.id,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await newProject.save();
      return newProject;
    },

    async deleteProject(_, { projectId }, context) {
      const user = checkAuth(context);
      try {
        const project = await Project.findById(projectId);
        if (user.username === project.username) {
          await project.delete();
          return "data project berhasil dihapus";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
