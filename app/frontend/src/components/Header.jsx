
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Menu, X, Plus } from "lucide-react";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigation = [
    { name: "Sobre Nós", href: "/sobre-nos" },
    { name: "Contato", href: "/contato" },
    { name: "FAQ", href: "/perguntas-frequentes" },
    { name: "Eventos", href: "/eventos" },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        {/* LOGO & LABEL */}
        <Link to="/" className="header-logo-area">
          <MapPin className="header-logo-icon" />
          <div>
            <h1 className="header-title">Mapa da Acessibilidade</h1>
            <p className="header-subtitle">Mobilidade sem Barreiras</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="header-nav">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="header-link">
              {item.name}
            </Link>
          ))}
          <Link to="/adicionar-local" className="header-add-btn">
            <Plus size={16} className="mr-1" />
            Adicionar Local
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="header-btn header-btn-outline">
            Login
          </Link>
          <Link to="/cadastro" className="header-btn header-btn-primary">
            Cadastro
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button
          className="header-burger"
          aria-label="Abrir menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      <div className={`header-mobile-menu${isMenuOpen ? " open" : ""}`}>
        <nav>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="header-mobile-link"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/add-place"
            className="header-add-btn header-mobile-add-btn"
            onClick={toggleMenu}
          >
            <Plus size={16} className="mr-1" />
            Adicionar Local
          </Link>
          <div className="header-mobile-auth">
            <Link
              to="/login"
              className="header-btn header-btn-outline"
              onClick={toggleMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="header-btn header-btn-primary"
              onClick={toggleMenu}
            >
              Cadastro
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}