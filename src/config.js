const fs = require("fs");
const yaml = require("js-yaml");

function getConfig() {
  try {
    let data;
    try {
      let fileContent = fs.readFileSync("./app.yaml", "utf8");
      data = yaml.load(fileContent);
    } catch(err) {
      // failed to get config file, check if there are env vars, else fail.
      if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
        console.log(`Failed to laod app.yaml in non-production env! ${err}`);
        process.exit(1);
      } else {
        // while we want to continue, to grab varaibles from just the env, we will 
        // need to assign the base object to data, to help prevent tests from failing.
        data = {
          env_variables: {},
        };
      }
    }
    
    // retreive variables 
    return {
      port: process.env.PORT ? process.env.PORT : data.env_variables.PORT,
      debug: process.env.DEBUGLOG ? process.env.DEBUGLOG : data.env_variables.DEBUGLOG,
      DB_HOST: process.env.DB_HOST ? process.env.DB_HOST : data.env_variables.DB_HOST,
      DB_USER: process.env.DB_USER ? process.env.DB_USER : data.env_variables.DB_USER,
      DB_PASS: process.env.DB_PASS ? process.env.DB_PASS : data.env_variables.DB_PASS,
      DB_DB: process.env.DB_DB ? process.env.DB_DB : data.env_variables.DB_DB,
      DB_PORT: process.env.DB_PORT ? process.env.DB_PORT : data.env_variables.DB_PORT,
      DB_SSL_CERT: process.env.DB_SSL_CERT ? process.env.DB_SSL_CERT : data.env_variables.DB_SSL_CERT
    };
    
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  getConfig
};
