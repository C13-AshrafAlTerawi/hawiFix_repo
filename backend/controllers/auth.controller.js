const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  //User Name verification
  const usernameSql = "SELECT * FROM users WHERE username = ?";
  connection.query(usernameSql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: "DB error", details: err });

    if (result.length > 0) {
      return res.status(400).json({ error: "User Name already exists" });
    }

    //Email verification
    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, result) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });

      if (result.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
          "INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)",
          [username, email, hashedPassword, phoneNumber],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Register failed", details: err });
            }

            res.status(201).json({ message: "User registered", result });
          }
        );
      } catch (error) {
        res.status(500).json({ error: "Hashing failed", details: error });
      }
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, results) => {
    if (results.length == 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = results[0];

    const isPasswordHashed = user.password.length > 50;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      emailNotificationsEnabled: user.email_notifications_enabled,
      phoneNumber: user.phone_number,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
      expiresIn: "24h",
    });

    res.json({ message: "Login successful", token });
  });
};

//notifications
exports.sendEmailIfEnabled = (req, res) => {};

exports.loginGoogle = (req, res) => {
  const { email, username } = req.user;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (result.length > 0) {
      const user = result[0];
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
        expiresIn: "24h",
      });
      return res.json({ message: "Login successful", token });
    }

    const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
    connection.query(sqlInsert, [username, email], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Register failed", details: err });

      const newUser = { username, email };
      const payload = {
        id: result.insertId,
        username: newUser.username,
        email: newUser.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
        expiresIn: "24h",
      });

      res
        .status(201)
        .json({ message: "User registered successfully via Google", token });
    });
  });
};

exports.registerGoogle = (req, res) => {
  const { email, username } = req.user;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (result.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const sqlInsert = "INSERT INTO users (username, email) VALUES (?, ?)";
    connection.query(sqlInsert, [username, email], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Register failed", details: err });

      const newUser = { username, email };
      const payload = {
        id: result.insertId,
        username: newUser.username,
        email: newUser.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
        expiresIn: "24h",
      });

      res
        .status(201)
        .json({ message: "User registered successfully via Google", token });
    });
  });
};
