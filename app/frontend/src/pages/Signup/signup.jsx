import { useState } from "react";
import {
  FaWheelchair,
  FaUserPlus,
  FaSignInAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
  FaBars,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import "./styleSignup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    passwordLength: false,
    passwordMatch: false,
  });
  const [toast, setToast] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validação em tempo real
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        email: !emailRegex.test(value),
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        passwordLength: value.length < 8,
        passwordMatch: value !== formData.confirmPassword,
      });
    }

    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        passwordMatch: value !== formData.password,
      });
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação final
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.fullname) {
      isValid = false;
      showToast("Por favor, insira seu nome completo", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    newErrors.email = !emailRegex.test(formData.email);

    newErrors.passwordLength = formData.password.length < 8;
    newErrors.passwordMatch = formData.password !== formData.confirmPassword;

    if (!formData.terms) {
      isValid = false;
      showToast(
        "Você deve aceitar os Termos de Serviço e Política de Privacidade",
        "error",
      );
      return;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      isValid = false;
    }

    if (!isValid) return;

    // Simular envio do formulário
    showToast(
      "Cadastro realizado com sucesso! Redirecionando para login...",
      "success",
    );
    setTimeout(() => {
      // Redirecionar para login
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg hover-scale">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FaUserPlus className="text-blue-600 text-xl" />
            </div>
            <h2 className="signup-title">Criar nova conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                faça login agora
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-4">
                {" "}
                {/* Adicione margin-bottom para espaçamento */}
                <label htmlFor="fullname" className="sr-only">
                  Nome Completo
                </label>
                <div className="relative">
                  {/* Ícone do usuário (cinza #9CA3AF) */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="password-icon-left" />{" "}
                    {/* Ícone cinza */}
                  </div>

                  {/* Input com estilo idêntico ao campo de senha */}
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md
                text-gray-700 placeholder-gray-400 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                sm:text-sm"
                    placeholder="Nome Completo"
                    value={formData.fullname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="password-icon-left" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md 
                              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                              focus:z-10 sm:text-sm"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    <FaExclamationCircle className="inline mr-1" />
                    Por favor, insira um e-mail válido
                  </p>
                )}
              </div>
              <div className="password-field">
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <div className="relative">
                  <FaLock className="password-icon-left" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength="8"
                    className="password-input"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="password-icon-right"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.passwordLength && (
                  <p className="password-error">
                    <FaExclamationCircle className="password-error-icon" />A
                    senha deve ter pelo menos 8 caracteres
                  </p>
                )}
              </div>
              <div className="password-field">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <FaLock className="password-icon-left" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="password-input"
                    placeholder="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="password-icon-right"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.passwordMatch && (
                  <p className="password-error">
                    <FaExclamationCircle className="password-error-icon" />
                    As senhas não coincidem!
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.terms}
                onChange={handleInputChange}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                Eu concordo com os{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Termos de Serviço
                </a>{" "}
                e{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Política de Privacidade
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition duration-150 ease-in-out"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou cadastre-se com
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 
                                      rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                                      hover:bg-gray-50 transition"
                >
                  <FaFacebookF className="text-blue-600" />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 
                                      rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                                      hover:bg-gray-50 transition"
                >
                  <FaGoogle className="text-red-500" />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 
                                      rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                                      hover:bg-gray-50 transition"
                >
                  <FaApple className="text-gray-800" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
          } z-50 toast`}
        >
          <div className="flex items-center">
            {toast.type === "success" ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaExclamationCircle className="mr-2" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
