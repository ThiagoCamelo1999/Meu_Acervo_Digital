const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hook para criptografar a senha antes de salvar
  Admin.beforeCreate(async (admin) => {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  });

  // Hook para garantir que só existe um administrador
  Admin.afterCreate(async () => {
    const adminCount = await Admin.count();
    if (adminCount > 1) {
      // Remover o segundo administrador (ou lançar erro, dependendo da estratégia)
      const allAdmins = await Admin.findAll();
      for (let i = 1; i < allAdmins.length; i++) {
        await allAdmins[i].destroy();
      }
    }
  });

  return Admin;
};
