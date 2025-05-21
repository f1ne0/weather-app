import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    await axios
      .post(
        "https://reqres.in/api/login",
        {
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/weather");
        console.log("login");
        
      });

    // .catch((err) => {
    //   setError(err.response?.data?.error || "Ошибка входа");
    // });
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
