const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rota para buscar todos os alunos
router.get('/', alunoController.getAllAlunos);

// Rota para buscar aluno pelo nome
router.get('/nome', alunoController.getAlunoByNome);

// Rota para buscar aluno pela matrícula
router.get('/:matricula', alunoController.getAlunoByMatricula);

module.exports = router;
