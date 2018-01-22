import * as dotenv from "dotenv";
import config from "./api/config";

dotenv.load();

import App from "./app";

const port = normalizePort(process.env.PORT || config.expressPort);
App.set("port", port);

App.listen(port, () => console.log(`API running on localhost:${port}`));

function normalizePort(val: number|string): number|string|boolean {
  const Port: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (isNaN(Port) ) { return val; }
  else if (Port >= 0) { return Port; }
  else { return false; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") { throw error; }
  const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
