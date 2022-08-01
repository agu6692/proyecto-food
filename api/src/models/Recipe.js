const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    NivelHealth:{
      type: DataTypes.INTEGER,

    },
    PaP:{
      type: DataTypes.STRING
    },
    createDB:{
      type: DataTypes.BOOLEAN
    }
  });
};
