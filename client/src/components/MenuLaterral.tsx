import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiBell, FiUser, FiMenu } from "react-icons/fi";
import { MdDashboard, MdInventory2, MdSearch } from "react-icons/md";
import Logo from "../assets/imgs/Logo-deshboard-one.png";
import "../styles/MenuLaterralStyles.css";

interface MenuItem {
  nome: string;
  icon: React.ReactNode;
  path: string;
}

export default function MenuLaterral() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const OpcoesMenu: MenuItem[] = [
    { nome: "Dashboard", icon: <MdDashboard />, path: "/" },
    { nome: "Produtos", icon: <MdInventory2 />, path: "/produtos" },
    { nome: "Administração", icon: <MdSearch />, path: "/administracao" },
    { nome: "Perfil", icon: <FiUser />, path: "/perfil" },
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <FiMenu size={24} />
      </button>

      <aside className={`hamburger ${isOpen ? "open" : ""}`}>

        <div className="div-titulo">
          <img src={Logo} alt="Logo dashboard" />
          <span>Dashboard</span>
        </div>

        <div className="hamburger-btns">

          <button className="btn-icon" title="Tema">
            <FiSun size={20} />
          </button>

          <button className="btn-icon" title="Notificações">
            <FiBell size={20} />
            <span className="badge">3</span>
          </button>

        </div>

        <ul className="menu">
          {OpcoesMenu.map((item) => (
            <li
              key={item.path}
              className={`opcoes ${location.pathname === item.path ? "active" : ""
                }`}
            >
              <Link to={item.path} onClick={closeMenu}>
                <span className="menu-icon">{item.icon}</span>
                <span>{item.nome}</span>
              </Link>
            </li>
          ))}
        </ul>

      </aside>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
}
