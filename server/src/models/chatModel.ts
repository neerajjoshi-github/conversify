import { InferSchemaType, Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      required: true,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imageURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

type Chat = InferSchemaType<typeof chatSchema>;
const ChatModel = model<Chat>("Chat", chatSchema);

export default ChatModel;
