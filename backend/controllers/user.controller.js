const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("passport");

exports.getAllUsers = (req, res) => {
  connection.query("select * from users", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
exports.creatNewUser = (req, res) => {
  const { username, email, password } = req.body;

  connection.query(
    "insert into users(username,email,password) values(?,?,?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Error inserting user" });
      }

      res.status(201).json({ message: "User created successfully", result });
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  if (!["admin", "employee", "customer"].includes(role)) {
    return res.status(400).json({ error: "Invalid role provided" });
  }
  connection.query(
    "UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?",
    [username, email, password, role, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error in updating user" });
      }
      res.json({ message: "User updated successfully", result });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting user" });
    }

    res.json({ message: "User deleted successfully", result });
  });
};

//update User field
exports.UpdateUserField = async (req, res) => {
  const userId = req.user.id;
  const field = req.params.field;
  const value = req.body[field];

  if (field === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
  }

  if (field === "password") {
    if (value.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    try {
      const hashedPassword = await bcrypt.hash(value, 10);
      const sql = `UPDATE users SET password = ? WHERE id = ?`;
      connection.query(sql, [hashedPassword, userId], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating password", error: err });
        }
        res.status(200).json({ message: "Password updated successfully" });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error hashing the password", error: error.message });
    }
  } else if (field === "username") {
    const CheckUserName = "SELECT * FROM users WHERE username = ?";
    connection.query(CheckUserName, [value], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Error checking username" });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "User Name already exists" });
      }

      const sql = `UPDATE users SET username = ? WHERE id = ?`;
      connection.query(sql, [value, userId], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating username", error: err });
        }
        res.status(200).json({ message: "Username updated successfully" });
      });
    });
  } else if (field === "email") {
    const CheckUseremail = "SELECT * FROM users WHERE email = ?";
    connection.query(CheckUseremail, [value], (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Error checking email" });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const sql = "update users set email=? WHERE id=? ";
      connection.query(sql, [value, userId], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating email", error: err });
        }
        res.status(200).json({ message: "Email updated successfully" });
      });
    });
  } else {
    const sql = `UPDATE users SET ${field} = ? WHERE id = ?`;

    connection.query(sql, [value, userId], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating user data", error: err });
      }
      res.status(200).json({ message: `${field} updated successfully` });
    });
  }
};
//===============================================//

//update user password
exports.UpdateUserPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  // تحقق من وجود كلمة المرور
  if (!password) {
    return res.status(400).json({ message: "New password is required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  console.log("Password from request body:", password); // تأكد من أن كلمة المرور تم تلقيها بشكل صحيح
  console.log("User ID from JWT:", userId); // تأكد من أن الـ user ID من التوكن تم استلامه بشكل صحيح

  try {
    // جلب كلمة المرور القديمة من قاعدة البيانات
    const sql = "SELECT password FROM users WHERE id = ?";
    connection.query(sql, [userId], async (err, result) => {
      if (err) {
        console.error("Error fetching user data:", err); // تأكد من تسجيل الخطأ في حال حدوثه
        return res
          .status(500)
          .json({ message: "Error fetching user data", error: err });
      }

      if (result.length === 0) {
        console.log("No user found with the provided ID");
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];
      console.log("User data retrieved:", user); // تأكد من أن البيانات تم جلبها من قاعدة البيانات بنجاح

      // التحقق مما إذا كانت كلمة المرور مشفرة
      const isPasswordHashed = user.password.length > 50;
      console.log("Password is hashed:", isPasswordHashed); // تأكد من حالة كلمة المرور (مشفرة أم لا)

      let hashedPassword;

      // إذا كانت كلمة المرور غير مشفرة (أقل من 50 حرفًا)، نقوم بتشفيرها
      if (!isPasswordHashed) {
        console.log("Password is not hashed, hashing now...");
        hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password has been hashed:", hashedPassword); // تأكد من أن كلمة المرور تم تشفيرها هنا
      } else {
        hashedPassword = user.password;
        console.log("Password is already hashed, keeping as is.");
      }

      // تحديث كلمة المرور في قاعدة البيانات
      const updateSql = "UPDATE users SET password = ? WHERE id = ?";
      connection.query(updateSql, [hashedPassword, userId], (err, result) => {
        if (err) {
          console.error("Error updating password:", err); // تسجيل الخطأ في حال حدوثه
          return res
            .status(500)
            .json({ message: "Error updating password", error: err });
        }

        if (result.affectedRows === 0) {
          console.log("No rows affected, user not found for update");
          return res.status(404).json({ message: "User not found" });
        }

        console.log("Password update successful");
        res.status(200).json({ message: "Password updated successfully" });
      });
    });
  } catch (error) {
    console.error("Error hashing the password:", error);
    res
      .status(500)
      .json({ message: "Error hashing the password", error: error.message });
  }
};
