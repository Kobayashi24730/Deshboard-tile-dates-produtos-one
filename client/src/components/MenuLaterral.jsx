import { useEffect, useState } from "react";
import "../styles/MenuLaterralStyles.css";
import Logo from "../assets/imgs/Logo-deshboard-one.png";

function MenuLaterral() {
  const OpcoesMenu = [
    "📊 Dashboard",
    "📦 Armazém",
    "🔎 Pesquisa / Vendas",
    "👤 Minha Conta"
  ];

  return (
    <header className="headers">
      <div className="div-titulo">
        <img src={Logo} alt="Minha logo"/>
        <h1>Dashboard</h1>
      </div>

      <ul className="menu">
        {OpcoesMenu.map((produto, index) => (
          <li key={index} className="opcoes">
          {produto}
          </li>
        ))}
      </ul>

      <div className="final-paragrafo"></div>
    </header>
  );
}

export default MenuLaterral;
