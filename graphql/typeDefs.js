const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Costumer {
    id: ID!
    nama: String!
    alamat: String!
    noktp: String!
    notlp: String!
    email: String!
    createdAt: String!
    username: String!
  }
  input CostumerInput {
    nama: String!
    alamat: String!
    noktp: String!
    notlp: String!
    email: String!
  }

  type Worker {
    id: ID!
    nama: String!
    alamat: String!
    noktp: String!
    notlp: String!
    email: String!
    jabatan: String!
    gaji: String!
    createdAt: String!
    username: String!
  }
  input WorkerInput {
    nama: String!
    alamat: String!
    noktp: String!
    notlp: String!
    email: String!
    jabatan: String!
    gaji: String!
  }

  type Project {
    id: ID!
    nama: String!
    alamat: String!
    namaCostumer: String!
    budget: String!
    startAt: String!
    endAt: String!
    progres: String!
    pekerjaans: [Pekerjaan]!
    namaWorkers: [String]!
    createdAt: String!
    username: String!
  }
  input ProjectInput {
    nama: String!
    alamat: String!
    namaCostumer: String!
    budget: String!
    startAt: String!
    endAt: String!
    namaWorkers: [String]!
  }
  type Pekerjaan {
    id: ID!
    nama: String!
    pj: String!
    progres: String!
    materials: [Material]!
    tools: [Tool]!
    startAt: String!
    endAt: String!
    createdAt: String!
    username: String!
  }
  type Material {
    id: ID!
    nama: String!
    jenis: String!
    jumlah: String!
    satuan: String!
    harga: String!
    totalHarga: String!
    createdAt: String!
    username: String!
  }
  type Tool {
    id: ID!
    nama: String!
    jumlah: String!
    hargaSewa: String!
    totalHarga: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post

    getCostumer(costumerId: ID!): Costumer
    getCostumers: [Costumer]
    getWorker(workerId: ID!): Worker
    getWorkers: [Worker]
    getProjects: [Project]
    getProject(projectId: ID!): Project
    getPekerjaan(projectId: ID!, pekerjaanId: ID!): Pekerjaan
    getPekerjaans(projectId: ID!): [Pekerjaan]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!

    createCostumer(costumerInput: CostumerInput): Costumer!
    deleteCostumer(costumerId: ID!): String!
    createWorker(workerInput: WorkerInput): Worker!
    deleteWorker(workerId: ID!): String!

    createProject(projectInput: ProjectInput): Project!
    deleteProject(projectId: ID!): String!
    createPekerjaan(
      projectId: String!
      nama: String!
      pj: String!
      startAt: String!
      endAt: String!
    ): Project!
    deletePekerjaan(projectId: ID!, pekerjaanId: ID!): Project!
    createMaterial(
      projectId: ID!
      pekerjaanId: ID!
      nama: String!
      jenis: String!
      jumlah: String!
      satuan: String!
      harga: String!
    ): Project!
    deleteMaterial(projectId: ID!, pekerjaanId: ID!, materialId: ID!): Project!
    createTool(
      projectId: ID!
      pekerjaanId: ID!
      nama: String!
      jumlah: String!
      hargaSewa: String!
      totalHarga: String!
    ): Project!
    deleteTool(projectId: ID!, pekerjaanId: ID!, toolId: ID!): Project!
  }
  type Subscription {
    newPost: Post!
  }
`;
