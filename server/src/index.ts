import "dotenv/config";
import mongoose from "mongoose";
import server from "./app";
import env from "./utils/vaildateEnv";

const port = env.PORT;
const mongodbConnectionURL = env.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongodbConnectionURL)
  .then(() => {
    console.log("Database connected!!");
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to database!!!", error);
  });
