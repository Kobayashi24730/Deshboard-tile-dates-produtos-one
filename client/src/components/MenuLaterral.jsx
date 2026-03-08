import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiBell, FiUser } from "react-icons/fi";
import { MdDashboard, MdInventory2, MdSearch } from "react-icons/md";
import Logo from "../assets/imgs/Logo-deshboard-one.png";
import "../styles/MenuLaterralStyles.css";

export default function MenuLaterral() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const OpcoesMenu = [
    { nome: "Dashboard", icon: <MdDashboard />, path: "/" },
    { nome: "Produtos", icon: <MdInventory2 />, path: "/produtos" },
    { nome: "Administração", icon: <MdSearch />, path: "/administracao" },
    { nome: "Perfil", icon: <FiUser />, path: "/perfil" },
  ];

  return (
    <header className="hamburger">
      <div className="div-titulo" onClick={toggleMenu}>
        <img src={Logo} alt="Logo" />
        <span>Dashboard</span>
      </div>

      <div className="hamburger-btns">
        <button className="btn-icon" title="Troca de tema">
          <FiSun size={20} />
        </button>
        <button className="btn-icon" title="Notificações">
          <FiBell size={20} />
          <span className="badge">3</span>
        </button>
        <button className="btn-icon" title="Perfil">
          <FiUser size={20} />
        </button>
        <button className="btn-menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`menu ${isOpen ? "open" : ""}`}>
        {OpcoesMenu.map((item, index) => (
          <li
            key={index}
            className={`opcoes ${location.pathname === item.path ? "active" : ""
              }`}
          >
            <Link to={item.path}>
              <span className="menu-icon">{item.icon}</span>
              {item.nome}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
