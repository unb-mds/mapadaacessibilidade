import './style.css';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { FaFacebookF, FaApple, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx'
import { Input } from '../../../components/reusables/input/index.jsx';

export function LoginView() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <div className="container">
        <form>
          <div id='icone-log'><LogIn id='icone-log2'></LogIn></div>
          <h1>Acesse sua conta</h1>
          <p className="subtitle">Ou cadastre-se agora</p>

          <Input
            LeftIcon={<FaEnvelope className="input-icon" />}
            name="email"
            type="mail"
            placeholder="E-mail"
            />

          <Input
            leftIcon={<FaLock className="input-icon" />}
            name="senha"
            placeholder="Senha"
            hasPwdEye
          />

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

          <Button
            label="Entrar"
            onClick={() => {
              console.log("CLICOU NO BTN DE LOGIN");
            }}
          />
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
    </>
  )
}