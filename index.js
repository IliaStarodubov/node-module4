import chalk from "chalk";
import {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} from "./notes.controller.js";
import express from "express";

const port = 3001;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
  // res.sendFile(path.join(basePath, "index.ejs"));
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  // res.sendFile(path.join(basePath, "index.ejs"));
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote(req.params.id, req.body.title);
  // console.log(req.params.id);
  // console.log(req.body.title);
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index.ejs", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () =>
  console.log(chalk.bgGreen(`Server started on port ${port}`)),
);
