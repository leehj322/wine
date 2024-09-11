function isCorrectEmailFormat(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isCorrectPassword(password: string) {
  const pattern = /^[!@#$%^&*a-zA-Z0-9-]+$/;
  return pattern.test(password);
}

export function getEmailErrorMessage(email: string) {
  if (!email) return "이메일은 필수 입력입니다.";
  if (!isCorrectEmailFormat(email)) return "이메일 형식으로 작성해 주세요.";
  return "";
}

export function getNicknameErrorMessage(nickname: string) {
  if (!nickname) return "닉네임은 필수 입력입니다.";
  if (nickname.length > 20) return "닉네임은 최대 20자까지 가능합니다.";

  return "";
}

export function getPasswordErrorMessage(password: string) {
  if (!password) return "비밀번호는 필수 입력입니다.";
  if (!isCorrectPassword(password))
    return "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.";
  if (password.length < 8) return "비밀번호는 최소 8자 이상입니다.";
  return "";
}

export function getPasswordConfirmationErrorMessage(
  password: string,
  verifyPassword: string,
) {
  if (!verifyPassword) return "비밀번호 확인을 입력해주세요.";
  if (password !== verifyPassword) return "비밀번호가 일치하지 않습니다.";

  return "";
}
