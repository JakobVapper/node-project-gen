const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });
    res.json(user);
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target === 'User_username_key') {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      console.error('Error during user registration:', error); // Log the error
      res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error); // Log the error
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };