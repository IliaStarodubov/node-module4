import http from "http";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { addNote } from "./notes.controller.js";

const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (request, response) => {
  // console.log("request method", request.method);
  // console.log("request url", request.url);
  //
  // response.end("Hello World!");

  if (request.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.ejs"));
    // response.setHeader("Content-Type", "text/html");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(content);
  }

  if (request.method === "POST") {
    const body = [];

    response.writeHead(200, { "Content-Type": "text/plain: charset=utf-8" });

    request.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    request.on("end", () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
      response.end(`title: ${title}`);
    });
  }
});

server.listen(port, () =>
  console.log(chalk.bgGreen(`Server started on port ${port}`)),
);
