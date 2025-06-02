import './styleLogin.css';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { FaFacebookF, FaApple, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx'

function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  return (
    <>
      <Navbar />
      <div className="container">
        <form>
          <div id='icone-log'><LogIn id='icone-log2'></LogIn></div>
          <h1>Acesse sua conta</h1>
          <p className="subtitle">Ou cadastre-se agora</p>

          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input placeholder="E-mail" name='email' type='email' className='input-field' />
          </div>

          <div className="input-container">
            <FaLock className="input-icon" />
            <input placeholder="Senha" name='senha' type={showPassword ? "text" : "password"} className='input-field' />
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={togglePasswordView} />
            ) : (
              <FaEye className="eye-icon" onClick={togglePasswordView} />
            )}
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Lembrar de mim
            </label>
            <a href="#" className="forgot-password">Esqueceu sua senha?</a>
          </div>

          <button type='button' className="login-button">Entrar</button>

          <div className="divider">
            <span>Ou acesse com</span>
          </div>

          <div className="social-login-container">
            <div>
              <a href="#" className="social-button facebook-button">
              <i className="fab fa-facebook-f facebook-icon"><FaFacebookF/></i>
              </a>
            </div>
            <div>
              <a href="#" className="social-button google-button">
              <i className="fab fa-google google-icon"><FaGoogle/></i>
              </a>
            </div>
            <div>
              <a href="#" className="social-button apple-button">
              <i className="fab fa-apple apple-icon"><FaApple/></i>
              </a>
            </div>
          </div>
    </form>
      </div >
    <Footer />
    </>
  )
}

export default Home