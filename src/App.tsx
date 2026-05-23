import { CardOculos } from "./components/CardOculos";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ProdutoType } from "./utils/ProdutoType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext"
import { produtosMock } from "./data/produtosMock"
import { getClienteLocalById } from "./utils/localDb"

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>(produtosMock)
  const { logaCliente } = useClienteStore()  

  useEffect(() => {
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      const clienteLocal = getClienteLocalById(idCliente as string)
      if (clienteLocal) {
        logaCliente(clienteLocal)
      }
    }    
  }, [])

  const listaProdutos = produtos.map( produto => (
    <CardOculos data={produto} key={produto.id} />
  ))

  return (
    <>
      <InputPesquisa setProdutos={setProdutos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Produtos <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaProdutos}
        </div>
      </div>
    </>
  );
}
