import Main from "layouts/Main/Main";
import Auth from "layouts/Auth/Auth";

import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir
} from "store/authWrapper";

const AuthMain = userIsAuthenticatedRedir(Main);
const AuthLogin = userIsNotAuthenticatedRedir(Auth);

const indexRoutes = [
  { path: "/main", component: AuthMain },
  { path: "/setting", component: AuthMain },
  { path: "/signup", component: AuthLogin },
  { path: "/", component: AuthLogin },
];

export default indexRoutes;
