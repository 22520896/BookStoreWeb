'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CongNo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CongNo.belongsTo(models.KhachHang, {foreignKey: 'sdt', targetKey:'sdt'})
    }
  }
  CongNo.init({
    sdt: {
      type: DataTypes.STRING, 
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
    noDau: DataTypes.INTEGER,
    phatSinh: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CongNo',
    timestamps: false
  });
  return CongNo;
};