import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios/axiosInstance";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
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
      res = await axios.post("auth/signup", formData);
    } catch {
      alert(`Error: ${res?.status}`);
      return;
    }
    router.push("/signin");
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
          <p>닉네임</p>
          <input
            name="nickname"
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
        <label>
          <p>비밀번호 확인</p>
          <input
            name="passwordConfirmation"
            className="border border-solid"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
