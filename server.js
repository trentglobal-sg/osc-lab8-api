const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
const app = express();

const DATA_HOST = process.env.DATA_HOST;        // e.g. 10.0.1.123
const DATA_URL = `http://${DATA_HOST}:8080/data.json`;

app.get("/data", async (_req, res) => {
  try {
    const r = await fetch(DATA_URL);
    const body = await r.text();
    res.set("Content-Type", "application/json").send(body);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send("hello");
})

app.listen(3000, () => console.log("public app on :3000"));
