const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoutes'));
router.use('/livros', require('./livroRoutes'));
router.use('/alunos', require('./alunoRoutes'));
router.use('/emprestimos', require('./emprestimoRoutes'));

module.exports = router;
