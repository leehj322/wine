import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, login } = useAuth();

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
    await login(formData);
    router.push("/");
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
          value={formData.email}
        />
      </label>
      <label>
        <p>비밀번호</p>
        <input
          name="password"
          className="border border-solid"
          onChange={handleInputChange}
          value={formData.password}
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  );
}
