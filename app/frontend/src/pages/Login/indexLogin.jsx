import './styleLogin.css';
import {LogIn, Mail, Lock, Eye, EyeOff} from 'lucide-react';
import {useState} from 'react';

function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);
  return (
    <div className="container">
      <form>
      <div id='icone-log'><LogIn id='icone-log2'></LogIn></div>
        <h1>Acesse sua conta</h1>
        <Mail id='icone-mail'></Mail>
        <input style={{ color: '#000' }} placeholder="E-mail" name='email' type='email' id='e-mail'/>
        <Lock id='icone-lock'></Lock>
        <input style={{ color: '#000' }} placeholder="Senha" name='senha' type={showPassword ? "text" : "password"} id='password'/>
        {showPassword ? (
          <Eye id='icone-olho' onClick={togglePasswordView}/>
        ) : (
          <EyeOff id='icone-olho' onClick={togglePasswordView}/>
        )
      }
        <button type='button'>Entrar</button>
      </form>
    </div>
  )
}

export default Home