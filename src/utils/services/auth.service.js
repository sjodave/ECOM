// import axios from "axios";
// import { endpoints } from "../config";

// class AuthService {
//   /**
//    * Login Api
//    * @param {*} email, password properties
//    * @returns accessToken
//    */
//   static async signin(email, password) {
//     return axios
//       .post(endpoints.auth.signin, {
//         email,
//         password,
//       })
//       .then((response) => response.data);
//   }

//   /**
//    * Signup Api
//    * @param {*} fullname, email, password properties
//    * @returns accessToken
//    */
//   static async signup(signupData) {
//     return axios
//       .post(endpoints.auth.signup, signupData)
//       .then((response) => response.data);
//   }
// }

// export { AuthService };
