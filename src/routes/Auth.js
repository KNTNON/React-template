
import LoginPage from "pages/Login/Login.js";
import SignupPage from "pages/Signup/Signup.js";

const authRoutes = [
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/signup",
    component: SignupPage
  },
  { redirect: true, path: "/", to: "/login" }
];
  
export default authRoutes;
  