const db = require('../models');

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await db.Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

exports.getAlunoByNome = async (req, res) => {
  const { nome } = req.query; // Recebe o nome como parâmetro de consulta
  try {
    const alunos = await db.Aluno.findAll({
      where: {
        nome: {
          [db.Sequelize.Op.like]: `%${nome}%`, // Busca alunos com nomes semelhantes
        },
      },
    });
    if (alunos.length === 0) {
      return res.status(404).json({ message: 'Nenhum aluno encontrado com esse nome' });
    }
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno por nome' });
  }
};

exports.getAlunoByMatricula = async (req, res) => {
  const { matricula } = req.params; // Recebe a matrícula como parâmetro na URL
  try {
    const aluno = await db.Aluno.findByPk(matricula); // Busca por chave primária
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno pela matrícula' });
  }
};


