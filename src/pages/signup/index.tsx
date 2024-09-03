import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "@/libs/axios/auth/auth";
import { useAuth } from "@/contexts/AuthProvider";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const router = useRouter();
  const { user } = useAuth();

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
    await signUp(formData);
    router.push("/signin");
  };

  useEffect(() => {
    if (user) router.push("/myprofile");
  }, [user]);

  return (
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
  );
}
