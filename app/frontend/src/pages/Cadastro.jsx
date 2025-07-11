import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  Facebook,
  Chrome,
  Apple,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import "./Cadastro.css";

import api from "../services/api";

export default function Register() {
  const inputNome = useRef();
  const inputEmail = useRef();
  const inputSenhaUsr = useRef();

  async function createUsr() {
    await api.post("/usuarios", {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      senha: inputSenhaUsr.current.value,
      papel: "usuario",
    });
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.currentTarget.elements.namedItem("password").value;
    const confirmPassword =
      e.currentTarget.elements.namedItem("confirm-password").value;

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "error",
      });
      return;
    }

    toast({
      title: "Criando sua conta...",
      description: "Isso levará apenas um momento.",
    });

    setTimeout(() => {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login.",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="register-icon">
            <UserPlus />
          </div>
          <h1 className="register-title">Criar nova conta</h1>
          <p className="register-subtitle">
            Já tem uma conta?{" "}
            <Link to="/login" className="register-link">
              Faça login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome Completo"
                required
                className="form-input"
                ref={inputNome}
              />
            </div>
          </div>

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
                ref={inputSenhaUsr}
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

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar Senha"
                required
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="checkbox-group">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="terms" required className="checkbox" />
              <label htmlFor="terms" className="checkbox-label">
                Eu concordo com os{" "}
                <a href="#" className="terms-link">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="terms-link">
                  Política de Privacidade
                </a>
              </label>
            </div>
          </div>

          <button type="submit" className="register-button" onClick={createUsr}>
            <UserPlus />
            Cadastrar
          </button>
        </form>

        <div className="divider">
          <span>Ou cadastre-se com</span>
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
