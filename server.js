import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";

config({
  path: "./config/config.env",
});

connectDatabase();
// connection is made with the database locally for now

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
