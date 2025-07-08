import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Facebook,
  Chrome,
  Apple,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import "./Login.css";

import api from "../services/api";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const inputEmail = useRef(null);
  const inputSenha = useRef(null);

  async function logUsr() {
    await api.post("/usuarios/login", {
      email: inputEmail.current.value,
      senha: inputSenha.current.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Login em progresso...",
      description: "Aguarde enquanto verificamos suas credenciais.",
    });

    // Simular chamada de API
    setTimeout(() => {
      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para a página inicial.",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <LogIn />
          </div>
          <h1 className="login-title">Acesse sua conta</h1>
          <p className="login-subtitle">
            Ou{" "}
            <Link to="/cadastro" className="login-link">
              cadastre-se agora
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                required
                className="form-input"
                ref={inputEmail}
              />
              <div className="input-flag"></div>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                className="form-input"
                ref={inputSenha}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="remember-me" className="checkbox" />
              <label htmlFor="remember-me" className="checkbox-label">
                Lembrar de mim
              </label>
            </div>
            <Link to="#" className="forgot-password">
              Esqueceu sua senha?
            </Link>
          </div>

          <button type="submit" className="login-button" onClick={logUsr}>
            <LogIn />
            Entrar
          </button>
        </form>

        <div className="divider">
          <span>Ou acesse com</span>
        </div>

        <div className="social-buttons">
          <button className="social-button facebook">
            <Facebook />
          </button>
          <button className="social-button google">
            <Chrome />
          </button>
          <button className="social-button apple">
            <Apple />
          </button>
        </div>
      </div>
    </div>
  );
}
