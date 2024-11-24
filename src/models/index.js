const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
db.Livro = require('./Livro')(sequelize, Sequelize.DataTypes);
db.Aluno = require('./Aluno')(sequelize, Sequelize.DataTypes);
db.Emprestimo = require('./Emprestimo')(sequelize, Sequelize.DataTypes);

// Definir associações
db.Emprestimo.belongsTo(db.Livro, { foreignKey: 'livro_id', as: 'livro' });
db.Emprestimo.belongsTo(db.Aluno, { foreignKey: 'matricula', as: 'aluno' });

db.Livro.hasMany(db.Emprestimo, { foreignKey: 'livro_id', as: 'emprestimos' });
db.Aluno.hasMany(db.Emprestimo, { foreignKey: 'matricula', as: 'emprestimos' });

module.exports = db;
