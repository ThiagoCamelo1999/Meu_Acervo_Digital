const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const emprestimoController = require('../controllers/emprestimoController');

// Rota para buscar todos os livros
router.get('/all', livroController.getAllLivros);

// Rota para buscar livros por nome
router.get('/nome', livroController.getLivroByNome);

// Rota para buscar livros por autor
router.get('/autor', livroController.getLivroByAutor);

// Rotas de Emprestimos relacionadas a livros
router.get('/emprestimos/aluno', emprestimoController.getEmprestimosByAluno);
router.get('/emprestimos/livro', emprestimoController.getEmprestimosByLivro);

module.exports = router;
