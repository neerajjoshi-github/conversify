import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

const axiosHandler = async (data: AxiosRequestConfig) => {
  console.log(`Bearer ${JSON.parse(localStorage.getItem("userInfo")!).token!}`);
  try {
    const response = await axiosInstance({
      method: data.method,
      url: data.url,
      data: data.data,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")!)
          .token!}`,
      },
    });

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log("Axios Handler Error : ", error.response.data);
    return {
      success: error.response.data.success,
      message: error.response.data.message,
      data: null,
    };
  }
};

export default axiosHandler;
