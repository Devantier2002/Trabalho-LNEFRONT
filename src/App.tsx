import{ CardOculos } from "./components/CardOculos";
import { InputPesquisa } from "./components/InputPesquisa";
import type { OculosType } from "./utils/OculosType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [oculos, setOculos] = useState<OculosType[]>([])
  const { logaCliente } = useClienteStore()  

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/oculos`)
      const dados = await response.json()
      // Garante que o estado seja sempre um array
      setOculos(Array.isArray(dados) ? dados : []);
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`)
      const dados = await response.json()
      logaCliente(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      buscaCliente(idCliente as string)
    }
  }, [])

  const listaOculos = Array.isArray(oculos)
    ? oculos.map(oculosItem => (
        <CardOculos data={oculosItem} key={oculosItem.id} />
      ))
    : null;

  return (
    <>
      <InputPesquisa setOculos={setOculos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          Óculos <span className="underline underline-offset-3 decoration-8 decoration-purple-400 dark:decoration-purple-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaOculos}
        </div>
      </div>
    </>
  );
}
