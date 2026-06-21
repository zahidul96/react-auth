import { Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={!authCtx.isLoggedIn ? <AuthPage /> : null}
        />
        <Route
          path="/profile"
          element={
            authCtx.isLoggedIn ? (
              <UserProfile />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
