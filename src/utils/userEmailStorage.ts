export function saveUserEmail(email: string) {
  localStorage.setItem("userEmail", email);
}

export function removeUserEmail() {
  localStorage.removeItem("userEmail");
}
