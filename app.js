import express from "express";
import { createNote, getNote, getNotes } from "./database";

const app = express();

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const createdNote = await createNote(title, contents);
  res.send(createdNote);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broken!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
