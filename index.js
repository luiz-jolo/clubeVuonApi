const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises'); // Usando fs/promises para trabalhar com promises no Node.js

const app = express();
const port = 3000;

app.use(bodyParser.json());

const usersFilePath = './users.json'; // Caminho para o arquivo JSON

// Função para ler o arquivo JSON
async function readUsersFile() {
  try {
    const content = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

// Função para escrever no arquivo JSON
async function writeUsersFile(data) {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erro ao escrever no arquivo:', error);
  }
}

// Rota para criar um usuário
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const users = await readUsersFile();
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  await writeUsersFile(users);
  res.status(201).json(newUser);
});

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  const users = await readUsersFile();
  res.json(users);
});

// Restante das rotas (get by ID, update e delete) mantém a mesma lógica, apenas adaptando as funções readUsersFile e writeUsersFile.

// ...

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
