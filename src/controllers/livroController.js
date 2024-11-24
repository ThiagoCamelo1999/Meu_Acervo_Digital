const db = require('../models');

exports.getAllLivros = async (req, res) => {
  try {
    const livros = await db.Livro.findAll();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};


exports.getLivroByNome = async (req, res) => {
  const { nome } = req.query; // Recebe o nome como parâmetro de consulta
  try {
    const livros = await db.Livro.findAll({
      where: {
        nome: {
          [db.Sequelize.Op.like]: `%${nome}%`, // Busca livros com nomes semelhantes
        },
      },
    });
    if (livros.length === 0) {
      return res.status(404).json({ message: 'Nenhum livro encontrado com esse nome' });
    }
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro por nome' });
  }
};

exports.getLivroByAutor = async (req, res) => {
  const { autor } = req.query; // Recebe o autor como parâmetro de consulta
  try {
    const livros = await db.Livro.findAll({
      where: {
        autor: {
          [db.Sequelize.Op.like]: `%${autor}%`, // Busca livros com autores semelhantes
        },
      },
    });
    if (livros.length === 0) {
      return res.status(404).json({ message: 'Nenhum livro encontrado com esse autor' });
    }
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro por autor' });
  }
};

