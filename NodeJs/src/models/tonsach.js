'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TonSach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TonSach.belongsTo(models.Sach, {foreignKey: 'idSach', targetKey:'idSach'})
    }
  }
  TonSach.init({
    idSach: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
    },
    thang: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
      },
    nam: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
      },
    tonDau: DataTypes.INTEGER,
    phatSinh: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TonSach',
    timestamps: false
  });
  return TonSach;
};