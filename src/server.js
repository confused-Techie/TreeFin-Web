const app = require("./main.js");
const { port } = require("./config.js").getConfig();
const logger = require("./logger.js");

const serve = app.listen(port, () => {
  logger.infoLog(`TreeFin Server Listening on port ${port}`);
});

process.on("SIGTERM", async () => {
  await exterminate("SIGTERM");
});

process.on("SIGINT", async () => {
  await exterminate("SIGINT");
});

async function exterminate(callee) {
  console.log(`${callee} signal received: closing HTTP server.`);
  // call any shutdown methods 
  console.log("Exiting...");
  serve.close(() => {
    console.log("HTTP Server Closed.");
  });
}
