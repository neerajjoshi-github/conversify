import * as z from "zod";
import { loginSchema, registrationSchema } from "../zodSchemas/authSchema";
import axiosHandler from "./axiosHandler";

type UserData = {
  userId: string;
  username: string;
  email: string;
  imageURL: string;
  token: string;
};

type FailedAuthResponse = {
  success: false;
  message: string;
  data: null;
};

type SuccessAuthResponse = {
  success: true;
  message: string;
  data: UserData;
};

export const register = async (
  data: z.infer<typeof registrationSchema>
): Promise<SuccessAuthResponse | FailedAuthResponse> => {
  try {
    registrationSchema.parse(data);
    const response = await axiosHandler({
      method: "POST",
      url: "auth/register",
      data: data,
    });

    return response;
  } catch (error) {
    console.log("Error on register function /lib/api-helpers/user", error);
    return {
      data: null,
      message: "An error has occured!! Please try again.",
      success: false,
    };
  }
};
export const login = async (
  data: z.infer<typeof loginSchema>
): Promise<SuccessAuthResponse | FailedAuthResponse> => {
  try {
    loginSchema.parse(data);
    const response = await axiosHandler({
      method: "POST",
      url: "auth/login",
      data: data,
    });

    return response;
  } catch (error) {
    console.log("Error on login function /lib/api-helpers/user", error);
    return {
      data: null,
      message: "An error has occured!! Please try again.",
      success: false,
    };
  }
};
