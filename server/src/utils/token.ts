import jwt from "jsonwebtoken";
import env from "./vaildateEnv";

export const generateJWT = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "15d" });
};
