import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Weather from "./pages/Weather";

export default function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuth ? "/weather" : "/login"} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}
