module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define('Emprestimo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    livro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING, // A matrícula é a chave primária do aluno
      allowNull: false,
    },
    data_emprestimo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_devolucao: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('Ativo', 'Devolvido', 'Atrasado'),
      defaultValue: 'Ativo',
    },
  });

  return Emprestimo;
};
