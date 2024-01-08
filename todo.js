const express = require("express");

const app = express()
const port = 7000;

app.use(express.static("public"))
app.get("/", (req, res) => {
  res.render("todo.ejs")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})