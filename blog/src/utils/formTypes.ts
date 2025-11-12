export type adminLoginData = {
  email: string;
  password: string;
};

export const validEmail = {
  required: "Email is required for login",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};
