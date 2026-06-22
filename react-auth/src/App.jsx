import { Routes, Route, Navigate } from "react-router";
import { useContext, useEffect } from "react";
import AuthContext from "./store/AuthContext";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const checkToken = async () => {
      if (!authCtx.token) {
        return;
      }
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBB7QrrzH06y2C1B2_Nc1nxpviaokj_qMw",
          {
            method: "POST",
            body: JSON.stringify({ idToken: authCtx.token }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!res.ok) {
          authCtx.logout();
        }
      } catch (err) {
        authCtx.logout();
      }
      checkToken();
    };
  }, [authCtx]);
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
