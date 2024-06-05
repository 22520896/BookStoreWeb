'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhieuThu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhieuThu.belongsTo(models.KhachHang, {foreignKey:'sdt', targetKey: 'sdt'})
    }
  }
  PhieuThu.init({
    idPT: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
    },
    sdt: DataTypes.STRING,
    hoTen: DataTypes.STRING,
    email: DataTypes.STRING,
    soTienThu: DataTypes.BIGINT,
    ngayThuTien: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PhieuThu',
    timestamps: false
  });
  return PhieuThu;
};