const postgres = require("postgres");
const fs = require("fs");
const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DB,
  DB_PORT,
  DB_SSL_CERT
} = require("./config.js").getConfig();

let sql_storage;

function setupSQL() {
  sql_storage = postgres({
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DB,
    port: DB_PORT,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(DB_SSL_CERT).toString(),
    },
  });
}

function shutdownSQL() {
  if (sql_storage !== undefined) {
    sql_storage.end();
  }
}

async function validateUser(name, token) {
  if (name !== undefined && token !== undefined) {
    try {
      sql_storage ?? setupSQL();
      
      const command = await sql_storage`
        SELECT * FROM users 
        WHERE name=${name}
      `;
      
      if (command.length === 0) {
        // no user by that name found.
        return { ok: false, content: `No User by '${name}' found.`, short: "Not Found" };
      }
      
      if (command[0].token == token) {
        return { ok: true, content: command[0] };
      } else {
        // the token does not match 
        return { ok: false, content: "Auth Token does not match.", short: "Bad Auth" };
      }
      
    } catch(err) {
      
    }
  } else {
    // missing required args 
    return { ok: false, content: `${(name === undefined) ? `Missing Name` : `Missing Token`}`, short: "Missing Args" };
  }
}

module.exports = {
  shutdownSQL,
  validateUser
};
