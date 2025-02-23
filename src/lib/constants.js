export const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/";
export const tasksURL = `${baseURL}tasks`;
export const userURL = `${baseURL}user`;
export const loginURL = `${baseURL}user/login`;
export const registerURL = `${baseURL}user/register`;

export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",
  WEAK_PASSWORD: "Password must be at least 8 characters long",
  AUTH_FAILED: "Authentication failed. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
};
