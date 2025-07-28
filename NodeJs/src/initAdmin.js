const db = require('../models');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createDefaultAccount = async () => {
  try {
    const count = await db.TaiKhoan.count();

    if (count > 0) {
      console.log('✔ Bảng TaiKhoan đã có dữ liệu, không thêm tài khoản mặc định.');
      return;
    }

    const defaultUsername = 'admin';
    const defaultPassword = '123';

    await db.TaiKhoan.create({
      username: defaultUsername,
      password: hashPassword(defaultPassword),
      vaiTro: '1',
      hoTen: 'Quản trị viên',
    });

    console.log('✔ Tài khoản mặc định đã được tạo.');
  } catch (error) {
    console.error('✖ Lỗi khi tạo tài khoản mặc định:', error);
  }
};

createDefaultAccount();
