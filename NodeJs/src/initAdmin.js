const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const { taikhoan } = require("./models");

async function createAdmin() {
  const count = await taikhoan.count(); 
  if (count === 0) {
    const hashedPassword = bcrypt.hashSync("123", salt);
    await taikhoan.create({
      username: "admin",
      password: hashedPassword,
      vaitro: 1,
    });
    console.log("✅ Admin created (username: admin, password: 123)");
  } 
}

createAdmin().then(() => process.exit()).catch(err => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});
