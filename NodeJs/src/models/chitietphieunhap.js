'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CTPN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CTPN.belongsTo(models.PhieuNhap, {foreignKey: 'idPN', targetKey:'idPN'})
      CTPN.belongsTo(models.Sach, {foreignKey: 'idSach', targetKey:'idSach'})
    }
  }
  CTPN.init({
    idPN: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idSach: {      
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sach: DataTypes.STRING,
    theLoai: DataTypes.STRING,
    tacGia: DataTypes.STRING,
    soLuong: DataTypes.INTEGER,
    donGiaNhap: DataTypes.BIGINT,
  },
   {
    sequelize,
    modelName: 'CTPN',
    // timestamps: false
  });
  return CTPN;
};