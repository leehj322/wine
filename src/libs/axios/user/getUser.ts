import { AxiosError } from "axios";
import User from "@/types/user";
import axios from "../axiosInstance";

export default async function getUser() {
  const res = await axios.get("/users/me").catch((e: AxiosError) => {
    alert(`${e.response?.status} error from getUser: ${e.message}`);
    return null;
  });
  const user: User | null = res ? (res.data as User) : res;

  return user;
}
