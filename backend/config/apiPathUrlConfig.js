const baseHref = "";
const apiPathUrlConfig = {
  authAPI: {
    prefix: baseHref + "/api/auth",
    function: {
      signin: "/signin",
      signup: "/signup",
      signout: "/signout",
      user: "/user/:user_id",
      verifyToken: "/verify-token",
      updatePassword: "/update-password",
      deleteAccount: "/delete-account"
    }
  }
};

module.exports = apiPathUrlConfig;
