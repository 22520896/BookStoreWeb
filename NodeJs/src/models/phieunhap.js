'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuNhap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhieuNhap.hasMany(models.CTPN, {foreignKey: 'idPN', targetKey:'idPN'})
    }
  }
  PhieuNhap.init({
    idPN: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
    },
    ngayLap: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PhieuNhap',
    timestamps: false
  });
  return PhieuNhap;
};