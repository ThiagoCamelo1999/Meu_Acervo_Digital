const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models'); // Importa os modelos para sincronizar com o banco
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Função para criar o administrador
async function createAdmin() {
  const adminExist = await db.Admin.findOne();  // Verifica se já existe um admin

  if (!adminExist) {
    await db.Admin.create({
      username: 'admin',
      password: 'admin123', // Senha sem criptografia
    });

    console.log('Administrador criado com sucesso');
  } else {
    console.log('Administrador já existe');
  }
}

// Conexão ao banco e inicialização do servidor
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Teste de conexão com o banco
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida.');

    // Sincroniza todas as tabelas com o banco de dados (garante que todas sejam criadas)
    await db.sequelize.sync({ alter: true }); // Cria todas as tabelas (use force: true para recriar tabelas)
    console.log('Tabelas sincronizadas com sucesso.');

    // Criação do primeiro administrador
    await createAdmin();

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
})();

// Usando as rotas do index.js
app.use('/api', routes);  // Importa e usa o arquivo de rotas principal

// Middleware para servir arquivos estáticos
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal para redirecionar ao login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
