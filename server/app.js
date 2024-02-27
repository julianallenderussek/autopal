const app = require("./index");
const db = require("./db")

PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})