# 📚 Bookstore Management Web Application

A modern, intuitive web-based bookstore management system that helps bookstore owners efficiently manage book inventory, customer debts, and staff accounts anytime, anywhere through an internet-connected computer.

<div align="center">
  <img src="assets/home.png" alt="Home" />
</div>

## 📌 Features
- **User Account Management**: Assigns each employee an account with predefined access rights.
- **Employee Management**: Manages employee information.
- **Book Import Management**: Creates and tracks purchase orders and payment vouchers.
- **Book Tracking**: Monitors information of any book in the inventory.
- **Customer Management**: Tracks registered customer details (for members who can buy on credit and receive discounts).
- **Book Sale Management**: Generates and manages sales invoices.
- **Debt Collection**: Manages debt recovery through payment vouchers.
- **Reporting**: Generates monthly reports on stock and outstanding debts.

---

## 🛠️ Technologies Used

### 🖥️ Front-end
- **ReactJS**: JavaScript library for building user interfaces.
- **React Router**: Simplifies navigation within the app.
- **Redux**: Manages application state.
- **Axios**: Handles HTTP requests from the client side.

### ⚙️ Back-end
- **NodeJS**: JavaScript runtime environment for server-side execution.
- **BcryptJS**: Library for hashing user passwords.
- **ExpressJS**: Web framework for Node.js to build APIs efficiently.
- **Sequelize**: ORM for Node.js, supporting MySQL integration.
- **MySQL**: Relational database managed via XAMPP or standalone MySQL.

---

## 🚀 Getting Started

### ⚙️ Requirements
- Node.js (v14 or higher)
- MySQL (via XAMPP or standalone)

### 📦 Installation

1. Clone the repository:
```
git clone https://github.com/22520896/BookStoreWeb.git
```

2. Create database `qlnhasach` in MySQL

3. Setup Backend
```
cd NodeJs
npm install
cd src
npx sequelize-cli db:migrate 
cd ..
npm start
```

4. Setup Frontend
```
cd ReactJs
npm install
npm start
```

### ☑️ Admin Login (first time setup)

Before logging in, manually add an admin user into taikhoan table via MySQL:
```
INSERT INTO taikhoan (username, password, vaitro) VALUES ('admin', '$2b$10$fDmkj3DrIESvOTaUqPf20OPp1qn9MD7ThviZSN.zOEpBl.HdSYiCa', 1);
```
Access the login page from the homepage, enter the created username and password '123' to log in.

Use this account to log in and create new users.
