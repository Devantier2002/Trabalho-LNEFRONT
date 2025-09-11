import type { OculosType } from "./utils/OculosType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
// import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL



export default function Detalhes() {
  const params = useParams()

  const [oculos, setOculos] = useState<OculosType>()
  const { cliente } = useClienteStore()



  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/oculos/${params.oculosId}`)
      const dados = await response.json()
      setOculos(dados)
    }
    buscaDados()
  }, [])

  async function realizaCompra() {
    if (!oculos) return;
    // ATENÇÃO: ajuste o lenteId e adminId conforme necessário!
    const response = await fetch(`${apiUrl}/vendas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descricao: "Compra de óculos",
        preco: oculos.preco,
        vendaStatus: "Pendente",
        clienteId: cliente.id,
        oculosId: oculos.id,
        lenteId: 1, // coloque o id correto da lente escolhida
        adminId: "uuid-do-admin" // coloque o UUID de um admin existente
      })
    });

    if (response.status === 201 || response.ok) {
      toast.success("Compra realizada com sucesso! Em breve entraremos em contato.");
    } else {
      toast.error("Erro... Não foi possível realizar a compra");
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={oculos?.foto} alt="Foto do Óculos" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {oculos?.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Tipo: {oculos?.tipo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Preço R$: {Number(oculos?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Quantidade disponível: {oculos?.quantidade}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Cadastrado em: {oculos?.createdAt ? new Date(oculos.createdAt).toLocaleDateString("pt-BR") : ""}
          </p>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂Você pode comprar este óculos agora mesmo!</h3>
              <button onClick={realizaCompra} className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Comprar</button>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Gostou? Identifique-se para realizar a compra!
            </h2>
          }
        </div>
      </section>
    </>
  )
}