const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database setup
const db = new sqlite3.Database('./portfolio.db');

// Initialize database tables
db.serialize(() => {
  // User table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Profile table
  db.run(`CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    title TEXT,
    bio TEXT,
    photo TEXT,
    cv_url TEXT,
    location TEXT,
    email TEXT,
    phone TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Skills table
  db.run(`CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    percentage INTEGER,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Projects table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image TEXT,
    technologies TEXT,
    github_url TEXT,
    live_url TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Experience table
  db.run(`CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    company TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    current BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Achievements table
  db.run(`CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Messages table
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default admin user
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (username, password, email) VALUES (?, ?, ?)`, 
    ['admin', hashedPassword, 'admin@portfolio.com']);

  // Insert default profile data
  db.run(`INSERT OR IGNORE INTO profile (id, name, title, bio, location, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
    [1, 'Your Name', 'Full Stack Developer', 'Passionate developer creating amazing digital experiences', 'Your City, Country', 'your@email.com', '+1234567890']);
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

// Profile routes
app.get('/api/profile', (req, res) => {
  db.get('SELECT * FROM profile WHERE id = 1', (err, profile) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(profile || {});
  });
});

app.put('/api/profile', authenticateToken, upload.single('photo'), (req, res) => {
  const { name, title, bio, location, email, phone, cv_url } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  let query = `UPDATE profile SET name = ?, title = ?, bio = ?, location = ?, email = ?, phone = ?, cv_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1`;
  let params = [name, title, bio, location, email, phone, cv_url];

  if (photo) {
    query = `UPDATE profile SET name = ?, title = ?, bio = ?, photo = ?, location = ?, email = ?, phone = ?, cv_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1`;
    params = [name, title, bio, photo, location, email, phone, cv_url];
  }

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Profile updated successfully' });
  });
});

// Skills routes
app.get('/api/skills', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY category, name', (err, skills) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(skills);
  });
});

app.post('/api/skills', authenticateToken, (req, res) => {
  const { name, category, percentage, icon } = req.body;
  
  db.run('INSERT INTO skills (name, category, percentage, icon) VALUES (?, ?, ?, ?)', 
    [name, category, percentage, icon], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id: this.lastID, message: 'Skill added successfully' });
  });
});

app.delete('/api/skills/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM skills WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Skill deleted successfully' });
  });
});

// Projects routes
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(projects);
  });
});

app.post('/api/projects', authenticateToken, upload.single('image'), (req, res) => {
  const { title, description, technologies, github_url, live_url, featured } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  db.run('INSERT INTO projects (title, description, image, technologies, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [title, description, image, technologies, github_url, live_url, featured || 0], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id: this.lastID, message: 'Project added successfully' });
  });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Experience routes
app.get('/api/experience', (req, res) => {
  db.all('SELECT * FROM experience ORDER BY start_date DESC', (err, experience) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(experience);
  });
});

app.post('/api/experience', authenticateToken, (req, res) => {
  const { title, company, location, start_date, end_date, description, current } = req.body;
  
  db.run('INSERT INTO experience (title, company, location, start_date, end_date, description, current) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [title, company, location, start_date, end_date, description, current || 0], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id: this.lastID, message: 'Experience added successfully' });
  });
});

// Achievements routes
app.get('/api/achievements', (req, res) => {
  db.all('SELECT * FROM achievements ORDER BY date DESC', (err, achievements) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(achievements);
  });
});

app.post('/api/achievements', authenticateToken, (req, res) => {
  const { title, description, date, category } = req.body;
  
  db.run('INSERT INTO achievements (title, description, date, category) VALUES (?, ?, ?, ?)', 
    [title, description, date, category], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id: this.lastID, message: 'Achievement added successfully' });
  });
});

// Messages routes
app.get('/api/messages', authenticateToken, (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, messages) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(messages);
  });
});

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  db.run('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)', 
    [name, email, subject, message], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ id: this.lastID, message: 'Message sent successfully' });
  });
});

app.put('/api/messages/:id/read', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.run('UPDATE messages SET read = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Message marked as read' });
  });
});

// Create uploads directory
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});