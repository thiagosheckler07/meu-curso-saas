const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    video TEXT NOT NULL
  )`);

  db.run("DELETE FROM cursos"); // limpa os cursos existentes

  db.run(
    "INSERT INTO cursos (titulo, video) VALUES (?, ?)",
    ['Curso Introdutório', 'http://localhost:3000/videos/aula1.mp4'],
    function (err) {
      if (err) {
        console.error('Erro ao inserir curso:', err.message);
      } else {
        console.log('Curso inserido com sucesso!');
      }
    }
  );
});

db.close();
