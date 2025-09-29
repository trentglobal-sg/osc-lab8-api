const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const app = express();
app.use(bodyParser.json());

const BUCKET = process.env.BUCKET_NAME;
const KEY = "data.json";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

app.get("/", (req, res) => res.send("OK"));

app.get("/data", async (req, res) => {
  try {
    const obj = await s3.getObject({ Bucket: BUCKET, Key: KEY }).promise();
    res.set("Content-Type", "application/json").send(obj.Body.toString());
  } catch (e) { res.status(500).send({ error: e.message }); }
});

app.post("/data", async (req, res) => {
  try {
    const body = JSON.stringify(req.body || {}, null, 2);
    await s3.putObject({ Bucket: BUCKET, Key: KEY, Body: body, ContentType: "application/json" }).promise();
    res.send({ ok: true });
  } catch (e) { res.status(500).send({ error: e.message }); }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
