import User, { UpdateUserForm } from "@/types/user";
import { AxiosError } from "axios";
import axios from "../axiosInstance";

export default async function updateUser(formData: UpdateUserForm) {
  const res = await axios
    .patch("users/me", formData)
    .catch((error: AxiosError) => {
      console.log(
        `${error.response?.status} error from updateUser: ${error.message}`,
      );
      return null;
    });

  const updatedUser = res ? (res.data as User) : null;
  return updatedUser;
}
