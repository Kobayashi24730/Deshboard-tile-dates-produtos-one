import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MenuLaterral from "./components/MenuLaterral";
import Home from "./pages/Home";
import TabellaAllPages from "./components/TabelaAllProdutosPageTwo";
import Administracao from "./pages/Administracao";
import Perfil from "./pages/Perfil";

import "./styles/global.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>
);
