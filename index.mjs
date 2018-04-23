import express from "express";

const host = 'localhost';
const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(`The server is running at http://${host}:${port}`);
});
