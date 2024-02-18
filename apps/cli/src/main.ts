import express from "express";
import cors from "cors";
import { CLI } from "./cli";

const PORT = process.env["PORT"] || 4200;
const app = express();
const router = express.Router();

const cli = new CLI();
cli.registerRouter(router);

app.use(cors());
app.use(router);
app.listen(PORT, () => cli.initializeAsync());

process.on("cleanup", async () => {
  await cli.disposeAsync();
});

// do app specific cleaning before exiting
process.on("exit", async () => {
  await cli.disposeAsync();
});

// catch ctrl+c event and exit normally
process.on("SIGINT", async () => {
  console.log("Ctrl-C...");
  await cli.disposeAsync();
  process.exit(2);
});

//catch uncaught exceptions, trace, then exit normally
process.on("uncaughtException", async (e) => {
  console.log("Uncaught Exception...");
  console.log(e.stack);
  await cli.disposeAsync();
  process.exit(99);
});
