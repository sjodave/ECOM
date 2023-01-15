const BASE_URL = process.env.REACT_APP_BASE_URL;

const endpoints = {
  auth: {
    signin: BASE_URL + "/auth/login",
    signup: BASE_URL + "/auth/signup",
  },
  user: {
    profile: BASE_URL + "https://jsonplaceholder.typicode.com/posts/1",
  },
  products: {
    url: "/products",
  },
  product: {
    url: `/products/`,
  },
};

export { endpoints };
