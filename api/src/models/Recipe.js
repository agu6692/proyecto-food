const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Resumen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    NivelHealth:{
      type: DataTypes.INTEGER,

    },
    pasos:{
      type: DataTypes.TEXT
    },
    createDB:{
      type: DataTypes.BOOLEAN
    }
  });
};
