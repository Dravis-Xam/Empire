// server.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.JWT_SECRET || 'your-strong-secret-key';
const EXPIRATION = '1h';

// Mock database
let users = [];

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, email, password: hashedPassword };
    users.push(user);
    
    const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, { expiresIn: EXPIRATION });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, { expiresIn: EXPIRATION });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));