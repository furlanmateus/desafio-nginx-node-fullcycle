const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(config);

const insertQuery = `INSERT INTO people(name) values ('Mateus'), ('Maria'), ('Felipe')`;
connection.query(insertQuery);

app.get('/', async (req, res) => {
  const people = await getPeople();
  const peopleList = createList(people);

  res.send(
    `<h1>Full Cycle Rocks!</h1>
      <div>
        <h2>Lista das pessoas cadastradas:</h2>
        ${peopleList}
      </div>`
  );
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}.`);
});

function getPeople() {
  const selectQuery = `SELECT name FROM people;`;

  return new Promise((resolve, reject) => {
    connection.query(selectQuery, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
}

function createList(rows) {
  if (!rows?.length) {
    return '';
  }

  return `<ul>${rows.map((row) => `<li>${row.name}</li>`).join('')}</ul>`;
}
