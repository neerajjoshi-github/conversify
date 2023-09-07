import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      default:
        "https://plus.unsplash.com/premium_photo-1664543649372-6e2ec0e0bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

type User = InferSchemaType<typeof userSchema>;
const UserModel = model<User>("User", userSchema);

export default UserModel;
