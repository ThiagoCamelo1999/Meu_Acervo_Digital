const db = require('../models');
const { Op } = require('sequelize');

// Criação de um empréstimo
exports.createEmprestimo = async (req, res) => {
  const { livro_id, matricula } = req.body;

  try {
    const livro = await db.Livro.findByPk(livro_id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    if (livro.quantidade <= 0) return res.status(400).json({ error: 'Livro não disponível no estoque' });

    const aluno = await db.Aluno.findByPk(matricula);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    const emprestimo = await db.Emprestimo.create({
      livro_id,
      matricula,
      data_emprestimo: new Date(),
    });

    await livro.update({ quantidade: livro.quantidade - 1 });

    res.status(201).json({
      message: 'Empréstimo registrado com sucesso',
      emprestimo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar empréstimo' });
  }
};

exports.devolverEmprestimo = async (req, res) => {
  const emprestimoId = req.params.id;

  try {
    // Encontrar o empréstimo pelo ID
    const emprestimo = await db.Emprestimo.findByPk(emprestimoId);

    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    // Atualizar o status para "Devolvido" e definir a data de devolução
    emprestimo.status = 'Devolvido';
    emprestimo.data_devolucao = new Date(); // Data atual
    await emprestimo.save();

    // Encontrar o livro relacionado ao empréstimo
    const livro = await db.Livro.findByPk(emprestimo.livro_id);
    if (livro) {
      // Incrementar a quantidade do livro
      await livro.update({ quantidade: livro.quantidade + 1 });
    }

    res.status(200).json({ message: 'Empréstimo devolvido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a devolução' });
  }
};

// Buscar todos os empréstimos
exports.getAllEmprestimos = async (req, res) => {
  try {
    const emprestimos = await db.Emprestimo.findAll({
      include: [
        { model: db.Livro, as: 'livro', attributes: ['nome'] },
        { model: db.Aluno, as: 'aluno', attributes: ['nome'] },
      ],
      order: [
        // Ordena por status: 'Devolvido' será enviado para o fim
        [db.Sequelize.literal("CASE WHEN status = 'Devolvido' THEN 1 ELSE 0 END"), 'ASC'],
        ['data_emprestimo', 'DESC'], // Ordena por data de empréstimo dentro do grupo
      ],
    });
    res.json(emprestimos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar empréstimos' });
  }
};

// Buscar empréstimos pelo nome do aluno
exports.getEmprestimosByAluno = async (req, res) => {
  const { nome } = req.query;

  try {
    const alunos = await db.Aluno.findAll({
      where: { nome: { [Op.like]: `%${nome}%` } },
      include: [
        {
          model: db.Emprestimo,
          as: 'emprestimos',
          include: { model: db.Livro, as: 'livro' },
        },
      ],
    });

    if (!alunos.length) return res.status(404).json({ error: 'Nenhum aluno encontrado com este nome' });

    res.json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar empréstimos por aluno' });
  }
};

// Buscar empréstimos pelo nome do livro
exports.getEmprestimosByLivro = async (req, res) => {
  const { nome } = req.query;

  try {
    const livros = await db.Livro.findAll({
      where: { nome: { [Op.like]: `%${nome}%` } },
      include: [
        {
          model: db.Emprestimo,
          as: 'emprestimos',
          include: { model: db.Aluno, as: 'aluno' },
        },
      ],
    });

    if (!livros.length) return res.status(404).json({ error: 'Nenhum livro encontrado com este nome' });

    res.json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar empréstimos por livro' });
  }
};
