module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
      matricula: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      data_nascimento: {
        type: DataTypes.DATE,
      },
    }, {
      timestamps: false, // Desativa createdAt e updatedAt
    });
  
    return Aluno;
  };
  