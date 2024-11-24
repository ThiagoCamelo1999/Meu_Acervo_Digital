module.exports = (sequelize, DataTypes) => {
    const Livro = sequelize.define('Livro', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      autor: {
        type: DataTypes.STRING,
      },
      editora: {
        type: DataTypes.STRING,
      },
      ano_lancamento: {
        type: DataTypes.INTEGER,
      },
    }, {
      timestamps: false, // Desativa createdAt e updatedAt
    });
  
    return Livro;
  };
  