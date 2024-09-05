import { SignUpForm } from "@/types/auth";
import {
  getEmailErrorMessage,
  getNicknameErrorMessage,
  getPasswordConfirmationErrorMessage,
  getPasswordErrorMessage,
} from "@/utils/getAuthFormError";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

const KEY_ERROR_PAIR: Record<string, (...args: string[]) => string> = {
  email: getEmailErrorMessage,
  nickname: getNicknameErrorMessage,
  password: getPasswordErrorMessage,
};

export default function useAuthForm() {
  const [authForm, setAuthForm] = useState<SignUpForm>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errorMessages, setErrorMessages] = useState<SignUpForm>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [isConfirmationTouched, setIsConfirmationTouched] = useState(false);

  const handleAuthFormChange = (key: string, value: string) => {
    setAuthForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleErrorMessageChange = (key: string, value: string) => {
    setErrorMessages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
  ) => {
    handleAuthFormChange(e.target.name, e.target.value);
    if (e.target.name === "passwordConfirmation") {
      setIsConfirmationTouched(true);
      return;
    }
    handleErrorMessageChange(
      e.target.name,
      KEY_ERROR_PAIR[e.target.name](e.target.value),
    );
  };

  useEffect(() => {
    if (isConfirmationTouched) {
      handleErrorMessageChange(
        "passwordConfirmation",
        getPasswordConfirmationErrorMessage(
          authForm.password,
          authForm.passwordConfirmation,
        ),
      );
    }
  }, [authForm.password, authForm.passwordConfirmation]);

  return { authForm, errorMessages, handleInputChange };
}
