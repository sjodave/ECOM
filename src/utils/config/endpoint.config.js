// const base = process.env.REACT_APP_BASE_URL;
const base = "https://dummyjson.com";

const endpoints = {
  auth: {
    signin: base + "/auth/login",
    signup: base + "signup",
  },
  user: {
    profile: base + "https://jsonplaceholder.typicode.com/posts/1",
  },
};

export { endpoints };
