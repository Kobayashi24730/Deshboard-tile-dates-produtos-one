import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuLaterral from "./components/MenuLaterral";
import Home from "./pages/Home";
import TabellaAllPages from "./components/TabelaAllProdutosPageTwo";
import Administracao from "./pages/Administracao";
import Perfil from "./pages/Perfil";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <div className="app">

        <MenuLaterral />

        <main className="conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<TabellaAllPages />} />
            <Route path="/administracao" element={<Administracao />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>

      </div>
    </Router>
  </React.StrictMode>
);
