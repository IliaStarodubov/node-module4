import path from "path";
import fs from "fs/promises";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesPath = path.join(__dirname, "db.json");

export async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

export async function removeNote(id) {
  const notes = await getNotes();
  const notesFilter = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(notesFilter));
  console.log(chalk.red("Note was removed"));
}

export async function updateNote(id, title) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === id);

  notes[index].title = title;
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

export async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the notes list:"));

  notes.forEach((note) => console.log(chalk.cyan(note.id, note.title)));
}
