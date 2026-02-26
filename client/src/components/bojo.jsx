import { useEffect, useState } from "react";

function bojo() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProdutos(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {produtos.map((p: any) => (
        <div key={p.id}>
          {p.nome} - R$ {p.preco}
        </div>
      ))}
    </div>
  );
}

export default bojo;
