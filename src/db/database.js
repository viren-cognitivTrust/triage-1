const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT)');
  db.run("INSERT INTO users(username,password,role) VALUES('admin','admin123','admin')");
  db.run("INSERT INTO users(username,password,role) VALUES('user','user123','user')");
});

function unsafeQuery(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function unsafeExec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        return reject(err);
      }
      resolve({ ok: true });
    });
  });
}

module.exports = {
  unsafeQuery,
  unsafeExec
};