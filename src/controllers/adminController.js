const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
