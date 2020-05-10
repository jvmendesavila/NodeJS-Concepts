const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// 📋1️⃣ should be able to list the repositories
app.get("/repositories", (request, response) => {
  // Repositories List
  return response.json(repositories);
});

// 📋2️⃣ should be able to create a new repository
app.post("/repositories", (request, response) => {
  // Get params in request body to create a new repository
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

// 📋3️⃣ should be able to update repository
// 📋4️⃣ should not be able to update a repository that does not exist
// 📋5️⃣ should not be able to update repository likes manually
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  let updateRepository = repositories[repositoryIndex];

  updateRepository = {
    id,
    title,
    url,
    techs,
    likes: updateRepository.likes,
  };

  return response.json(updateRepository);
});

// 📋6️⃣ should be able to delete the repository
// 📋7️⃣ should not be able to delete a repository that does not exist
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

// 📋8️⃣ should be able to give a like to the repository
// 📋9️⃣ should not be able to like a repository that does not exist
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  let updateRepository = repositories[repositoryIndex];

  updateRepository = {
    likes: (updateRepository.likes += 1),
  };

  return response.json(updateRepository);
});

module.exports = app;
