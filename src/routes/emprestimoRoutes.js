const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');

// Rota para criar um novo empréstimo
router.post('/criar', emprestimoController.createEmprestimo);

// Rota para finalizar um empréstimo
router.put('/devolver/:id', emprestimoController.devolverEmprestimo);

// Rota para buscar todos os empréstimos
router.get('/all', emprestimoController.getAllEmprestimos);

// Rota para buscar empréstimos por nome do aluno
router.get('/aluno', emprestimoController.getEmprestimosByAluno);

// Rota para buscar empréstimos por nome do livro
router.get('/livro', emprestimoController.getEmprestimosByLivro);

module.exports = router;
