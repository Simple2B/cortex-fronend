import { AxiosError, AxiosResponse } from "axios";
import { ILoginResponse } from "../types/authTypes";
import { authInstance } from "./axiosInstance";

const formatRequestBody = (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };
  return params;
};

const formatRequestBodyApiKey = (password: string, api_key: string) => {
  const params = {
    password: password,
    api_key: api_key,
  };
  return params;
};

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await authInstance
      .post("api/auth/sign_in", formatRequestBody(email, password))
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log("POST [/auth/sign_in] response received successfully");
        console.log(res);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/auth/sign_in] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },

  setPassword: async (password: string, api_key: string ) => {
    const response = await authInstance
      .post(`api/auth/sign_up`, formatRequestBodyApiKey(password, api_key))
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log(`POST [api/sing_up/${api_key}] response received successfully`);
        console.log(res);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/sing_up/${api_key}] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },

  registrationClient: async (data: {} ) => {
    const response = await authInstance
      .post(`api/registration_client`, data)
      .then((res: AxiosResponse<ILoginResponse>) => {
        console.log(`POST [api/registration_client/${data}] response received successfully`);
        console.log(res);
        return res.data;
      })
      .catch((error: AxiosError<ILoginResponse>) => {
        // place to handle errors and rise custom errors
        console.log(`POST [api/registration_client/${data}] error message: ${error.message}`);
        throw error.message;
      });
    return response;
  },
};
