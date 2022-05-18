const { useAuthState } = require("react-firebase-hooks/auth");
const { Navigate, useLocation } = require("react-router-dom");
const { default: auth } = require("../firebase.init.js");
// import auth from "../firebase.init.js";
function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();
  if (loading) {
    return <p>loading ...</p>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
