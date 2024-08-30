import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "@/libs/axios/axiosInstance";
import { saveTokens } from "@/utils/authTokenStorage";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleFormChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormChange(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post("auth/signin", formData);
    } catch {
      alert(`Error: ${res?.status}`);
      return;
    }
    const tokens = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
    saveTokens(tokens);
    router.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <p>이메일</p>
          <input
            name="email"
            className="border border-solid"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <p>비밀번호</p>
          <input
            name="password"
            className="border border-solid"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </>
  );
}
