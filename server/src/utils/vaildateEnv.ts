import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGODB_CONNECTION_URL: str(),
  PORT: port(),
  JWT_SECRET: str(),
});
