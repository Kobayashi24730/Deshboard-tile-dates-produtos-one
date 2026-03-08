import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuLaterral from "./components/MenuLaterral";
import Home from "./pages/Home";
import TabellaAllPages from "./components/TabelaAllProdutosPageTwo";
import Administracao from "./pages/Administracao";
import Perfil from "./pages/Perfil";
import LoginRegister from "./pages/login-register";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <div style={{ display: "flex" }}>
        {/* Menu lateral fixo */}
        <MenuLaterral />

        {/* Área principal */}
        <main className="conteudo" style={{ flex: 1, padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<TabellaAllPages />} />
            <Route path="/administracao" element={<Administracao />} />
            <Route path="/perfil" element={<Perfil />} />
            {/* <Route path="/login" element={<LoginRegister />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  </React.StrictMode>
);
