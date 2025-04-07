const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT)");
  db.run("INSERT INTO usuarios (email, senha) VALUES (?, ?)", ['aluno@teste.com', '1234']);
  console.log('Usuário criado com sucesso!');
});

db.close();
