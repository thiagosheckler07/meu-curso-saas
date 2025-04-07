const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Middleware para ler formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(session({
  secret: 'segredo-super-seguro',
  resave: false,
  saveUninitialized: false
}));

// Libera arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Middleware de autenticação
function proteger(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/login.html');
  }
}

// Rota de login (POST)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha], (err, usuario) => {
    if (usuario) {
      req.session.logado = true;
      res.redirect('/cursos.html');
    } else {
      res.send('Login inválido');
    }
  });
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

// API protegida de cursos
app.get('/api/cursos', proteger, (req, res) => {
  db.all('SELECT * FROM cursos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar cursos' });
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
