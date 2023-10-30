import axios from "axios";

const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME || "mewo";
const cloud_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "dog";

export const uploadAvatar = async (avatar: string) => {
  const avatarToSave = `data:image/svg+xml;base64,${Buffer.from(
    avatar
  ).toString("base64")}`;

  const data = new FormData();
  data.append("file", avatarToSave);
  data.append("upload_preset", cloud_preset);
  data.append("cloud_name", cloud_name);

  console.log({ cloud_name, cloud_preset });
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      data
    );
    return response.data.url as string;
  } catch (error) {
    console.log("Error while uploading image!!", error);
    return "";
  }
};
