import React from "react";
import "./footer.css";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Download,
} from "lucide-react";

export default function Footer() {
  const linksSections = [
    {
      title: "Links Úteis",
      links: [
        { name: "Sobre o projeto", href: "#sobre" },
        { name: "Como contribuir", href: "#contribuir" },
        { name: "Termos de uso", href: "#termos" },
        { name: "Política de privacidade", href: "#privacidade" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  return (
    <footer className="custom-footer">
      <div className="custom-footer__container">
        <div className="custom-footer__main">
          {/* Brand Section */}
          <div className="custom-footer__brand">
            <div className="custom-footer__brandHeader">
              <div className="custom-footer__brandIcon">
                <MapPin size={24} color="#fff" />
              </div>
              <div>
                <h3 className="custom-footer__brandTitle">
                  Mapa da Acessibilidade
                </h3>
                <p className="custom-footer__brandSubtitle">
                  Mobilidade sem Barreiras
                </p>
              </div>
            </div>
            <p className="custom-footer__brandDesc">
              Nosso objetivo é mapear e compartilhar informações sobre locais
              acessíveis para pessoas com mobilidade reduzida.
            </p>
            <div className="custom-footer__contacts">
              <div className="custom-footer__contactItem">
                <Mail size={18} color="#60a5fa" />
                <a
                  href="mailto:contato@acessibilidade.com"
                  className="custom-footer__contactLink"
                  onClick={() => console.log("Email clicked")}
                >
                  contato@acessibilidade.com
                </a>
              </div>
              <div className="custom-footer__contactItem">
                <Phone size={18} color="#60a5fa" />
                <a
                  href="tel:+551112345678"
                  className="custom-footer__contactLink"
                  onClick={() => console.log("Phone clicked")}
                >
                  (11) 1234-5678
                </a>
              </div>
            </div>
          </div>
          {/* Links Section */}
          <div className="custom-footer__links">
            <h4 className="custom-footer__sectionTitle">Links Úteis</h4>
            <ul>
              {linksSections[0].links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="custom-footer__link"
                    onClick={() =>
                      console.log("Footer link clicked", link.name)
                    }
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Social and App Section */}
          <div className="custom-footer__social">
            <h4 className="custom-footer__sectionTitle">Redes Sociais</h4>
            <div className="custom-footer__socialIcons">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="custom-footer__socialLink"
                    onClick={() =>
                      console.log("Social link clicked", social.name)
                    }
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
            <div className="custom-footer__app">
              <h5 className="custom-footer__appTitle">📱 Baixar App</h5>
              <button
                className="custom-footer__downloadBtn"
                onClick={() => console.log("Download app clicked")}
              >
                <Download size={18} style={{ marginRight: 8 }} /> Baixar App
              </button>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="custom-footer__copyright">
          <p>Mapa da Acessibilidade © 2025. Todos os direitos reservados.</p>
          <span>
            Desenvolvido com <span className="custom-footer__heart">❤️</span>{" "}
            para a comunidade
          </span>
        </div>
      </div>
    </footer>
  );
}
