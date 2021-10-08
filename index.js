const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.Port || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
